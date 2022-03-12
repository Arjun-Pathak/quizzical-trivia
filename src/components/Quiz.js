import './styles/Quiz.css'; // importing stylesheet
// importing functions and packages
import {useState,useEffect} from 'react';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'
import data from './data.json';

// importing components
import Question from './Question'

// quiz component
export default function Quiz() {
	// function to randomize options


	const [questions, setQuestions] = useState([]);
	const [hasAnswerShown, setAnswerShown] = useState(false);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
	useEffect(()=>{
		const questionArray = [];
		for(let i = 0; i<data.results.length; i++){
			const optionArray = [data.results[i].correct_answer, ...data.results[i].incorrect_answers]
			const id = nanoid();
			const questionObject = {
				question: data.results[i].question,
				options: optionArray,
				correctAnswer: data.results[i].correct_answer,
				userAnswer: '',
				id: id,
			}
			questionArray.push(questionObject)
		}
		setQuestions(questionArray)
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
		setAnswerShown(true);
		questions.map(question=>{
			setCorrectAnswersCount(prevCount=>{
				question.userAnswer===question.correctAnswer ? console.log('+1') : console.log("-1");
				return question.userAnswer===question.correctAnswer ? prevCount+1 : prevCount;
			})
		});

	}

	return (
		<div className={'quiz'}>
			{hasAnswerShown && correctAnswersCount === 5 && <Confetti/>}
			{questions.map((question) => {
				return <Question {...question} hasAnswerShown={hasAnswerShown} key={question.id} changeAnswer={changeAnswer}/>})}
			<div className="quiz-result-container">
				{hasAnswerShown && <h4 className={'quiz-result'}>You scored {correctAnswersCount}/5 correct answers</h4>}
				<button className={'quiz-submit'} onClick={displayAnswer}>Check Answers</button>
			</div>
		</div>
	)
}