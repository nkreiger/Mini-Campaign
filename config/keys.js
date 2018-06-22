// keys figure out which one dev or prov to use

if (process.env.NODE_ENV === "production") {
  // return prod keys, export and require at same time
  module.exports = require("./keys_prod");
} else {
  // return dev keys, export and require at same time
  module.exports = require("./keys_dev");
}
