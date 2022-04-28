// esto hay que meterlo en otra ruta no en index
const router = require("express").Router();

const WikipediaHandler = require('../apiHandlers/WikiApiHandler')
const wikipediaAPI = new WikipediaHandler();

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

      textPresentation = data.query.pages[keyID].extract
      textPresentation = textPresentation.replace(/ *\([^)]*\) */g, "")

      deezerAPI
        .getOneArtist('amadeus mozart')
        .then(({ data }) => {

          console.log('DATA= ', data.data[0].preview)


        })






      res.render('presentation', { textPresentation })
    })

})

module.exports = router;
