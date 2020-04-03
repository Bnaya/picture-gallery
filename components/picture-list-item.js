
import { createElement }        from "../web_modules/preact.js";
import { useContext }           from "../web_modules/preact/hooks.js";
import   htm                    from "../web_modules/htm.js";
const    html = htm.bind(createElement);
import { onKeyboardDetected }   from "../helpers/environment.js";

import { GalleryDispatch }      from "../components/picture-gallery.js";
import { ImagePreview }         from "../components/image-preview.js";
import { Image }                from "../components/image.js";


function ResponsiveImage(options) {
  const { picture, selected, selectedPictureReference } = options;
  return html`
    <responsive-image
      aspect-ratio="${
        (picture.width && picture.height)
          ? `${picture.width}/${picture.height}`
          : "1/1"
      }"
      max-width="100%"
      max-height="100%"
      ref="${selectedPictureReference && selected ? selectedPictureReference : null}">
      <${ImagePreview} ...${options}></${ImagePreview}>
      <${Image}        ...${options}></${Image}>
    </responsive-image>
  `;
}


function PictureListItem(options) {
  const { album, picture, index, state, linkURL, linkTitle } = options;
  
  const dispatch = useContext(GalleryDispatch);

  const sizes = (picture.width && picture.height)
    ? `(min-width: 30em) 50vw, 100vw`
    : `100vw`;

  options.pictureNumber = (index + 1);

  
  // 📣 Announce selection events
  function onListImageClick(e, index) {

    // 🤖 TEST: Simulate a client-side error after user interaction
    // if (new URLSearchParams(window.location.search).get("test") === "error-after-user-interaction") {
    //   throw "Simulating a client-side error after user interaction";
    //   return;
    // }

    // ⌨️ If the a modifier key is pressed, let the browser handle it
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;

    dispatch({ type: "PICTURE_SELECTED", selectedPictureIndex: index });

    e.preventDefault();
  }

  
  // ⌨️ 📚 SHIM: Handle the case where a list item gains focus when the list is hidden
  //            (to avoid a hidden focus state)
  //
  //            A better solution might be to prevent the list from gaining focus,
  //            ideally by removing it from the DOM.
  function onListImageFocus(e) {
    if (state.matches("showing_details")) {
      dispatch({ type: "DETAILS_CLOSED" });
    }
  }


  return html`
  <li key="${picture.uri}">
    <a href="${ linkURL ? linkURL : `/${album.uri}/${picture.uri}/` }"
       onClick="${ e => onListImageClick(e, index) }"
       onKeyUp="${onKeyboardDetected}"
       onFocus="${onListImageFocus}">
      <${ResponsiveImage} ...${options}></${ResponsiveImage}>
      ${ linkTitle ? html`<span class="caption">${ linkTitle }</span>` : "" }
    </a>
  </li>
  `;
}


export { PictureListItem };

