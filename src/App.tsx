import React, {useState} from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import LineStorage from './components/LineStorage';
import CircularShift from './components/CircularShift';
import Alphabetizer from './components/AlphabeticShift';
import NoiseRemover from './components/NoiseRemover';
import Sidebar from './components/sidebar';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Query, doc, getDoc, getFirestore } from 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDsL4c0SzMzr9oHIzqVCwTP3pYNEIyhNnU",
    authDomain: "uncover-fd469.firebaseapp.com",
    projectId: "uncover-fd469",
    storageBucket: "uncover-fd469.appspot.com",
    messagingSenderId: "94364416372",
    appId: "1:94364416372:web:efb54fdc229cea90db9421",
    measurementId: "G-Y1JH4V96GN"
})

const firestore = firebase.firestore();

interface T {
    KWIC: String,
    display_name: String
}

const dbText = document.getElementById('#database-text');

function renderData(doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) {
    //dbText.innerHTML = doc.data().display_name;
}

function App() {
    const [inputText, setInputText] = useState('');
    const [shiftedText, setShiftedText] = useState(['']);
    const [noiseEliminatedText, setNoiseEliminatedText] = useState([''])
    const [alphabetizedText, setAlphabetizedText] = useState(['']);
    const [inputHist, setInputHist] = useState('')

    function handleKeyPress(event: { key: string; preventDefault: () => void; }){
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("submitBtn")?.click();
            }
    }

    //let dataMsg = callDatabase();
    let item = "Test";
    firestore.collection('KWIC').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data().display_name);
            renderData(doc);
        })
    });

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

                                setNoiseEliminatedText(
                                    noiseRemover.removeNoise(
                                        circularShift.circularShift(
                                            lineStorage.lineStorage(updatedHist)
                                        )
                                    )
                                );

                                setAlphabetizedText(
                                    alphabetizer.alphabetize(
                                        noiseRemover.removeNoise(
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
                    
                    <div>
                        <h1 className="text-white text-4xl font-bold mb-4">Output:</h1>
                        <h2 className="text-white text-2xl font-bold">Shifted Lines:</h2>
                        <div className="text-white text-md font-bold">
                            {shiftedText.map((sentences, i)=>
                                <div key={i}>{sentences}</div>
                            )}
                        </div>
                        <h2 className="text-white text-2xl font-bold mt-2">Noise Eliminated Lines:</h2>
                        <div className="text-white text-md font-bold">
                            {noiseEliminatedText.map((sentences, i)=>
                                <div key={i}>{sentences}</div>
                            )}
                        </div>
                        <h2 className="text-white text-2xl font-bold mt-2">Alphabetized Lines:</h2>
                        <div className="text-white text-md font-bold">
                            {alphabetizedText.map((sentences, i)=>
                                <div key={i}>
                                    {sentences}
                                    {/* <div className="text-green-500">{ sentences[i] === inputHist.split('. ').at(inputHist.length - 1) && sentences}</div>
                                    <div className="text-red-200">{ sentences[i] !== inputHist.split('. ').at(inputHist.length - 1) && sentences}</div> */}
                                </div>
                            )}
                        </div>
                        <h2 className="text-white text-2xl font-bold mt-2">Input History:</h2>
                        <div className="text-white text-md font-bold">
                            {inputHist.split('. ').map((input, i) => (
                                <div key={i}>{input}</div>
                            ))}
                        </div>
                        <h2 id='database-text' className="text-white text-2xl font-bold mt-2">{ item }</h2>
                    </div>

                </div>
            </header>
        </div>
    );
}

export default App;
