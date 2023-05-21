var mongoose = require("mongoose");

var OSchemaDefinition = {
    ID: String,
    NickName: String,
    Password: String,
    MJ:{
      type: Array,
      default: []
    }
};
var OSchemaOptions = { timestamps: true };

var AccountSchema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

var AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;