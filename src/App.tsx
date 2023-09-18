import React from 'react';

import Input from './components/input';
import LineStorage from './components/line-storage';
import CircularShift from './components/circular-shift';
import Alphabetizer from './components/alphabetizer';
import Output from './components/output';

function App() {
    return (
        <div className="flex text-center underline pad2">
            <header className="flex-col gap-4 flex">
                <h1 className="bg-green-400">Hello_World</h1>
                <Input text={"Hello"} onClick={() => {}} />
                <LineStorage text={"Hello"} onClick={() => {}} />
                <CircularShift text={"Hello"} onClick={() => {}} />
                <Alphabetizer text={"Hello"} onClick={() => {}} />
                <Output text={"Hello"} onClick={() => {}} />
            </header>
        </div>
    );
}

export default App;


// import './styles/App.css';

// function App() {
//   return (
//     <h1 className="text-3xl font-bold underline text-red-600">
//       Simple React Typescript Tailwind Sample
//     </h1>
//   );  
// }

// export default App;