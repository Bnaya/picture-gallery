
import { createElement }  from "../web_modules/preact.js";
import   htm              from "../web_modules/htm.js";
const    html = htm.bind(createElement);
import { getSource,
         getSourceSet,
         getCoverPicture,
         IMAGE_LIST_SIZES }   from "../helpers/image-source-set.js";

import { PictureGallery } from "../components/picture-gallery.js";

function ParentAlbumPage({ album }) {
//function ParentAlbumPage({ album, pictures, story, getPageURL }) {

  // console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
  // console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
  // console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
  // console.log(album.uri);
  // console.log(album);
  // console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
  // console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
  // console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");

  // if (!pictures) pictures = [];
  // 
  // return html`
  //   <${PictureGallery}
  //     album="${album}"
  //     pictures="${pictures}"
  //     story="${story}"
  //     getPageURL="${getPageURL}" />
  // `;

  return html`
    <section class="picture-list picture-list__has-captions">
      <h1>
        ${ album.title }
        ${ (album.parent)
            ? html` / <a href="${album.parent.uri == ""
                                  ? "/"
                                  : `/${album.parent.uri}/` }">
                        ${ album.parent.title }
                      </a>`
            : "" }
      </h1>
      <p> ${ album.date  }</p>

      <ol>
        ${album.albums.map((album, index) => {
          const sourceData = getCoverPicture({album});
          const { picture } = sourceData;

          const sizes = (picture.width && picture.height)
            ? `(min-width: 60em) 33vw, (min-width: 30em) 50vw, 100vw`
            : `100vw`;

          return html`
          <li>
            <a href="/${album.uri}/">
              <responsive-image
                aspect-ratio="${
                  (picture.width && picture.height)
                  ? `${picture.width}/${picture.height}`
                  : "1/1"
                }"
                max-width="100%"
                max-height="100%">
                ${ (picture.previewBase64)
                   ? html`
                  <img
                    class="preview"
                    width="${ 320 * (picture.width  > picture.height ? 1 : picture.width/picture.height) }"
                    height="${320 * (picture.height > picture.width  ? 1 : picture.height/picture.width) }"
                    src="data:image/jpeg;base64,${picture.previewBase64}" alt="" />`
                   : "" }
                <img
                  src="${getSource(sourceData)}"
                  srcset="${getSourceSet(sourceData)}"
                  sizes="${getSourceSet(sourceData) ? sizes : null}"
                  loading="lazy"
                  alt="${
                    (picture.description)
                    ? picture.description
                    : `Picture ${index + 1}`
                  }"
                  width="${ 320 * (picture.width  > picture.height ? 1 : picture.width/picture.height) }"
                  height="${320 * (picture.height > picture.width  ? 1 : picture.height/picture.width) }"
                  data-style="background-color: ${ picture.primaryColor || "unset" }" />
              </responsive-image>
              <span class="caption">${ album.title }</span>
            </a>
          </li>
          `
        })}
      </ol>
    </section>

  `;
}


export { ParentAlbumPage };

