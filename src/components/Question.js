import './styles/Question.css' // importing stylesheet
import {nanoid} from "nanoid";
// question component
export default function Question(props) {
	return(
		<div className={'question'}>
			<h3 className={'question-title'}>{props.question}</h3>
			<div className={'question-button-container'}>
				{
					props.options.map((option)=>	{
						return <button
							className={
							`question-button
							${props.hasAnswerShown ? 'question-button-not_selected': ''}
							${!props.hasAnswerShown && props.userAnswer===option ? 'question-button-selected': ''}
							${props.hasAnswerShown && props.userAnswer === option && props.userAnswer === props.correctAnswer ? 'question-button-correct' : ''}
							${props.hasAnswerShown && props.userAnswer === option && props.userAnswer!==props.correctAnswer ? 'question-button-wrong' : ''}
							`}
							key={nanoid()}
							onClick={()=> props.changeAnswer(props.id, option)}
						>
							{option}
						</button>})}
			</div>
		</div>
	)
}
