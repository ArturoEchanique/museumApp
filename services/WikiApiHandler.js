const axios = require('axios')

class WikipediaHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://en.wikipedia.org/'
        })
    }

    getOneArtist(searchParams) {
        let paramsString = ""
        paramsString += searchParams[0]
        for (let i = 1; i < searchParams.length; i++) {
            paramsString += "%20"
            paramsString += searchParams[i]
            //paramsString = "Salvador%20Dali"

        }
        return this.axiosApp.get(`/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${paramsString}`)
    }

    getArtistImage(searchParams) {

        let paramsString = ""
        return this.axiosApp.get(`/w/api.php?action=query&titles=${searchParams}&prop=pageimages&format=json&pithumbsize=100`)
        // return this.axiosApp.get(`/w/api.php?action=query&titles=Image:${searchParams}.jpg&prop=imageinfo&iiprop=url`)
    }

}

module.exports = WikipediaHandler


