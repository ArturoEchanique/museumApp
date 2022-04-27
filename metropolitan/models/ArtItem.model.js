const { Schema, model } = require("mongoose");


// No es seguro que los parametros extraidos de la API tengan que estar en el modelo, en teoria se construye un
//documento de tipo arte al crear una coleccion, y si guardamos ya estos parametros no habra que acceder a la API
// cada vez que se visualice un arte
const artItemSchema = new Schema({
    apiId: {
        type: String,
    },
    likes: {
        type: Number,
    },
    artGallery: { type: Schema.Types.ObjectId, ref: 'ArtGallery' }
}, {
    timestamps: true,
});

const ArtItem = model("ArtItem", artItemSchema);

module.exports = ArtItem;