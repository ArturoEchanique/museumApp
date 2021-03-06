 const axios = require('axios');

 class YoutubeHandler {
     constructor() {
         this.axiosApp = axios.create({
             baseURL: 'https://www.googleapis.com/youtube/v3'
         })
     }

     getSearch(searchParam) {
         return this.axiosApp.get(`/search?part=snippet&key=AIzaSyAvyjCgpSYKDtKgslyOTYLGSD45xUNYVYs&type=video&q=${searchParam}`)
     }

     //  getVideo(objectID) {
     //      return this.axiosApp.get(`/public/collection/v1/objects/${objectID}`)
     //  }

 }

 module.exports = YoutubeHandler