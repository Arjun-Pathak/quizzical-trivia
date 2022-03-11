// importing necessary functions and packages
import {useState, useEffect} from 'react';

// importing files
import './App.css'; // importing stylesheet
import BlobBlue from './shared/BlobBlue.svg';
import BlobYellow from './shared/BlobYellow.svg';

// importing components
import Startup from './components/Startup'
import Quiz from "./components/Quiz";

// Main app component
export default function App() {

  // defining state here
  const [quizPageToggle, setQuizPageToggle] = useState(true); // initializing this state for toggling between startup page and main quiz page

  return (
    <main className={`app ${quizPageToggle?'app-quiz': ''}`}>
      <img src={BlobYellow} className={`blob-yellow ${quizPageToggle? 'blob-yellow-quiz': ''}`} alt={'BlobYellow'}/>
      {
        quizPageToggle ?
        <Quiz/> :
        <Startup toggleQuiz={()=>setQuizPageToggle(true)}/>
      }

      <img src={BlobBlue} className={`blob-blue ${quizPageToggle ? 'blob-blue-quiz': ''}`} alt={'BlobBlue'}/>
    </main>
  );
}

