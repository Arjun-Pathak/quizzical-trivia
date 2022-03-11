import './styles/Question.css' // importing stylesheet

// question component
export default function Question(props) {

	return(
		<div className={'question'}>
			<h3 className={'question-title'}>{props.question}</h3>
			<div className={'question-button-container'}>

				<button className={'question-button question-button-selected'}>Adios</button>
			</div>
		</div>
	)
}
