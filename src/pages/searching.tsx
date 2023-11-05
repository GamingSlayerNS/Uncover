import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Search() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');
    //const query = dataRef.limit(10) as any;
    const query = dataRef.orderBy('KWIC_ID').startAt('google').endAt('google~') as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any);

    const [searchText, setSearchText] = useState('');

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    return (
        <>
            <div className="flex flex-row items-center mx-auto gap-8">
                <h1 className="text-white text-center text-5xl font-bold tracking-wide pb-4">Un<strong className="text-secondary">cover</strong></h1>
                
                <form className="flex flex-row bg-gray-600 rounded-full p-4 my-4">
                    <input
                        id='input'
                        className="shadow-lg appearance-none border rounded-l-full w-[32rem] h-10 text-gray-500 pl-4"
                        placeholder='Browse:'
                        value={searchText}
                        onChange={(e) => {setSearchText(e.target.value)}}
                        onKeyDown= {handleKeyPress}
                    />
                    <button
                        id='submitBtn'
                        type='button'
                        className="bg-secondary hover:bg-blue-500 text-white font-bold
                            w-32 py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
                        // onClick={}
                    >
                        Search
                    </button>
                </form>
            </div>

            <Divider />

            <div>
                {data && data.map((data, i) => 
                    <a key={i} href={`https://${data.url}`} target='_blank' rel='noreferrer'>
                        <h1 className="text-white text-xl mt-4" key={`name${i}`}>{data.name}</h1>
                        <h1 className="text-white text-lg" key={`url${i}`}>
                            <strong className="text-secondary">{data.url}</strong> | {data.KWIC_ID}
                        </h1>
                    </a>
                )}
            </div>
        </>
    )
};

const Divider = () => <hr className="sidebar-hr" />