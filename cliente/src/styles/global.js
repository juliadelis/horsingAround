import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle` 

    *{
        margin: 0;
        padding: 0;
        font-family: 'popping', sans-serif;
    }

    body{
        width: 100vw;
        heigth: 100wv;
        display: flex;
        justify-content: center;
        background-color: #22211C;
    }
    `;

export default Global;