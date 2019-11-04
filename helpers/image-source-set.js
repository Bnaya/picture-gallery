
export const IMAGE_LIST_SIZES    = "(min-width: 40em) 320px, 44vw";
export const IMAGE_DETAILS_SIZES = "(min-aspect-ratio: 1/1) 100vh, 100vw";

export function getSource({parent, album, picture}) {
  const albumURI = parent ? `${parent.uri}/${album.uri}` : album.uri;
  return (picture.filename)
    ? `/pictures/${ albumURI }/384-wide/${ picture.filename }`
    : picture.source;
}

export function getSourceSet({parent, album, picture}) {
  const albumURI = parent ? `${parent.uri}/${album.uri}` : album.uri;
  return (picture.filename)
    ? `/pictures/${ albumURI }/384-wide/${ picture.filename } 384w,
       /pictures/${ albumURI }/512-wide/${ picture.filename } 512w,
       /pictures/${ albumURI }/768-wide/${ picture.filename } 768w,
       /pictures/${ albumURI }/1024-wide/${ picture.filename } 1024w,
       /pictures/${ albumURI }/1536-wide/${ picture.filename } 1536w,
       /pictures/${ albumURI }/2048-wide/${ picture.filename } 2048w`
    : null;
}
