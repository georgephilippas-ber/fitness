import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import axios from "axios";

axios.defaults.headers.common["authenticated-user"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjotMiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODUxODkwMjEsImV4cCI6MTY4NTE5NjIyMX0.-cymR6_MJ7SbSOcNl3VJVicsdpL7QKLWDfLzy2W-55U";

axios.post("http://localhost:4096/activities/all").then(value => {
    console.log(value.data);
})

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);