const toxicity = require('toxicity');

class CommentFilter {
    constructor() {
        this.axiosApp = null
    }

    filterComment(searchParam) {
        console.log("i am filtering")
        toxicity.load(threshold).then(model => {
            const sentences = ['you suck'];
            console.log(sentences)
        })
        console.log("i am filtering")
        return true
    }

}

module.exports = CommentFilter