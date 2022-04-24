const { Schema, model } = require("mongoose");


// No es seguro que los parametros extraidos de la API tengan que estar en el modelo, en teoria se construye un
//documento de tipo arte al crear una coleccion, y si guardamos ya estos parametros no habra que acceder a la API
// cada vez que se visualice un arte
const artSchema = new Schema(
    {
        bigImg: {
            type: String,

        },
        smallImg: {
            type: String,

        },
        title: {
            type: String,

        },
        artist: {
            type: String,

        },
        likes: {
            type: Number,

        },
    },

    {

        timestamps: true,
    }
);

const Art = model("Art", artSchema);

module.exports = Art;
