import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './homepage';
import Search from './pages/search';
import Searching from './pages/searching';
import Trending from './pages/trending';
import Firestore from './pages/firestore';
import AdminConsole from './pages/admin-console';
import Settings from './pages/settings';
import NoPage from './pages/error-page';

import './styles/index.css';
import reportWebVitals from './components/miscellaneous/reportWebVitals';

export default function App() {
    const [mode, setMode] = useState('AND');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />}>
                    <Route index path='' element={<Search />} />
                    <Route path='searching' element={<Searching />} />
                    <Route path='trending' element={<Trending />} />
                    <Route path='firestore' element={<Firestore />} />
                    <Route path='admin-console' element={<AdminConsole />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='*' element={<NoPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App /> as ReactNode);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
