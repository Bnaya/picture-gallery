
import { createElement }        from "../web_modules/preact.js";
import   htm                    from "../web_modules/htm.js";
const    html = htm.bind(createElement);
import { getSource,
         getSourceSet }   from "../helpers/image-source-set.js";

function Image({ album, picture, pictureNumber, selected, sizes }) {
  return html`
    <img
      src="${getSource({album, picture})}"
      srcset="${getSourceSet({album, picture})}"
      sizes="${getSourceSet({album, picture}) ? sizes : null}"
      width="${ 320 * (picture.width  > picture.height ? 1 : picture.width/picture.height) }"
      height="${320 * (picture.height > picture.width  ? 1 : picture.height/picture.width) }"
      data-style="background-color: ${ picture.primaryColor || "unset" }"
      loading="lazy"
      alt="${(picture.description)
              ? picture.description
              : `Picture ${pictureNumber}`}"
      data-selected="${selected ? "true" : ""}"
    />
  `;
}


export { Image };

