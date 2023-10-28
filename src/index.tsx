import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './homepage';
import Search from './pages/search';
import AdminConsole from './pages/admin-console';
import NoPage from './pages/error-page';

import './styles/index.css';
import reportWebVitals from './components/miscellaneous/reportWebVitals';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* fix: add index to below path */}
                <Route path='/' element={<HomePage />}>
                    <Route index path='' element={<Search />} />
                    <Route path='admin-console' element={<AdminConsole />} />
                    <Route path='*' element={<NoPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
