import { useEffect, useState } from 'react';
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
    let finalIndex = clamp(index)
    return ArrayQuestions[finalIndex]
}

function App() {
    const [state, setState] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)

    const handleStartQuestion = () => {
        const question = getIndexQuestion(0)
        setState(question)
        setCurrentIndex(0)
    }

    const handleNextQuestion = () => {
        const question = getIndexQuestion(currentIndex + 1)
        const index = ArrayQuestions.indexOf(question)
        setCurrentIndex(index)
        setState(question)
    }

    if (state === null) {
        return (
            <div className='wrap_container'>
                <button className='primary' onClick={handleStartQuestion}>Comenzar Rapjuve Quizapp</button>
            </div>
        )
    }

    const {anwers} = state

    return (
        <div className="App">
            <header className="app-header">
                <h4>Rapjuve QuizApp</h4>
            </header>
            <div className='wrap_container'>
                <div className='quiz-card'>
                    <h2>{state.question}</h2>
                    <div className='quiz-anwers'>
                        <ButtonBuilderFromArray data={anwers} />
                    </div>
                    <div className='actions'>
                        <button className='primary' onClick={handleNextQuestion}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ButtonBuilderFromArray({ data }) {

    useEffect(() => {
        document.querySelector('.quiz-anwers').classList.remove('visible');
    }, [data])

    const handleOnclick = () => {
        document.querySelector('.quiz-anwers').classList.add('visible');
    }

    const Buttons = () => data.map((item, index) => {
        return <button key={index.toString()} data-istrue={`${item.isTrue}`} onClick={handleOnclick}>{item.value}</button>
    }).sort(() => Math.random() - 0.5)

    return <Buttons />
    
}


export default App;
