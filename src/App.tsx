import React, {useState} from 'react';

import CircularShift from './components/CircularShift';
import Alphabetizer from './AlphabeticShift';
import Sidebar from './components/sidebar';

function App() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState(['']);

    var input = document.getElementById("input");
    input?.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    });

    return (
        <div className="bg-gray-600 ml-16 h-screen">
            <Sidebar />
            <header className="container m-auto">
                <div className="flex flex-col justify-start gap-4 m-auto bg-gray-700 px-4 h-screen">
                    <h1 className="text-white text-5xl font-bold tracking-wide">Uncover</h1>
                    <form className="flex flex-row gap-16 bg-gray-600 rounded px-8 py-6">
                        <input
                            id='input'
                            className="shadow-lg appearance-none border rounded w-full text-gray-500 pl-4"
                            placeholder='Search:'
                            onChange={(e) => {setInputText(e.target.value)}}
                        />
                        <button
                            id='submitBtn'
                            type='button'
                            className="bg-secondary hover:bg-blue-500 text-white font-bold
                                py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                const circularShift = new CircularShift();
                                const alphabetizer = new Alphabetizer();
                                setOutputText(
                                    alphabetizer.alphabetize(
                                        circularShift.circularShift(inputText)
                                    )
                                );
                            }}
                        >
                            Submit
                        </button>
                    </form>
                    <div className="text-white text-md font-bold">
                        {outputText.map((sentences, i)=>
                            <div key={i}>{sentences}</div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
