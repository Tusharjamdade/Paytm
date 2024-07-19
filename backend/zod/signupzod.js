const zod = require("zod");

const signupInputZod = zod.object({
  username: zod.string().email(),
  password: zod.string().max(20),
  firstName: zod.string().max(20),
  lastName: zod.string().max(20),
});

module.exports = {
  signupInputZod
};
