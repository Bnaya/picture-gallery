
import { getGalleryData }                  from "../data/gallery.js";
import { getAlbumNamesFromPicturesFolder } from "../data-file-system/albums-from-pictures-folder.js";

import { fetchFromFileSystem as fetch }    from "../helpers/fetch-from-file-system.js";
import { getAlbumByURL }                   from "../data/album-by-url.js";
import { onlyUnique }                      from "../helpers/array.js";


const HOME_PAGE = "HOME_PAGE";
const urls = {};
const publicURLs = {};


// TBD:  Get album names from the _api folder instead of _pictures
//       to support albums without a presence in the _pictures folder
//       and to skip pictures that may not have an album JSON file?
async function getAlbumNames() {

  const gallery = await getGalleryData({ fetch });
  const [albumNames, groupData] = getAlbumNamesFromPicturesFolder();

  // 📚 SHIM: Add missing album names
  // (albumNames doesn’t include parents of group ablums)
  const names = [];
  for (let name of albumNames) {
    const bits = name.split("/");
    const nextBits = [];
    for (let bit of bits) {
      nextBits.push(bit);
      names.push(nextBits.join("/"));
    }
  }

  return [
    HOME_PAGE,
    ...names,
    // ...albumNames,
    // ...groupData.map(group => group.uri),
    ...gallery.albums
  ].filter(onlyUnique).sort();
};

function isPublic(album) {
  return !album.askSearchEnginesNotToIndex &&
        (!album.parent || !album.parent.askSearchEnginesNotToIndex)
}

async function __initURLs() {

  async function addAlbum(album) {
    const url = album.uri == "" || album.uri == null ? "/" : `/${album.uri}/`;
    urls[url] = album;
    if (isPublic(album)) {
      publicURLs[url] = album;
    }

    if (album.pictures) {
      for (let picture of album.pictures) {
        const url = `/${album.uri}/${picture.uri}/`;
        urls[url] = album;
        if (isPublic(album)) {
          publicURLs[url] = album;
        }
      }
    }
  }

  const albumNames = await getAlbumNames();
  console.log(albumNames);

  for (let name of albumNames) {
    // if (name.indexOf("portrait") >= 0) {
    //   console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
    //   console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
    //   console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
    //   console.log(`next album name: ${name}`);
    // }
    const url = name === HOME_PAGE ? "/" : `/${name}/`;
    const album = await getAlbumByURL({ url, fetch });
    // console.log(`getAlbumByURL: ${url}`);
    // if (name.indexOf("portrait") >= 0) {
    //   console.log(`next album album.uri: ${album.uri}`);
    //   console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
    //   console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
    //   console.log("- - - - - - - - - - - - - - - - - - - - - - - - -");
    // }
    await addAlbum(album);
  }

  // console.log("***** album urls *****");
  // console.log(urls);
  // console.log(publicURLs);
}

async function getAlbumsByURL() {
  await __initURLs();
  return Object.keys(urls);
}

function getPublicURLs() {
  return Object.entries(urls)
    .filter(entry => {
      const [url, album] = entry;
      return isPublic(album)
    })
    .map(entry => {
      const [url, album] = entry;
      return url
    });
}

function getPublicAlbums() {
  return Object.entries(urls)
    .filter(entry => {
      const [url, album] = entry;
      return isPublic(album)
    })
    .map(entry => {
      const [url, album] = entry;
      return album;
    })
    .filter(onlyUnique);
}

function isGroupAlbum(url) {
  return (urls[url] != null && urls[url].albums != null)
          ? true : false;
}

function isAlbum(url) {
  return (urls[url] != null && urls[url].pictures != null)
          ? true : false;
}

function getAlbum(url) {
  return urls[url];
}


export {
  getAlbumsByURL,
  getPublicURLs,
  getPublicAlbums,
  isGroupAlbum,
  isAlbum,
  getAlbum
}

