
import jsBeautify            from "js-beautify";

import { config }            from "../_config.js";

import { render }            from "../web_modules/preact-render-to-string.js";
import { getInitialPageTitle,
         getOpenGraphImage } from "../components/picture-gallery.js";

import { fetchFromFileSystem as fetch }
                             from "../helpers/fetch-from-file-system.js";

import { getGalleryData }    from "../data/gallery.js";
import { getPublicURLs,
         isGroupAlbum,
         isAlbum,
         getAlbum }          from "../data-file-system/albums-by-url.js";

import { DefaultLayout }     from "../layouts/default.js";
import { RobotsText }        from "../layouts/robots.txt.js";
import { SiteMapXML }        from "../layouts/sitemap.xml.js";
import { AlbumPage }         from "../pages/album.js";
import { ParentAlbumPage }   from "../pages/parent-album.js";


function getAlbumHTML(url) {
  return new Promise((resolve, reject) => {
    const album = getAlbum(url);

    const getPageURL = () => url;

    const title   = getInitialPageTitle({
      getPageURL,
      album
    });
    const template = album.albums ? ParentAlbumPage : AlbumPage;
    const content = render(template({
      getPageURL,
      pictures: album.pictures,
      story: album.story,
      album
    }));
    const openGraphImage = getOpenGraphImage({
      getPageURL,
      album
    });

    const html = DefaultLayout({
      title,
      content,
      askSearchEnginesNotToIndex:
         album.askSearchEnginesNotToIndex || 
        (album.parent && album.parent.askSearchEnginesNotToIndex),
      includeClientJS: template === AlbumPage ? true : false,
      openGraphImage:
        openGraphImage && (openGraphImage.indexOf("http") === 0 || config.host) ?
          openGraphImage.indexOf("http") != 0 && config.host
            ? `${config.host}${openGraphImage}`
            : openGraphImage
          : null
    });

    resolve(jsBeautify.html_beautify(html));
  });
}

function getRobotsText() {
  return new Promise((resolve, reject) => {
    const text = RobotsText({
      host: config.host
    });
    resolve(text);
  });
}

function getSiteMapXML() {
  return new Promise((resolve, reject) => {
    const publicURLs = getPublicURLs();
    const xml = SiteMapXML({
      host: config.host,
      urls: publicURLs
    });
    resolve(xml);
  });
}


function getSourceByURL(url) {
  // console.log(`getSourceByURL: ${url}`);
  // if (url.indexOf("portrait") >= 0) console.log(`getSourceByURL: ${url}`);
  return new Promise(async (resolve, reject) => {
    if (url === "/sitemap.xml") {
      getSiteMapXML()
        .then(resolve);
    } else if (url === "/robots.txt") {
      getRobotsText()
        .then(resolve);
    } else if (isAlbum(url) || isGroupAlbum(url)) {
      getAlbumHTML(url)
        .then(resolve);
    } else {
      throw new Error(`An unexpected URL was passed to getSourceByURL: ${url}`);
    }
  });
}


export {
  getSourceByURL
}

