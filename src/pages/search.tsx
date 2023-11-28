import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Autocomplete } from "@mui/material"
import TextField from "@mui/material/TextField"

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');
    const query = dataRef.orderBy('name').limit(1000) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any) as any;

    const settingRef = firestore.collection('settings');
    const settingQuery = settingRef.orderBy('mode').limit(1) as any;
    const [settings] = useCollectionData(settingQuery, {idField: 'id'} as any) as any;

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    const handleChange = (event: any, values: any) => {
        if (values) {
            setSearchText(values.split(" ")[0].toLowerCase());
            console.log(values.split(" ")[0].toLowerCase());
        }
    }

    return (
        <div className="my-auto lg:mx-auto">
            <h1 className="text-white text-center text-5xl font-bold tracking-wide">Un<strong className="text-secondary">cover</strong></h1>
            
            <form className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-0 lg:bg-gray-600 rounded-full p-4 my-10">
                <Autocomplete
                    id='input'
                    className="shadow-lg appearance-none border rounded-full lg:rounded-r-none w-full lg:w-[32rem] h-14 text-gray-500 pl-4 bg-white"
                    freeSolo
                    options={data && data.map((option: any) => option.name)}
                    onInputChange={handleChange}
                    onKeyDown={handleKeyPress}
                    renderInput={(params) => <TextField
                        className="h-14 rounded-full"
                        {...params}
                        label="Browse:"
                        
                        // placeholder='Browse:'
                        // value={searchText}
                        // onChange={(e) => {setSearchText(e.target.value.toLowerCase())}}
                        // onKeyDown= {handleKeyPress}
                    />}
                />
                <button
                    id='submitBtn'
                    type='button'
                    className="bg-secondary hover:bg-blue-500 text-white font-bold
                        w-32 h-14 py-2 px-4 rounded-full lg:rounded-l-none focus:outline-none focus:shadow-outline"
                    onClick={() => {
                        if (settings[0].mode === 'OR') {
                            navigate('searching-or', { state: { text: searchText } })
                        } else if (settings[0].mode === 'NOT') {
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