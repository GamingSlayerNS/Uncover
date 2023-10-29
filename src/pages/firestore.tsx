import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
//import { set, ref, getDatabase } from "firebase/database";

import { useState } from 'react';

export default function Firestore() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');
    const query = dataRef.limit(10) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any);

    const [entryId, setEntryId] = useState('');
    const [nameText, setNameText] = useState('');
    const [urlText, setUrlText] = useState('');

    const writeEntry = async() => {
        console.log("Adding to database: " + entryId 
            + ", " + nameText + ", " + urlText);

        await dataRef.add({
            name: nameText,
            url: urlText
        });

        console.log("Done");
    }

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    // setEntryId("hoyolab");
    // setNameText("Hoyolab");
    // setUrlText("https://www.hoyolab.com");

    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Database:</h1>
            {data && data.map((data, i) => <h1 className="text-white mt-4" 
            key={i}>{data.name}</h1>)}
            
            <form className="flex flex-col gap-8 bg-gray-600 rounded px-8 py-6 mt-4">
                <input
                    id='input1'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Entry:'
                    onChange={(e) => {setEntryId(e.target.value)}}
                    onKeyPress= {handleKeyPress}
                />
                <input
                    id='input2'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Name:'
                    onChange={(e) => {setNameText(e.target.value)}}
                    onKeyPress= {handleKeyPress}
                />
                <input
                    id='input3'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Url:'
                    onChange={(e) => {setUrlText(e.target.value)}}
                    onKeyPress= {handleKeyPress}
                />
                <button
                    id='submitBtn'
                    type='button'
                    className="bg-secondary hover:bg-blue-500 text-white font-bold
                        py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={writeEntry}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}