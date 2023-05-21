var mongoose = require("mongoose");

var OSchemaDefinition = {
    name: String,
    locatoin: String,
    mjType: String,
    like: {
      type: Number,
      default: 0
    },
    comments:{
      type: Array,
      default: []
    }
};
var OSchemaOptions = { timestamps: true };

var MJSchema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

var MJModel = mongoose.model("mj", MJSchema);

module.exports = MJModel;