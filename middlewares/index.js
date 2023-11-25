const contactMiddleware = require("./contactMiddleware");
console.log("from middleware");
const userMiddleware = require("./usersMIddleware");
console.log("after that middleware");
module.exports = { contactMiddleware, userMiddleware };
