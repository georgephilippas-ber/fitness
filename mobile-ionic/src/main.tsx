import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import axios from "axios";
import {DateTime} from "luxon";

axios.defaults.headers.common["authenticated-user"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjotMiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODUyNDgxODgsImV4cCI6MTY4NTUwNzM4OH0.TztaAV12HZzXZV3TImt5qA-TUZ72ZSKrMD74whbf6io";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
