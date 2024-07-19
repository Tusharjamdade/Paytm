const express = require("express");
const authMiddleware = require("../middleware/middleware");
const { Account } = require("../db");
const router = express.Router();
const zod = require("zod");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await Account.findOne({
    userId: req.userId,
  });
  const userBalance = user.balance;
  console.log(user);
  console.log(userBalance);
  res.json({
   balance :userBalance
  });
});
const transferInputScgema = zod.object({
  to: zod.string(),
  amount: zod.number(),
});
router.post("/transfer", authMiddleware, async (req, res) => {
    console.log("Entered")
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.json({
      msg: "Insufficent Balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  await Account.updateOne({userId : req.userId},{ $inc: { balance: -amount } }).session(session)
  await Account.updateOne({userId : to},{ $inc: { balance: amount } }).session(session)
  session.commitTransaction();
  res.json({
    msg :"Transfer Sucessfull"
  })

});

module.exports = router;
