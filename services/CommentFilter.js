require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
const threshold = 0.9;

class CommentFilter {
    constructor() {
        this.axiosApp = null
    }

    filterComment() {
        return toxicity.load(0.9)

    }

}

module.exports = CommentFilter