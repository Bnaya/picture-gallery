
import { getCombinedAlbumJSON, getAlbumURI } from "../helpers/album.js";
import { fetchText, fetchJSON } from "../helpers/fetch.js";


async function getAlbumJSON({ albumURI, fetch }) {
  // console.log("getAlbumJSON: " + albumURI);

  // TODO: Send these requests in parallel
  let album = await fetchJSON({url: `/api/${albumURI}.json`, fetch})
  if (!album) album = await fetchJSON({url: `/api/${albumURI}/index.json`, fetch});

  // if (albumURI.indexOf("portrait") >= 0) console.log(album.uri);

  if (!album) return;
  
  // console.log({...album, albums: album.albums ? album.albums.slice(0, 2) : null});
  const generatedPictures = await fetchJSON({url: `/pictures/${albumURI}/data.json`, fetch});

  return getCombinedAlbumJSON({ album, generatedPictures });
}

async function getAlbumStory({ albumURI, fetch }) {
  return await fetchText({url: `/api/${albumURI}.markdown`, fetch});
}

function getAlbumData({ albumURI, parent, fetch }) {
  // if (albumURI.indexOf("portrait") >= 0) console.log("getAlbumData: " + albumURI);
  return new Promise((resolve, reject) => {

    const promises = [
      getAlbumJSON({ albumURI, fetch }),
      getAlbumStory({ albumURI, fetch })
    ];

    // Get the parent album’s data, if it wasn’t passed in
    if (!parent) {
      const paths = albumURI.split("/");
      paths.pop();
      const parentURI = paths.join("/");
      promises.push(fetchJSON({
        url: parentURI == ""
              ? `/api/index.json`
              : `/api/${parentURI}/index.json`,
        fetch
      }));
    }

    Promise.all(promises).then(async (values) => {
      const [album, story, fetchedParent] = values;

      // if (albumURI.indexOf("portrait") >= 0) console.log(album.uri);
      if (!album) {
        reject(new Error(`Couldn’t find data for album: ${albumURI}`));
        return;
      }
      if (!parent) {
        parent = fetchedParent;
        if (parent) {
          parent.uri = albumURI.split("/").slice(0, -1).join("/");
          // if (albumURI.indexOf("portrait") >= 0) {
          //   console.log(`album by URL: parent.uri: ${parent.uri}`);
          // }
        }
      }

      album.uri = albumURI;

      if (story) {
        album.story = story;
      }

      if (parent && parent.uri != album.uri) {
        album.parent = parent;
      }

      // if (albumURI.indexOf("portrait") >= 0) {
      //   console.log(`album by URL: album.uri: ${album.uri}`);
      // }

      // Replace child album URIs with data
      // "recipes/cookies" ==> { title: "...", pictures: [...] }
      if (album.albums) {
        album.albums = await Promise.all(album.albums.map(
          async childAlbumURI => await getAlbumData({
            albumURI: album.uri === "" ? childAlbumURI : `${album.uri}/${childAlbumURI}`,
            parent: album,
            fetch
          })
        ));
      }

      resolve(album);
    });

  });
}

async function getAlbumByURL({ url, fetch }) {
  // if (url.indexOf("portrait") >= 0) console.log("getAlbumByURL: " + url);
  return new Promise((resolve, reject) => {

    // Normalize the url
    // 
    //   /recipes/                             ==> recipes
    //   /recipes/cookies/                     ==> recipes/cookies
    //   /recipes/cookies/?test=true           ==> recipes/cookies
    //   https://example.com/recipes/cookies/  ==> recipes/cookies
    //
    const albumURI = url.split("://").pop()       // protocol
                        .replace(/^[^\/]*\//, "") // domain & leading slash
                        .split("?").shift()       // query string
                        .replace(/\/$/, "");      // trailing slash
                        
    // if (url.indexOf("portrait") >= 0) console.log("normalized albumURI: " + albumURI);

    getAlbumData({ albumURI, fetch })
      .then(resolve)
      .catch(error => {
        // if (url.indexOf("portrait") >= 0) console.log("catch: " + error);

        // If we didn’t find album data,
        // try again without the last bit of the URL
        // (since the last bit might be a picture within the album)
        // recipes/cookies/5 ==> recipes/cookies
        const bits = albumURI.split("/");
        if (bits.length > 1) {
          bits.pop();
          getAlbumByURL({ url: bits.join("/"), fetch })
            .then(resolve)
            .catch(reject);

        } else {
          reject(error);
        }
      });
  });
}


export {
  getAlbumByURL
}

