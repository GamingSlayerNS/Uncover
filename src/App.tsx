import React from 'react';

import Input from './components/input';
import LineStorage from './components/line-storage';
import CircularShift from './components/circular-shift';
import Alphabetizer from './components/alphabetizer';
import Output from './components/output';
import Sidebar from './components/sidebar';

function App() {
    return (
        <div className="bg-gray-600 ml-16 h-screen">
            <Sidebar />
            <header className="container m-auto">
                <div className="flex flex-col justify-start gap-4 m-auto bg-gray-700 px-4 h-screen">

                    <h1 className="text-white text-5xl font-bold tracking-wide">Unravel</h1>
                    <form className="flex flex-row gap-16 bg-gray-600 rounded px-8 py-6">
                        <input className="shadow-lg appearance-none border rounded w-full text-gray-500 pl-4" placeholder='Search:' />
                        <button className="bg-secondary hover:bg-blue-500 text-white font-bold 
                        py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Submit</button>
                    </form>
                    <Input text={"Hello"} onClick={() => {}} />
                    <LineStorage text={"Hello"} onClick={() => {}} />
                    <CircularShift text={"Hello"} onClick={() => {}} />
                    <Alphabetizer text={"Hello"} onClick={() => {}} />
                    <Output text={"Hello"} onClick={() => {}} />
                </div>
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