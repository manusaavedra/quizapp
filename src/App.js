import { useEffect, useRef, useState } from 'react';
import './App.css';


const ArrayQuestions = [
    {
        question: "¿Cuánto es 2+2?",
        anwers: [
            { value: 4, isTrue: true },
            { value: 8, isTrue: false },
            { value: 6, isTrue: false },
            { value: 3, isTrue: false }
        ]
    },
    {
        question: "¿Donde nació Jesús?",
        anwers: [
            { value: "Belén", isTrue: true },
            { value: "Venezuela", isTrue: false },
            { value: "Palestina", isTrue: false },
            { value: "Jerusalem", isTrue: false }
        ]
    },
    {
        question: "¿Quien creó el arca?",
        anwers: [
            { value: "Noé", isTrue: true },
            { value: "Hitler", isTrue: false },
            { value: "José", isTrue: false },
            { value: "Moises", isTrue: false }
        ]
    }
]


let MAX_LENGTH = ArrayQuestions.length - 1
let MIN_LENGTH = 0

function clamp(index) {
    if (index > MAX_LENGTH) return MIN_LENGTH
    if (index < MIN_LENGTH) return MAX_LENGTH
    return index
}


function getIndexQuestion(index) {
    return ArrayQuestions[clamp(index)]
}

function App() {
    const [questionState, setQuestionState] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)

    const handleStartQuestion = () => {
        const question = getIndexQuestion(0)
        setQuestionState(question)
        setCurrentIndex(0)
    }

    const handleNextQuestion = () => {
        const question = getIndexQuestion(currentIndex + 1)
        const index = ArrayQuestions.indexOf(question)
        setCurrentIndex(index)
        setQuestionState(question)
    }

    if (questionState === null) {
        return (
            <div className='wrap_container'>
                <button className='primary' onClick={handleStartQuestion}>Comenzar Rapjuve Quizapp</button>
            </div>
        )
    }

    const operationProps = {
        question: questionState.question,
        anwers: questionState.anwers,
        handleNextQuestion: () => handleNextQuestion()
    }

    return (
        <div className="App">
            <header className="app-header">
                <h4>Rapjuve QuizApp</h4>
            </header>
            <div className='wrap_container'>
                <div className='quiz-card'>
                    <h2>{questionState.question}</h2>
                    <ButtonGroupBuilder {...operationProps} />
                </div>
            </div>
        </div>
    )
}

function ButtonGroupBuilder({ question, anwers, handleNextQuestion }) {
    const nextButton = useRef()

    useEffect(() => {
        nextButton.current.disabled = true
        clearBodyBackground()
    }, [question])

    const clearBodyBackground = () => {
        document.querySelector('body').classList.remove('correct')
        document.querySelector('body').classList.remove('incorrect')
    }

    const handleClick = (e) => {
        
        const value = e.target.dataset.istrue
        
        clearBodyBackground()
        
        if (value === "true") { 
            document.querySelector('body').classList.add('correct')
            nextButton.current.disabled = false
        }
 
        if (value === "false") {
            document.querySelector('body').classList.add('incorrect')
            nextButton.current.disabled = true
        }
        
        
    }

    const buttons = anwers.map((answer, index) => {
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
        <div className='buttons-quiz-anwers'>
            {buttons}
            <button className='primary' ref={nextButton} onClick={handleNextQuestion}>Siguiente</button>
        </div>
    )

}

export default App;
