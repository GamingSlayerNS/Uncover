import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import '../styles/search.css';

export default function Search() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');

    const {state} = useLocation();
    const [searchText, setSearchText] = useState( state.text.split(" ") );
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0); // Add state for totalPages
    
    useEffect(() => {
        document.getElementById("submitBtn")?.click();
      return () => {
        
      }
    }, [currentPage])
    

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    function renderSearch(doc: any, index: number) {
        const searchList = document.querySelector('#search-list');

        let li = document.createElement('a');
        let name = document.createElement('h1');
        let url = document.createElement('strong');
        let desc = document.createElement('h1');

        // <a key={i} href={`https://${data.url}`} target='_blank' rel='noreferrer'>
        li.setAttribute('data-id', doc.id);
        li.setAttribute('href', `https://${doc.url}`);
        li.setAttribute('target', '_blank');
        li.setAttribute('rel', 'noreferrer');
        name.textContent = doc.name;
        name.classList.add("text-white");
        name.classList.add("text-xl");
        name.classList.add("mt-4");

        url.textContent = doc.url;
        url.classList.add("text-lg");
        url.classList.add("text-secondary");
        desc.textContent = " | " + doc.KWIC_ID1;
        desc.classList.add("inline")
        desc.classList.add("text-white");
        desc.classList.add("text-lg");

        li.appendChild(name);
        li.appendChild(url);
        li.appendChild(desc);

        /*searchList?.appendChild(li); */
         const page = Math.ceil((index + 1) / resultsPerPage);
         if (page === currentPage) {
            searchList?.appendChild(li);
        }
    }

    return (
        <>
            <div className="flex flex-row flex-wrap items-center mx-auto gap-8">
                <h1 className="text-white text-center text-5xl font-bold tracking-wide pb-4">Un<strong className="text-secondary">cover</strong></h1>
                
                <form className="flex flex-row bg-gray-600 rounded-full p-4 my-4">
                    <input
                        id='input'
                        className="shadow-lg appearance-none border rounded-l-full h-10 
                         w-full lg:w-[32rem]
                        text-gray-500 pl-4"
                        placeholder='Browse:'
                        value={searchText.join(" ") }
                        onChange={(e) => {setSearchText( e.target.value.toLowerCase().split(" ") )}}
                        onKeyDown= {handleKeyPress}
                    />
                    <button
                        id='submitBtn'
                        type='button'
                        className="bg-secondary hover:bg-blue-500 text-white font-bold
                            w-32 py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
                            //onClick={() => console.log(searchText)}
                         onClick={async () => {
                            // Reverse searchText for reverse searching
                            const db = getFirestore();
                            const colRef = collection(db, "KWIC")
                            const docSnap = await getDocs(colRef);
                            const docArray = docSnap.docs.map(doc => doc.data());

                            console.log(docArray.length)
                           // Array to store promises for each query
                            const queryPromises: any[] = [];
                            for (let i = 1; i <= 10; i++) {
                                searchText.forEach((word: string) => {
                                  const field = `KWIC_ID${i}`;
                                  const query = dataRef.where(field, '>=', word).where(field, '<=', word + '\uf8ff').get();
                                  queryPromises.push(query);
                                });
                            }
                            
                            const searchList = document.querySelector('#search-list');
                            searchList?.replaceChildren();
                            // Execute all queries concurrently
                            Promise.all(queryPromises)
                            .then((querySnapshots) => {
                                const mergedDocs: any[] = [];
                                
                                // Merge results
                                querySnapshots.forEach((snapshot: any) => {
                                    snapshot.docs.forEach((doc: any) => {
                                        const existingDocData = doc.data();

                                        // Check if the doc is not already in mergedDocs based on some unique identifier
                                        if (!mergedDocs.some(existingDoc => existingDoc.id === doc.id)) {
                                            mergedDocs.push(existingDocData);
                                        }
                                    });
                                });
                                const mergedDocsArray = mergedDocs.map((doc) => doc);

                                // Compare docArray with mergedDocsArray
                                const difference = docArray.filter((element) => {
                                    
                                    return !mergedDocsArray.some(existingDoc => existingDoc.name === element.name)
                                });

                                console.log("All Docs:", difference.length);
                                // difference.forEach(doc => {
                                //     console.log(doc.data().name);
                                // });
                                //console.log("Merged " + mergedDocs.length)
                                let totalResults = difference.length;
                                const totalPages = Math.ceil(totalResults / resultsPerPage);
                                setTotalPages(totalPages);
                                setCurrentPage(currentPage);
                                // // Render the merged results
                                 difference.forEach((doc: any, index: number) => {
                                     renderSearch(doc, index);
                                 });
                            })
                            .catch((error: any) => {
                                console.error('Error fetching data:', error);
                            });
                        }}
                    >
                        Search
                    </button>
                </form>
            </div>

            <Divider />

            <div id='search-list'></div>
            
            {(totalPages > 0 && totalPages<=100) && (
                 <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
        </>
    )
};

 const Pagination = ({ totalPages, currentPage, setCurrentPage }: any) => (
    <div className="pagination flex flex-wrap justify-end mr-10 space-x-2 gap-y-2">
        {Array.from({ length: totalPages }, (_, i) => (
            <button
                id = "pagBtn"
                key={i}
                type="button"
                className={`bg-secondary hover:bg-blue-500 text-white font-bold py-2 px-4 w-[50.41px] rounded ${currentPage === i + 1 ? "bg-blue-500" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
            >
                {i + 1}
            </button>
        ))}
    </div>
);
 
const Divider = () => <hr className="sidebar-hr" />