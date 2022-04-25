const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/presentation', (req, res, next) => {



  res.render('presentation')
})

module.exports = router;
