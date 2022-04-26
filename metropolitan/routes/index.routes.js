// esto hay que meterlo en otra ruta no en index
const WikipediaHandler = require('../apiHandlers/WikipediaHandler')
const wikipediaAPI = new WikipediaHandler();
// console.log("hi there")
// console.log("el artista es...", wikipediaAPI.getOneArtist(["salvador", "dali"]))

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/presentation', (req, res, next) => {
  console.log("presentando!!")
  wikipediaAPI
  .getOneArtist(["salvador", "dali"])
    .then(({ data }) => {
      console.log("las keys son",Object.keys(data.query.pages))
      console.log("el artista es...-------------------------------------", data.query.pages[40112].extract)
  })
 


  res.render('presentation')
})

module.exports = router;
