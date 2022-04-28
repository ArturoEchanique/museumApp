 const axios = require('axios');

 class YoutubeHandler {
     constructor() {
         this.axiosApp = axios.create({
             baseURL: 'https://www.googleapis.com/youtube/v3'
         })
     }

     getSearch(searchParam) {
         return this.axiosApp.get(`/search?part=snippet&key=AIzaSyCJXfnCjCNoZ5DFVcicZ182oaJT54TZPb4&type=video&q=${searchParam}`)
     }

     //  getVideo(objectID) {
     //      return this.axiosApp.get(`/public/collection/v1/objects/${objectID}`)
     //  }

 }

 module.exports = YoutubeHandler