import './styles/Quiz.css'; // importing stylesheet
// importing functions and packages
import {useState,useEffect} from 'react';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'
import axios from 'axios';
import {MoonLoader} from "react-spinners";


// importing components
import Question from './Question'

// quiz component
export default function Quiz(props) {
	// function to randomize options
	function shuffleArray(arr) {

  for(let i = 0; i< arr.length; i++){
    const shuffleIndex = Math.floor(Math.random() * arr.length)
    const shuffleWithIndex = Math.floor(Math.random()* arr.length);
    const temp = arr[shuffleIndex];
    arr[shuffleIndex] = arr[shuffleWithIndex];
    arr[shuffleWithIndex] = temp;
  }

  return arr;
}

	const [questions, setQuestions] = useState([]);
	const [hasAnswerShown, setAnswerShown] = useState(false);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);


	useEffect(()=>{
		async function fetchQuizData(url) {
			const res = await axios(url);
			const data = await res.data;
			const questionArray = [];
			for(let i = 0; i<data.results.length; i++){
				const optionArray = [data.results[i].correct_answer, ...data.results[i].incorrect_answers]
				const id = nanoid();
				const questionObject = {
						question: data.results[i].question.replaceAll('&quot;', '"').replaceAll('&#039;', "'"),
					options: shuffleArray(optionArray),
					correctAnswer: data.results[i].correct_answer,
					userAnswer: '',
					id: id,
				}
				questionArray.push(questionObject)
			}
			setQuestions(questionArray)
		}
		fetchQuizData('https://opentdb.com/api.php?amount=5&difficulty=medium');
	},[]);

	// function to change user's answer for every quesiton

	function changeAnswer (id, userAnswer) {
		if(!hasAnswerShown)
		setQuestions(oldQuestions=> oldQuestions.map(question=>{
			return question.id===id ? {...question, userAnswer} : question;
		}));
	}

	// function to display how many answers user has gotten correct
	function displayAnswer () {
		if(hasAnswerShown) {
			props.setQuizPageToggle(false)
			return;
		}
		setAnswerShown(true);
		questions.map(question=>{
			setCorrectAnswersCount(prevCount=>{
				return question.userAnswer===question.correctAnswer ? prevCount+1 : prevCount;
			})
			return 0;
		});

	}

	return (
		<div className={`quiz ${questions.length===0 ? 'quiz-loader-active': ''}`}>

				<MoonLoader loading={questions.length===0} color={'#293264'} css={``} />

			{hasAnswerShown && correctAnswersCount === 5 && <Confetti/>}

			{questions.map((question) => {
				return <Question {...question} hasAnswerShown={hasAnswerShown} key={question.id} changeAnswer={changeAnswer}/>})}
			<div className="quiz-result-container">
				{hasAnswerShown && <h4 className={'quiz-result'}>You scored {correctAnswersCount}/5 correct answers</h4> }
				{questions.length!==0 && <button className={'quiz-submit'} onClick={displayAnswer}>{hasAnswerShown ? 'Play Again': 'Check Answers'}</button>}
			</div>
		</div>
	)
}