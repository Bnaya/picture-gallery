// import { config } from "../_config.js";

// https://github.com/facebook/jest/issues/4842#issuecomment-344170963
// https://www.npmjs.com/package/esm
const esmImport = require("esm")(module /*, options*/);
const { config } = esmImport("../_config.js");
const { getAlbumByURL } = esmImport("../data/album-by-url.js");
const { fetchFromFileSystem } = esmImport("../helpers/fetch-from-file-system.js");
const { getCoverPicture } = esmImport("../helpers/image-source-set.js");
const fetch = fetchFromFileSystem;


describe("getAlbumByURL() from /data/album-by-url.js", function() {
  it("Gets data for a single album", async () => {
    const album = await getAlbumByURL({ url: config.test.hostURL + config.test.albumURL, fetch });
    // console.log({...album, pictures: album.pictures.slice(0, 2), coverPictureSourceData: getCoverPicture({album})});
    expect(album).not.toBeNull();
    expect(album.uri).not.toBeNull();
    expect(album.title).not.toBeNull();
    expect(album.coverPicture).not.toBeNull();
    expect(getCoverPicture({album}).picture).not.toBeNull();
    expect(getCoverPicture({album}).album).not.toBeNull();
    expect(album.pictures).not.toBeNull();
    expect(album.pictures[0]).not.toBeNull();
    expect(album.pictures[0].uri).not.toBeNull();
  });
  it("Gets data for a child album", async () => {
    const album = await getAlbumByURL({ url: config.test.hostURL + config.test.groupAlbumChildURL, fetch });
    // console.log({...album, pictures: album.pictures.slice(0, 2), coverPictureSourceData: getCoverPicture({album})});
    expect(album).not.toBeNull();
    expect(album.uri).not.toBeNull();
    expect(album.title).not.toBeNull();
    expect(getCoverPicture({album}).picture).not.toBeNull();
    expect(getCoverPicture({album}).album).not.toBeNull();
    expect(album.pictures).not.toBeNull();
    expect(album.pictures[0]).not.toBeNull();
    expect(album.pictures[0].uri).not.toBeNull();
    expect(album.parent).not.toBeNull();
    expect(album.parent.uri).not.toBeNull();
    expect(album.parent.title).not.toBeNull();
  });
  it("Gets data for a group album", async () => {
    const album = await getAlbumByURL({ url: config.test.hostURL + config.test.groupAlbumURL, fetch });
    // console.log({...album, albums: album.albums.slice(0, 2), coverPictureSourceData: getCoverPicture({album})});
    expect(album).not.toBeNull();
    expect(album.uri).not.toBeNull();
    expect(album.title).not.toBeNull();
    expect(getCoverPicture({album}).picture).not.toBeNull();
    expect(getCoverPicture({album}).album).not.toBeNull();
    expect(album.albums).not.toBeNull();
    expect(album.albums[0]).not.toBeNull();
    expect(album.albums[0].uri).not.toBeNull();
    expect(album.albums[0].title).not.toBeNull();
    expect(getCoverPicture({album: album.albums[0]}).picture).not.toBeNull();
    expect(getCoverPicture({album: album.albums[0]}).album).not.toBeNull();
  });
  it("Gets data for a group of group albums", async () => {
    const album = await getAlbumByURL({ url: config.test.hostURL + config.test.groupOfGroupAlbumURL, fetch });
    // console.log({...album, albums: album.albums.slice(0, 2), coverPictureSourceData: getCoverPicture({album})});
    expect(album).not.toBeNull();
    expect(album.uri).not.toBeNull();
    expect(album.title).not.toBeNull();
    expect(getCoverPicture({album}).picture).not.toBeNull();
    expect(getCoverPicture({album}).album).not.toBeNull();
    expect(album.albums).not.toBeNull();
    expect(album.albums[0]).not.toBeNull();
    expect(album.albums[0].uri).not.toBeNull();
    expect(album.albums[0].title).not.toBeNull();
    expect(getCoverPicture({album: album.albums[0]}).picture).not.toBeNull();
    expect(getCoverPicture({album: album.albums[0]}).album).not.toBeNull();
  });
});

