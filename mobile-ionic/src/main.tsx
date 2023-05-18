import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import {
    processServing,
    processProductDesignation,
    processFundamentalNutrients
} from "./model/nutrition/controllers/nutrition";

function test() {
    console.log(processServing("30 milliliters"));
    console.log(processProductDesignation("food, this is a name, this is a company, char1, char2"));
    console.log(processFundamentalNutrients("0 10 20 0 4 0 -1"));
}

test();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);