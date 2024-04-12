const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.body;

  const account = await Account.findOne({
    userId,
  });

  res.json({
    balance: account.balance,
  });
});

module.exports = router;
