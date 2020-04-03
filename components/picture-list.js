
import { createElement }      from "../web_modules/preact.js";
import { useRef,
         useEffect }          from "../web_modules/preact/hooks.js";
import   htm                  from "../web_modules/htm.js";
const    html = htm.bind(createElement);
import { isBrowser,
         usingKeyboard }      from "../helpers/environment.js";
import { closest }            from "../helpers/closest.js";
import { RenderedMarkdown }   from "../components/rendered-markdown.js";
import { PictureListItem }    from "../components/picture-list-item.js";


let getSelectedPicture = function() {
  return null;
}


function PictureList({ album, pictures, story, state }) {

  const selectedPicture = useRef(null);

  getSelectedPicture = function() {
    return selectedPicture.current;
  }

  const stateStrings = state.toStrings();


  // ⌨️ If the list view just appeared, move focus to the current selected picture
  useEffect(() => {
    if (usingKeyboard() && 
        state.matches("showing_list") && 
        state.context.selectedPictureIndex != null) {
      closest(selectedPicture.current, "a").focus();
    }
  }, [state.value, state.context.selectedPictureIndex, selectedPicture]);


  // Scroll the selected a picture into view, if needed
  useEffect(() => {
    if (isBrowser() &&
        state.context.selectedPictureIndex != null) {
      const picture = selectedPicture.current
      const above = picture.getBoundingClientRect().y + picture.offsetHeight < 0;
      const below = picture.getBoundingClientRect().y > window.innerHeight;
      if (above || below) {
        picture.scrollIntoView();
      }
    }
  }, [state.context.selectedPictureIndex, selectedPicture]);


  return html`
    <section class="picture-list"
             data-state="${stateStrings[stateStrings.length - 1]}">
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
      ${ (album.date)
         ? html`<p>${ album.date }</p>`
         : "" }

      <ol>
        ${pictures.map((picture, index) => {
          const options = {
            album,
            picture,
            selected: (state.context.selectedPictureIndex === index),
            selectedPictureReference: selectedPicture,
            index,
            state,
            linkURL: `/${album.uri}/${picture.uri}/`
          };

          return html`
            <${PictureListItem} ...${options} />
          `;
        })}
      </ol>

      ${ (story)
         ? html`<article><${RenderedMarkdown} markdown="${ story }"></${RenderedMarkdown}></article>`
         : "" }

      ${ (album.zipFileSize)
         ? html`<p class="action">
                  <a href="/archives/${ album.uri }.zip">Download All Pictures</a><br />
                  <small>ZIP file / ${ album.zipFileSize }</small>
                </p>`
         : "" }
    </section>

  `;

}


export { PictureList, getSelectedPicture };

