// esto hay que meterlo en otra ruta no en index
const WikipediaHandler = require('../apiHandlers/WikiApiHandler')
const wikipediaAPI = new WikipediaHandler();
const router = require("express").Router();

const DeezerApiHandler = require('../apiHandlers/DeezerApiHandler')
const deezerAPI = new DeezerApiHandler();

router.get("/", (req, res, next) => {
  res.render("index")
})
router.get('/presentation', (req, res, next) => {

  wikipediaAPI
    .getOneArtist(["mona", "lisa"])
    .then(({ data }) => {
      const keyID = Object.keys(data.query.pages)
      const src = data.query.pages[keyID].pageimages
      console.log('esta es la imagen====== ', src)
      textPresentation = data.query.pages[keyID].extract
      textPresentation = textPresentation.replace(/ *\([^)]*\) */g, "")

      DeezerApiHandler
        .getOneArtist('mozart')
        .then(({ data }) => {

          console.log(data)

        })





      res.render('presentation', { textPresentation })
    })





  module.exports = router
