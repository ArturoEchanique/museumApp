const axios = require('axios');

class DeezerApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.deezer.com'
        })
    }

    test() {
        console.log('entrando Deezer')
    }

    getOneArtist(searchArtist) {
        return this.axiosApp.get(`/search?q=${searchArtist}`)
    }

}

module.exports = DeezerApiHandler
