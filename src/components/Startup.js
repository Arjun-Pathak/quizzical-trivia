
import './styles/Startup.css'; // importing stylesheet

// startup component
export default function Startup({toggleQuiz}) {
	return(
		<div className={'startup'}>
			<h1 className={'startup--title'}>Quizzical</h1>
			<p className={'startup--description'}>Welcome is Quizzical Trivia! <br/> Start the quiz by clicking the button below.</p>
			<button className={'startup--button'} onClick={toggleQuiz}>Start Quiz</button>
		</div>
	);
}