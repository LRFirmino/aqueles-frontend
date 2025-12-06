import { useEffect, useState } from 'react'
import { shuffleArray } from '../../random';


export default function QuizCard() {

  const [chosenAnswer, setChosenAnwser] = useState(null);
  const [quote, setQuote] = useState(null);
  const [correctAnswer,setCorrectAnswer] = useState(null);
  const [allAnswers,setAllAnswers] = useState([]);

  useEffect(() => {
      fetch('http://localhost:8080/quotes/todayQuote').then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
        .then(data => { 
          let baseKey = "answer"
          let fetchedAnswers = [];
          for (let i = 1; i < 4; i++) {
            fetchedAnswers.push(data[baseKey + i])
          }
          setCorrectAnswer(data["correctAnswer"])
          fetchedAnswers.push(data["correctAnswer"])
          setAllAnswers(shuffleArray(fetchedAnswers))
          setQuote(data["quote"])
        })
        .catch(error => {
          // 4. Handle any errors during the fetch or promise chain
          console.error('Fetch error:', error);
        });
    }, []);

  return (
    <div className="flex flex-col items-center min-h-screen m-8 gap-4">
      <h1 className="shadow-md rounded-xl text-xl font-semibold text-gray-800 p-4">
        {quote ? (
          quote
        ) : ("Carregando...")
        }
        </h1>
      <div className="flex gap-4">
        {
          allAnswers.map((answer) => {
            let buttonClass = "p-4 rounded-xl font-semibold shadow-md transition text-white disabled:opacity-50 disabled:cursor-not-allowed";
            let buttonColor = " bg-blue-500";
            const isCorrect = answer === correctAnswer;
            const isChosen = answer === chosenAnswer;
            const playerChose = chosenAnswer != null;

            if (playerChose) {
              if (isChosen) {
                if (isCorrect) {
                  buttonColor = " bg-green-500"
                }
                else {
                  buttonColor = " bg-red-500"
                }
              }
              else {
                buttonColor = " bg-gray-500"
              }
            }

            buttonClass += buttonColor
            return (
              <button
                key={answer}
                disabled={playerChose}
                onClick={() => setChosenAnwser(answer)}
                className={`${buttonClass}`}>
                {answer}
              </button>)
          })}
      </div>
    </div>
  )
}