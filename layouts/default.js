
import fs from "fs";

import { config } from "../_config.js";

export const DefaultLayout = ({ title, content, askSearchEnginesNotToIndex, includeClientJS = true, openGraphImage }) => {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <link rel="preload" crossorigin href="/components/responsive-image.js" as="script" />
        <link rel="preload" crossorigin href="/web_modules/lit-element.js" as="script" />

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${ askSearchEnginesNotToIndex || config.askSearchEnginesNotToIndex 
          ? `<meta name="robots" content="noindex" />`
          : ""}
        <title>${ title }</title>

        <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great&amp;display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/shared.css" />
        <link rel="stylesheet" href="/css/album.css" />
        <link rel="stylesheet" href="/css/picture.css" />
        <link rel="stylesheet" href="/css/transition.css" />

        <link rel="icon" href="${ config.favicon }" />
        
        <script type="module" crossorigin src="/web_modules/lit-element.js"></script>
        <script type="module" crossorigin src="/components/responsive-image.js"></script>
        ${ includeClientJS 
          ? `<script type="module" crossorigin src="/client.js"></script>`
          : ""}

        ${ openGraphImage 
          ? `<meta property="og:image" content="${ openGraphImage }" />`
          : ""}
      </head>
      <body>
        ${ content }
      </body>
    </html>
  `;
};
