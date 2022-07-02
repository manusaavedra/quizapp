import { useEffect, useState } from 'react';
import './App.css';

const ArrayQuestions = [
  {
    question: "2+2?",
    anwers: [
      { value: 4, isTrue: true },
      { value: 8, isTrue: false },
      { value: 6, isTrue: false },
      { value: 3, isTrue: false }
    ]
  },
  {
    question: "¿Donde nació Jesus?",
    anwers: [
      { value: "Belén", isTrue: true },
      { value: "Venezuela", isTrue: false },
      { value: "Palestina", isTrue: false },
      { value: "Jerusalem", isTrue: false }
    ]
  }
]

const getRandomQuestion = () => {
  const ArrayQuestionsLength = ArrayQuestions.length;
  const randomIndex = Math.floor(Math.random() * ArrayQuestionsLength)
  return ArrayQuestions[randomIndex]
}

function App() {

  const [state, setState] = useState(null)

  const handleNextQuestion = () => {
    const question = getRandomQuestion()
    setState(question)
  }

  if (state === null) {
    return (
      <div className='wrap_container'>
        <button className='primary' onClick={handleNextQuestion}>Comenzar Rapjuve Quizapp</button>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="app-header">
        <h4>Rapjuve QuizApp</h4>
      </header>
      <div className='wrap_container'>
        <div className='quiz-card'>
          <h2>{state.question}</h2>
          <div className='quiz-anwers'>
            <ButtonBuilderFromArray data={state.anwers} />
          </div>
          <div className='actions'>
            <button onClick={handleNextQuestion}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonBuilderFromArray({data}) {

  useEffect(() => {
    document.querySelector('.quiz-anwers').classList.remove('visible');
  }, [data])

  const handleOnclick = () => {
    document.querySelector('.quiz-anwers').classList.add('visible');
  }

  const Buttons = () => data.map((item, index) => {
    return <button key={index.toString()} data-istrue={`${item.isTrue}`} onClick={handleOnclick}>{item.value}</button>
  }).sort(() => Math.random() - 0.5)

  return (
    <Buttons />
  )
}


export default App;
