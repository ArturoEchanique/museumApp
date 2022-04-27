const axios = require('axios');

class DeezerApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.deezer.com'
        })
    }

    getOneArtist(searchArtist) {
        return this.axiosApp.get(`/search?q=${searchArtist}`)
    }

}

module.exports = DeezerApiHandler