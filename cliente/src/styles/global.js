import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle` 

    *{
        margin: 0;
        padding: 0;
        font-family: 'popping', sans-serif;
        box-sizing: border-box;
    }

    html, body, #root{
        width: 100%;
        min-height: 100%;
    }

    body{
        min-height: 100vh;
        background-color: #22211C;
        overflow-x: hidden;
    }
    `;

export default Global;