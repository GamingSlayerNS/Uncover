import { Autocomplete } from "@mui/material"
import TextField from "@mui/material/TextField"

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ErrorPage() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');
    const query = dataRef.orderBy('name').limit(100) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any) as any;

    return (
        <div className="flex flex-col gap-10 justify-center m-auto">
            <h1 className="text-white text-center text-5xl font-bold tracking-wide">No Page Found</h1>
            <div className="flex flex-col">
                <Autocomplete className="w-80 text-white"
                    freeSolo
                    id="free-solo-2-demo"
                    options={data && data.map((option: any) => option.name)}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                />
            </div>
        </div>
    )
}