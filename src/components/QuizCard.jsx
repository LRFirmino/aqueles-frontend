import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { shuffleArray } from '../../random'
import { userAlreadyRespondedToday } from '../../userResponseCheck'
import { useAuth } from '../context/AuthContext'

export default function QuizCard() {
  const navigate = useNavigate();
  const {user,loading} = useAuth(); 
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [quote, setQuote] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);
  
  useEffect(() => {
    if (loading) return;

    if (!user?.token){
      navigate("/login");
      return;
    }

    if (userAlreadyRespondedToday()) {
      setQuote(localStorage.getItem("quote"));
      setChosenAnswer(localStorage.getItem("chosenAnswer"));
      setCorrectAnswer(localStorage.getItem("correctAnswer"));

      setAllAnswers([
        localStorage.getItem("answer1"),
        localStorage.getItem("answer2"),
        localStorage.getItem("answer3"),
        localStorage.getItem("answer4"),
      ]);
    } else {
      fetch('https://aqueles-backend-498097150469.us-central1.run.app/quotes/todayQuote', {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          }
      })
        .then(response => {
          if ((response.status === 401) || (response.status === 403)) {
            navigate("/login");
          }
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data) return;

          const fetchedAnswers = [
            data.answer1,
            data.answer2,
            data.answer3,
            data.correctAnswer
          ];

          setCorrectAnswer(data.correctAnswer);
          setAllAnswers(shuffleArray(fetchedAnswers));
          setQuote(data.quote);
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    }
  }, [navigate, user, loading]);

  return (
    <div className="flex flex-col items-center min-h-screen m-8 gap-4">
      <h1 className="shadow-md rounded-xl text-xl font-semibold text-gray-800 p-4">
        {quote ?? "Carregando..."}
      </h1>

      <div className="flex gap-4">
        {allAnswers.map(answer => {
          let buttonColor = " bg-blue-500";
          const isCorrect = answer === correctAnswer;
          const isChosen = answer === chosenAnswer;
          const playerChose = chosenAnswer != null;

          if (playerChose) {
            if (isChosen) {
              buttonColor = isCorrect ? " bg-green-500" : " bg-red-500";
            } else {
              buttonColor = " bg-gray-500";
            }
          }

          return (
            <button
              key={answer}
              disabled={playerChose}
              className={`p-4 rounded-xl font-semibold shadow-md text-white ${buttonColor}`}
              onClick={() => {
                setChosenAnswer(answer);
                localStorage.setItem("lastAnswerDate", new Date().toISOString());
                localStorage.setItem("quote", quote);
                localStorage.setItem("chosenAnswer", answer);
                allAnswers.forEach((a, i) =>
                  localStorage.setItem(`answer${i + 1}`, a)
                );
                localStorage.setItem("correctAnswer", correctAnswer);
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}
