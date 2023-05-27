import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import axios from "axios";

axios.defaults.headers.common["authenticated-user"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjotMiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODUyMTc1NjAsImV4cCI6MTY4NTIyNDc2MH0.3FUFa_G1Sc49YWoyu1Jo7tVAkSnVBBA-e6M3Whn2N2A";

axios.post("http://localhost:4096/activities/")

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
