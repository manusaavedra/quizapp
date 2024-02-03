import './App.css';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import { BibleQuestions } from './questions';
import { useScoreStore } from './useScoreStore';

const MAX_LENGTH = BibleQuestions.length - 1
const MIN_LENGTH = 0

function clamp(index) {
    if (index > MAX_LENGTH) return MIN_LENGTH
    if (index < MIN_LENGTH) return MAX_LENGTH
    return index
}

function getIndexQuestion(index) {
    console.log(BibleQuestions[clamp(index)])
    return BibleQuestions[clamp(index)]
}

function App() {
    const [questionState, setQuestionState] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)
    const {success, failed} = useScoreStore()

    const handleStartQuestion = () => {
        const randomIndex = Math.floor(Math.random() * BibleQuestions.length)
        const question = getIndexQuestion(randomIndex)
        setQuestionState(question)
        setCurrentIndex(0)
    }

    const handleNextQuestion = () => {
        const question = getIndexQuestion(currentIndex + 1)
        const index = BibleQuestions.indexOf(question)
        setCurrentIndex(index)
        setQuestionState(question)
    }

    if (questionState === null) {
        return (
            <div className='wrap_container'>
                <button className='primary' onClick={handleStartQuestion}>Comenzar A Jugar Biblionario</button>
            </div>
        )
    }

    const operationProps = {
        question: questionState.question,
        answers: questionState.answers,
        handleNextQuestion: () => handleNextQuestion()
    }

    return (
        <div className="App">
            <header className="w-full px-4 py-2 bg-black text-white flex items-center justify-between">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <h4 className="text-2xl font-bold">Biblionario</h4>
                    <div className="flex items-center gap-4">
                        <span className="bg-green-900 font-semibold p-1 rounded-md">Correctas {success}</span>
                        <span className="bg-red-900 font-semibold p-1 rounded-md text-white">Fallidas {failed}</span>
                    </div>
                </div>
            </header>
            <div className="max-w-2xl flex items-center justify-center h-[calc(100vh-200px)] my-10 mx-auto">
                <div className='quiz-card'>
                    <h2 className="text-4xl font-bold my-8">{questionState.question}</h2>
                    <ButtonGroupBuilder {...operationProps} />
                </div>
            </div>
        </div>
    )
}

function ButtonGroupBuilder({ question, answers, handleNextQuestion }) {
    const nextButton = useRef()
    const errorSoundRef = useRef()
    const correctSoundRef = useRef()
    const {onSuccess, onFailed} = useScoreStore()

    useEffect(() => {
        nextButton.current.disabled = true
        clearBodyBackground()

        errorSoundRef.current = new Howl({
            src: ['/error.mp3']
        })

        correctSoundRef.current = new Howl({
            src: ['/correct.mp3']
        })

    }, [question])

    const clearBodyBackground = () => {
        document.querySelector('body').classList.remove('correct')
        document.querySelector('body').classList.remove('incorrect')
    }

    const handleClick = (e) => {

        const value = e.target.dataset.istrue

        clearBodyBackground()
        nextButton.current.disabled = false

        if (value === "true") {
            document.querySelector('body').classList.add('correct')
            correctSoundRef.current.play()
            onSuccess()
        }

        if (value === "false") {
            document.querySelector('body').classList.add('incorrect')
            errorSoundRef.current.play()
            onFailed()
        }
    }

    const handleClickNextQuestion = () => {
        handleNextQuestion()
        nextButton.current.disabled = true
    }

    const buttons = answers.map((answer, index) => {
        return (
            <button
                key={index}
                data-istrue={answer.isTrue}
                value={answer}
                onClick={handleClick}>
                {answer.value}
            </button>
        )
    })

    buttons.sort(() => Math.random() - 0.5)

    return (
        <div className='buttons-container'>
            <div className='buttons-quiz-anwers'>
                {buttons}
            </div>
            <button className='primary w-full' ref={nextButton} onClick={handleClickNextQuestion}>Siguiente</button>
        </div>
    )

}

export default App;
