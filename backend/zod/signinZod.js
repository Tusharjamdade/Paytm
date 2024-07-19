const zod  = require("zod");


const signinInputZod = zod.object({
    username : zod.string(),
    password : zod.string()
}) 

module.exports = signinInputZod;