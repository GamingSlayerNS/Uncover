import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

export default function Firestore() {
    const dataRef = firestore.collection('KWIC');
    const query = dataRef.limit(10) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any);

    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Database:</h1>
            {data && data.map((data, i) => <h1 className="text-white mt-4" 
            key={i}>{data.name}</h1>)}
        </div>
    )
}