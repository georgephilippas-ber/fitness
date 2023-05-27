import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import axios from "axios";
import {DateTime} from "luxon";

axios.defaults.headers.common["authenticated-user"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjotMiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODUyMjM2NzksImV4cCI6MTY4NTIzMDg3OX0.0xq4SLPsQ9XwuJ3x4NVBy-itGlWwicPkxTtEdksXRGg";

axios.post("http://localhost:4096/activity/latest").then(value => {
    console.log(DateTime.fromMillis(value.data.referenceDate).toLocaleString(DateTime.DATE_HUGE));
    console.log((value.data.referenceDate));
    console.log((value.data));
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
