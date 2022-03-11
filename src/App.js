// importing necessary functions and packages
import {useState, useEffect} from 'react';

// importing files
import './App.css'; // importing stylesheet
import BlobBlue from './shared/BlobBlue.svg';
import BlobYellow from './shared/BlobYellow.svg';

// importing components
import Startup from './components/Startup'

// Main app component
export default function App() {

  // defining state here
  const [quizPageToggle, setQuizPageToggle] = useState(false); // initializing this state for toggling between startup page and main quiz page

  return (
    <main className={'app'}>
      <img src={BlobYellow} className={'blob-yellow'} alt={'BlobYellow'}/>
      <Startup toggleQuiz={()=>setQuizPageToggle(true)}/>
      <img src={BlobBlue} className={'blob-blue'} alt={'BlobBlue'}/>
    </main>
  );
}

