import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import LineStorage from '../components/LineStorage';
import CircularShift from '../components/CircularShift';

export default function Firestore() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');
    const query = dataRef.orderBy('name').limit(10) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any);

    const [entryId, setEntryId] = useState('');
    const [entryIdKWIC, setEntryIdKWIC] = useState(['']);
    const [nameText, setNameText] = useState('');
    const [urlText, setUrlText] = useState('');

    const writeEntry = async() => {
        console.log("Adding to database: " + entryId 
            + ", " + nameText + ", " + urlText);
        console.log(entryIdKWIC);

        await dataRef.add({
            name: nameText,
            KWIC_ID1: entryId,
            KWIC_ID2: entryIdKWIC[1] ? entryIdKWIC[1] : null,
            KWIC_ID3: entryIdKWIC[2] ? entryIdKWIC[2] : null,
            KWIC_ID4: entryIdKWIC[3] ? entryIdKWIC[3] : null,
            KWIC_ID5: entryIdKWIC[4] ? entryIdKWIC[4] : null,
            KWIC_ID6: entryIdKWIC[5] ? entryIdKWIC[5] : null,
            KWIC_ID7: entryIdKWIC[6] ? entryIdKWIC[6] : null,
            KWIC_ID8: entryIdKWIC[7] ? entryIdKWIC[7] : null,
            KWIC_ID9: entryIdKWIC[8] ? entryIdKWIC[8] : null,
            KWIC_ID10: entryIdKWIC[9] ? entryIdKWIC[9] : null,
            url: urlText,
            visits: 0
        });

        console.log("Done");
        setEntryId('');
        setNameText('');
        setUrlText('');
    }

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Database:</h1>
            {data && data.map((data, i) => 
                <a key={i} href={`https://${data.url}`} target='_blank' rel='noreferrer'>
                    <h1 className="text-white text-xl mt-4" key={`name${i}`}>{data.name}</h1>
                    <h1 className="text-white text-lg" key={`url${i}`}>
                        <strong className="text-secondary">{data.url}</strong> | {data.KWIC_ID1}
                    </h1>
                </a>
            )}
            
            <form className="flex flex-col gap-8 bg-gray-600 rounded px-8 py-6 mt-4">
                <input
                    id='input1'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Entry:'
                    value={entryId}
                    onChange={(e) => {
                        setEntryId(e.target.value.toLowerCase())
                        const lineStorage = new LineStorage();
                        const circularShift = new CircularShift();
                        setEntryIdKWIC(
                            circularShift.circularShift(
                                lineStorage.lineStorage(e.target.value.toLowerCase())
                            )
                        );
                    }}
                    onKeyDown= {handleKeyPress}
                />
                <input
                    id='input2'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Name:'
                    value={nameText}
                    onChange={(e) => {setNameText(e.target.value)}}
                    onKeyDown= {handleKeyPress}
                />
                <input
                    id='input3'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Url:'
                    value={urlText}
                    onChange={(e) => {setUrlText(e.target.value)}}
                    onKeyDown= {handleKeyPress}
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