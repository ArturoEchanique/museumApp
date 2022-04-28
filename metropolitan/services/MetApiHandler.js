const axios = require('axios');

class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: 'https://collectionapi.metmuseum.org'
    })
  }

  getOneCollection(searchParam) {
    return this.axiosApp.get(`/public/collection/v1/search?isPublicDomain=true?hasImages=true&q=${searchParam}`)
  }

  getOneArtwork(objectID) {
    return this.axiosApp.get(`/public/collection/v1/objects/${objectID}`)
  }

}

module.exports = APIHandler