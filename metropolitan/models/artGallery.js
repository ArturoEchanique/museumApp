const { Schema, model } = require("mongoose");


// No es seguro que los parametros extraidos de la API tengan que estar en el modelo, en teoria se construye un
//documento de tipo arte al crear una coleccion, y si guardamos ya estos parametros no habra que acceder a la API
// cada vez que se visualice un arte
const artGallerySchema = new Schema(
    {
        name: {
            type: String,

        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        Description: {
            type: String,

        },
    },

    {

        timestamps: true,
    }
);

const ArtGallery = model("ArtGallery", artGallerySchema);

module.exports = ArtGallery;
