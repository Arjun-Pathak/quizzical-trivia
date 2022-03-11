import './styles/Quiz.css'; // importing stylesheet
// importing functions and packages
import {useState,useEffect} from 'react';
import {nanoid} from "nanoid";
import data from './data.json';

// importing components
import Question from './Question'

// quiz component
export default function Quiz() {
	// function to randomize options
	function randomArrayShuffle(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	const [questions, setQuestions] = useState(data.results);

	useEffect(()=>{
		const questionArray = [];
		for(let i = 0; i<data.results.length; i++){
			const optionArray = [data.results[i].correct_answer, ...data.results[i].incorrect_answers]
			const questionObject = {
				question: data.results[i].question,
				options: randomArrayShuffle(optionArray),
				id: nanoid(),
			}
			questionArray.push(questionObject)
		}
		setQuestions(questionArray)
	},[]);
	const QuestionElements = questions.map((question) => <Question key={question.id} {...question} />);
	console.log(questions[1])
	return (
		<div className={'quiz'}>
			{QuestionElements}
			<button className={'quiz-submit'}>Check Answers</button>
		</div>
	)
}