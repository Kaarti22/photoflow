const DataUriParser = require("datauri/parser");
const path = require("path");

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();

  if (!file || !file.buffer) {
    throw new Error("Invalid file input");
  }
  return parser.format(extName, file.buffer).content;
};

module.exports = getDataUri;
