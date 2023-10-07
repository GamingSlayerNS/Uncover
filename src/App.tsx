import React, {useState} from 'react';

import LineStorage from './components/LineStorage';
import CircularShift from './components/CircularShift';
import Alphabetizer from './components/AlphabeticShift';
import NoiseRemover from './components/NoiseRemover';
import Sidebar from './components/sidebar';

function App() {
    const [inputText, setInputText] = useState('');
    const [shiftedText, setShiftedText] = useState(['']);
    const [alphabetizedText, setAlphabetizedText] = useState([''])
    const [outputText, setOutputText] = useState(['']);
    const [inputHist, setInputHist] = useState('')

    function handleKeyPress(event: { key: string; preventDefault: () => void; }){
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("submitBtn")?.click();
            }
    }


    return (
        <div className="bg-gray-600 ml-16">
            <Sidebar />
            <header className="container m-auto">
                <div className="flex flex-col justify-start gap-4 m-auto pb-4 bg-gray-700 px-4 h-auto min-h-screen">
                    <h1 className="text-white text-5xl font-bold tracking-wide">Uncover</h1>
                    <form className="flex flex-row gap-16 bg-gray-600 rounded px-8 py-6">
                        <input
                            id='input'
                            className="shadow-lg appearance-none border rounded w-full text-gray-500 pl-4"
                            placeholder='Search:'
                            onChange={(e) => {setInputText(e.target.value)}}
                            onKeyPress= {handleKeyPress}
                        />
                        <button
                            id='submitBtn'
                            type='button'
                            className="bg-secondary hover:bg-blue-500 text-white font-bold
                                py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                setInputHist(prevInputHistory => prevInputHistory + inputText)
                                let updatedHist = inputHist + inputText;
                                const lineStorage = new LineStorage();
                                const circularShift = new CircularShift();
                                const alphabetizer = new Alphabetizer();
                                const noiseRemover = new NoiseRemover();
                                setShiftedText(
                                    circularShift.circularShift(
                                        lineStorage.lineStorage(updatedHist)
                                    )
                                );

                                setAlphabetizedText(
                                    alphabetizer.alphabetize(
                                        circularShift.circularShift(
                                            lineStorage.lineStorage(updatedHist)
                                        )
                                    )
                                );

                                setOutputText(
                                    noiseRemover.removeNoise(
                                        alphabetizer.alphabetize(
                                            circularShift.circularShift(
                                                lineStorage.lineStorage(updatedHist)
                                            )
                                        )
                                    )
                                );
                            }}
                        >
                            Submit
                        </button>
                    </form>
                    <h2 className="text-white text-2xl font-bold">Shifted Lines:</h2>
                    <div className="text-white text-md font-bold">
                        {shiftedText.map((sentences, i)=>
                            <div key={i}>{sentences}</div>
                        )}
                    </div>
                    <h2 className="text-white text-2xl font-bold">Alphabetized Lines:</h2>
                    <div className="text-white text-md font-bold">
                        {alphabetizedText.map((sentences, i)=>
                            <div key={i}>{sentences}</div>
                        )}
                    </div>
                    <h2 className="text-white text-2xl font-bold">Output:</h2>
                    <div className="text-white text-md font-bold">
                        {outputText.map((sentences, i)=>
                            <div key={i}>{sentences}</div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-white text-2xl font-bold">Input History:</h2>
                        <div className="text-white text-md font-bold">
                            {inputHist.split('. ').map((input, i) => (
                                <div key={i}>{input}</div>
                            ))}
                        </div>
                    </div>

                </div>
            </header>
        </div>
    );
}

export default App;
