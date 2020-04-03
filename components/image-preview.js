
import { createElement }        from "../web_modules/preact.js";
import   htm                    from "../web_modules/htm.js";
const    html = htm.bind(createElement);

function ImagePreview({ picture }) {
  if (picture.previewBase64) {
    return html`
      <img
        class="preview"
        width="${ 320 * (picture.width  > picture.height ? 1 : picture.width/picture.height) }"
        height="${320 * (picture.height > picture.width  ? 1 : picture.height/picture.width) }"
        src="data:image/jpeg;base64,${picture.previewBase64}"
        alt=""
      />
    `;
  } else {
    return "";
  }
}


export { ImagePreview };

