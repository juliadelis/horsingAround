import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle` 

    *{
        margin: 0;
        padding: 0;
        font-family: 'popping', sans-serif;
        box-sizing: border-box;
    }

    :root {
        --color-accent: #FFD08A;
        --color-bg-dark: #22211C;
        --color-bg-submenu: #333129;
        --color-card: #AFAFA7;
        --color-text-dark-bg: #CDCCC8;
    }

    html, body, #root{
        width: 100%;
        min-height: 100%;
    }

    body{
        min-height: 100vh;
        background-color: var(--color-bg-dark);
        color: var(--color-text-dark-bg);
        overflow-x: hidden;
    }
    `;

export default Global;
