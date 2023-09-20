import React, {useState} from 'react';

import Sidebar from './components/sidebar';
import Alphabetizer from './AlphabeticShift';

function App() {
    const [inputText, setInputText] = useState('')
    const [outputText, setOutputText] = useState([''])

    return (
        <div className="bg-gray-600 ml-16 h-screen">
            <Sidebar />
            <header className="container m-auto">
                <div className="flex flex-col justify-start gap-4 m-auto bg-gray-700 px-4 h-screen">
                    <h1 className="text-white text-5xl font-bold tracking-wide">Uncover</h1>
                    <form className="flex flex-row gap-16 bg-gray-600 rounded px-8 py-6">
                        <input
                            className="shadow-lg appearance-none border rounded w-full text-gray-500 pl-4"
                            placeholder='Search:'
                            onChange={(e) => {setInputText(e.target.value)}}
                        />
                        <button
                            type='button'
                            className="bg-secondary hover:bg-blue-500 text-white font-bold
                                py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                const alphabetizer = new Alphabetizer()
                                setOutputText(alphabetizer.alphabetize(inputText))
                            }}
                        >
                            Submit
                        </button>
                    </form>
                    <div>
                        {outputText}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
