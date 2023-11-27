import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ErrorPage() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');
    const query = dataRef.orderBy('visits', 'desc').limit(10) as any;
    const [data] = useCollectionData(query, {idField: 'id'} as any);

    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Trending:</h1>
            {data && data.map((data, i) => 
                <a key={i} href={`https://${data.url}`} target='_blank' rel='noreferrer'>
                    <h1 className="text-white text-xl mt-4" key={`name${i}`}>{data.name}</h1>
                    <h1 className="text-white text-lg" key={`url${i}`}>
                        <strong className="text-secondary">{data.url}</strong> | {data.visits} visits
                    </h1>
                </a>
            )}
        </div>
    )
}