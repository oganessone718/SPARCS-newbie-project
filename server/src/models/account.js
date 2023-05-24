var mongoose = require("mongoose");

var OSchemaDefinition = {
    nickName: String,
    accountID: String,
    password: String,
    MJ:{
      type: Array,
      default: []
    }
};
var OSchemaOptions = { timestamps: true };

var AccountSchema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

var AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;