var mongoose = require("mongoose");

var OSchemaDefinition = {
  mjName: String,
  ID: String,
  nickame: String,
  comment: String,  
};
var OSchemaOptions = { timestamps: true };

var CommentSchema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

var CommentModel = mongoose.model("comment", CommentSchema);

module.exports = CommentModel;

