import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './components/sidebar';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Query, doc, getDoc, getFirestore } from 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDsL4c0SzMzr9oHIzqVCwTP3pYNEIyhNnU",
    authDomain: "uncover-fd469.firebaseapp.com",
    projectId: "uncover-fd469",
    storageBucket: "uncover-fd469.appspot.com",
    messagingSenderId: "94364416372",
    appId: "1:94364416372:web:efb54fdc229cea90db9421",
    measurementId: "G-Y1JH4V96GN"
})

const firestore = firebase.firestore();

const dbText = document.getElementById('#database-text');

function renderData(doc) {
    //dbText.innerHTML = doc.data().display_name;
}

function homepage() {
    //let dataMsg = callDatabase();
    let item = "Test";
    firestore.collection('KWIC').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data().display_name);
            renderData(doc);
        })
    });

    return (
        <div className="bg-gray-600 ml-16">
            <Sidebar />
            <header className="container m-auto">
                <div className="flex flex-col justify-start gap-4 m-auto pb-4 bg-gray-700 px-4 h-auto min-h-screen">
                    <Outlet />
                </div>
            </header>
        </div>
    );
}

export default homepage;
