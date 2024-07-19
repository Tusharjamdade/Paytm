const express = require("express");
const { Users, Account } = require("../db");
const { signupInputZod } = require("../zod/signupzod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const signinInputZod = require("../zod/signinZod");
const authBody = require("../zod/userAuth");
const authMiddleware = require("../middleware/middleware");
router.use(express.json());

router.post("/signup", async (req, res) => {
  let inputBody = req.body;
  // res.json({
  //   msg :"ok"
  // })
  console.log(inputBody);
  let isValid = signupInputZod.safeParse(inputBody);
  console.log(isValid);
  if (!isValid.success) {
    return res.json({
      msg: "user Already Exist / Invalid Inpur",
    });
  }
  const searchResult = await Users.find({ username: isValid.data.userName });
  if (searchResult._id) {
    return res.json({
      msg: "user Already Exist / Invalid Inpur",
    });
  }
  const user = await Users.create(isValid.data);

  const userId = user._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token1: token,
  });
});

// {
//     username: "name@gmail.com",
//     password: "123456"
//     }

router.post("/signin", async (req, res) => {
  let body = req.body;
  let signinValidation = signinInputZod.safeParse(body);
  if (!signinValidation.success) {
    return res.json({
      message: "Error while logging in",
    });
  }
  const searchResult = await Users.find({
    username: signinValidation.data.username,
  });
  console.log(searchResult);
  const userId = searchResult[0]._id;
  if (!userId) {
    return res.json({
      message: "Error while logging in",
    });
  }
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  return res.json({
    token: token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  console.log(body);
  const authResult = authBody.safeParse(body);
  console.log(authResult);
  if (!authResult.success) {
    return res.json({
      msg: "Invlid Input",
    });
  }
  await Users.updateOne(req.body, {
    _id: req.userId,
  });

  // const updateResult = await Users.updateOne( {
  //   _id: req.userId,
  // },{lastName : authResult.data.lastname,firstName:authResult.data.firstname,password:authResult.data.password});
  // console.log(updateResult);
  res.json({
    msg: "Update Sucessfull",
  });
});

router.get("/bulk", async (req, res) => {
  const searchInput = req.query.filter;
  console.log(searchInput);
  const searchResult = await Users.find({
    $or: [
      { firstName: {  $regex: searchInput}},
      { lastName: { $regex: searchInput}},
    ],
  });

  console.log(searchResult);
  res.json({
    users: searchResult,
  });
});

module.exports = router;
