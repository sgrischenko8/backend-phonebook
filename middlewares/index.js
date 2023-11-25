const contactMiddleware = require("./contactMiddleware");
console.log("from middleware");
const userMiddleware = require("./userMiddleware");
console.log("after that middleware");
module.exports = { contactMiddleware, userMiddleware };
