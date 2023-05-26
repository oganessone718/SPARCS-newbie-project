var mongoose = require("mongoose");

var OSchemaDefinition = {
    name: String,
    location: String,
    specificLocation: String,
    mjType: String,
    like: {
      type: Number,
      default: 0
    }
};
var OSchemaOptions = { timestamps: true };

var MJSchema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

var MJModel = mongoose.model("mj", MJSchema);

module.exports = MJModel;