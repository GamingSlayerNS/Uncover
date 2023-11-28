import { useState } from "react";
import { useNavigate } from "react-router-dom";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const firestore = firebase.firestore();
    const dataRef = firestore.collection('settings');
    const query = dataRef.orderBy('mode').limit(1) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any) as any;

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    return (
        <div className="my-auto lg:mx-auto">
            <h1 className="text-white text-center text-5xl font-bold tracking-wide">Un<strong className="text-secondary">cover</strong></h1>
            
            <form className="flex flex-col lg:flex-row justify-center items-center lg:items-baseline gap-6 lg:gap-0 lg:bg-gray-600 rounded-full p-4 my-10">
                <input
                    id='input'
                    className="shadow-lg appearance-none border rounded-full lg:rounded-r-none w-full lg:w-[32rem] h-10 text-gray-500 pl-4"
                    placeholder='Browse:'
                    value={searchText}
                    onChange={(e) => {setSearchText(e.target.value.toLowerCase())}}
                    onKeyDown= {handleKeyPress}
                />
                <button
                    id='submitBtn'
                    type='button'
                    className="bg-secondary hover:bg-blue-500 text-white font-bold
                        w-32 py-2 px-4 rounded-full lg:rounded-l-none focus:outline-none focus:shadow-outline"
                    onClick={() => {
                        if (data[0].mode === 'OR') {
                            navigate('searching-or', { state: { text: searchText } })
                        } else if (data[0].mode === 'NOT') {
                            navigate('searching-not', { state: { text: searchText } })
                        } else {
                            navigate('searching', { state: { text: searchText } })
                        }
                    }}
                >
                    Search
                </button>
            </form>
        </div>
    )
}