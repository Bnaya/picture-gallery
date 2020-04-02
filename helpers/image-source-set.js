
const IMAGE_LIST_SIZES    = "100vw"; //"(min-width: 40em) 320px, 44vw";
const IMAGE_DETAILS_SIZES = "100vw"; //"(min-aspect-ratio: 1/1) 100vh, 100vw";

function getSource({album, picture, largestSize = false}) {
  const albumURI = album.uri;
  return (picture.filename)
    ? `/pictures/${ albumURI }/${ largestSize ? "6000" : "384" }-wide/${ picture.filename }`
    : picture.source;
}

function getSourceSet({album, picture}) {
  const albumURI = album.uri;
  return (picture.filename)
    ? `/pictures/${ albumURI  }/384-wide/${ picture.filename  } 384w,
       /pictures/${ albumURI  }/512-wide/${ picture.filename  } 512w,
       /pictures/${ albumURI  }/768-wide/${ picture.filename  } 768w,
       /pictures/${ albumURI }/1024-wide/${ picture.filename } 1024w,
       /pictures/${ albumURI }/1536-wide/${ picture.filename } 1536w,
       /pictures/${ albumURI }/2048-wide/${ picture.filename } 2048w,
       /pictures/${ albumURI }/6000-wide/${ picture.filename } 6000w`
    : null;
}

function getMatchingPicture({pictures, pictureName}) {
  if (!pictureName) return;

  const matches = pictures.filter(picture =>
    picture.filename === pictureName.split("/").pop() || 
    picture.source   === pictureName
  );
  return matches[0];
}

// function getFirstAlbumWithPictures({candidate}) {
//   if (candidate.pictures) {
//     return {
//       album: candidate,
//       picture: candidate.pictures[0]
//     };
//   }
// 
//   if (candidate.albums && candidate.albums[0]) {
//     return getFirstAlbumWithPictures({candidate: candidate.albums[0]});
//   }
// }

function getAlbumWithMatchingPicture({candidate, pictureName}) {
  if (!pictureName) return;

  if (candidate.pictures) {
    const matchingPicture = getMatchingPicture({...candidate, pictureName});
    if (matchingPicture) {
      return {
        album: candidate,
        picture: matchingPicture
      };
    }
  }

  if (candidate.albums) {
    if (pictureName.indexOf("http") === 0) {
      for (let nextAlbum of candidate.albums) {
        const result = getAlbumWithMatchingPicture({candidate: nextAlbum, pictureName});
        if (result) return result;
      }
    } else {

      // "apples/5.jpg" => "apples"
      // "fruit/apples/5.jpg" => "fruit"
      const pictureNamePaths = pictureName.split("/");
      const albumName = pictureNamePaths.shift();

      const matchingAlbums = candidate.albums.filter(
        album => {
          // "groceries/fruit" => "fruit"
          // "groceries/fruit/apples" => "apples"
          const name = album.uri.split("/").pop();
  
          return (name === albumName);
        }
      );
      if (matchingAlbums) {
        const result = getAlbumWithMatchingPicture({
          candidate: matchingAlbums[0],
          pictureName: pictureNamePaths.join("/")
        });
        if (result) return result;
      }
    }

  }
}

function getCoverPicture({album}) {

  if (album.pictures) {

    // Matching picture or first picture
    const picture =
      getMatchingPicture({
        pictures: album.pictures,
        pictureName: album.coverPicture
      })
      ||
      album.pictures[0];

    return {
      album,
      picture
    };
  }

  // Group albums
  if (album.albums) {
    
    // Matching child album or first child album with a picture
    const sourceData =
      getAlbumWithMatchingPicture({
        candidate: album,
        pictureName: album.coverPicture
      })
      ||
      getCoverPicture({
        album: album.albums[0]
      });

    return sourceData;
  }
}


export {
  IMAGE_LIST_SIZES,
  IMAGE_DETAILS_SIZES,
  getSource,
  getSourceSet,
  getCoverPicture
}

