import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDocs } from 'firebase/firestore';

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import '../styles/search.css';

export default function Search() {
    const firestore = firebase.firestore();
    const dataRef = firestore.collection('KWIC');

    const {state} = useLocation();
    const [searchText, setSearchText] = useState(state.text);
    
    useEffect(() => {
        document.getElementById("submitBtn")?.click();
    
      return () => {
        
      }
    }, [])
    

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    function renderSearch(doc: any) {
        const searchList = document.querySelector('#search-list');

        let li = document.createElement('a');
        let name = document.createElement('h1');
        let url = document.createElement('strong');
        let desc = document.createElement('h1');

        // <a key={i} href={`https://${data.url}`} target='_blank' rel='noreferrer'>
        li.setAttribute('data-id', doc.id);
        li.setAttribute('href', `https://${doc.data().url}`);
        li.setAttribute('target', '_blank');
        li.setAttribute('rel', 'noreferrer');
        name.textContent = doc.data().name;
        name.classList.add("text-white");
        name.classList.add("text-xl");
        name.classList.add("mt-4");

        url.textContent = doc.data().url;
        url.classList.add("text-lg");
        url.classList.add("text-secondary");
        desc.textContent = " | " + doc.data().KWIC_ID1;
        desc.classList.add("inline")
        desc.classList.add("text-white");
        desc.classList.add("text-lg");

        li.appendChild(name);
        li.appendChild(url);
        li.appendChild(desc);

        searchList?.appendChild(li);
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
                        value={searchText}
                        onChange={(e) => {setSearchText(e.target.value.toLowerCase())}}
                        onKeyDown= {handleKeyPress}
                    />
                    <button
                        id='submitBtn'
                        type='button'
                        className="bg-secondary hover:bg-blue-500 text-white font-bold
                            w-32 py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
                        onClick={async () => {
                            // Reverse searchText for reverse searching
                            const query1 = dataRef.orderBy('KWIC_ID1').startAt(searchText).endAt(searchText + '~') as any;
                            const query2 = dataRef.orderBy('KWIC_ID2').startAt(searchText).endAt(searchText + '~') as any;
                            const query3 = dataRef.orderBy('KWIC_ID3').startAt(searchText).endAt(searchText + '~') as any;
                            const query4 = dataRef.orderBy('KWIC_ID4').startAt(searchText).endAt(searchText + '~') as any;
                            const query5 = dataRef.orderBy('KWIC_ID5').startAt(searchText).endAt(searchText + '~') as any;
                            const query6 = dataRef.orderBy('KWIC_ID6').startAt(searchText).endAt(searchText + '~') as any;
                            const query7 = dataRef.orderBy('KWIC_ID7').startAt(searchText).endAt(searchText + '~') as any;
                            const query8 = dataRef.orderBy('KWIC_ID8').startAt(searchText).endAt(searchText + '~') as any;
                            const query9 = dataRef.orderBy('KWIC_ID9').startAt(searchText).endAt(searchText + '~') as any;
                            const query10 = dataRef.orderBy('KWIC_ID10').startAt(searchText).endAt(searchText + '~') as any;
                            const searchList = document.querySelector('#search-list');
                            searchList?.replaceChildren();

                            await getDocs(query1).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query2).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query3).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query4).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query5).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query6).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query7).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query8).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query9).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })

                            await getDocs(query10).then(snapshot => {
                                snapshot.docs.forEach(doc => {
                                    renderSearch(doc);
                                })
                            })
                        }}
                    >
                        Search
                    </button>
                </form>
            </div>

            <Divider />

            <div id='search-list'></div>
        </>
    )
};

const Divider = () => <hr className="sidebar-hr" />