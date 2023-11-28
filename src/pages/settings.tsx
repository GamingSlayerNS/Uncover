import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { setDoc } from "firebase/firestore";

export default function Settings() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('settings');
    const query = dataRef.orderBy('mode').limit(1) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any) as any;
    const [searchMode, setSearchMode] = useState('');

    const changeMode = (m: string) => {
        setSearchMode(m);
        setDoc(dataRef.doc('mode'), {mode: m});
    }

    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Settings:</h1>
            {data && <h1 className="text-white text-3xl font-bold tracking-wide">current mode-{searchMode}</h1>}
            <div className="flex flex-col justify-center items-center m-auto gap-10">
                {data && (
                    data.map((data: any) => {
                        return (
                        <div key={'div-icon'} className="flex flex-row justify-between gap-0 w-96 m-auto mt-10">
                            <button key={'AND-btn'} onClick={() => changeMode('AND')}>
                                <SettingIcon key={'AND-icon'} setting="AND" active={data.mode === 'AND'} text="Set search to AND" />
                            </button>
                            <button key={'OR-btn'} onClick={() => changeMode('OR')}>
                                <SettingIcon key={'OR-icon'} setting="OR" active={data.mode === 'OR'} text="Set search to OR" />
                            </button>
                            <button key={'NOT-btn'} onClick={() => changeMode('NOT')}>
                                <SettingIcon key={'NOT-btn'} setting="NOT" active={data.mode === 'NOT'} text="Set search to NOT" />
                            </button>
                        </div>)
                    })
                )}
            </div>
        </div>
    )
}

export const SettingIcon = ({ setting, active, text = 'tooltip 💡' } : { setting: string, active: boolean, text: string}) => {
    return (
        <div key={`setting-${setting}`} className={`sidebar-icon${active? '-active' : ''} group`}>
            {setting}

            <span key={text} className="setting-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )
};