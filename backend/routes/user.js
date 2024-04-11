const express = require("express");
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const app = express();
app.use(express.json());

const router = express.Router();

const schema = zod.object({
  username: zod.string.email({ message: "Invalid email address" }),
  password: zod.string.min(8, { message: "Must be 8 or more characters long" }),
  fullName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const userObject = req.body;
  const response = schema.safeParse(userObject);

  if (!response.success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: userObject.username,
  });

  if (existingUser)
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });

  const user = await User.create({
    username: userObject.username,
    password: userObject.password,
    fullName: userObject.fullName,
    lastName: userObject.lastName,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const userObject = req.body;
  const response = schema.safeParse(userObject);

  if (!response.success) {
    res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: userObject.username,
    password: userObject.password,
  });

  if (user) {
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
      token: token,
    });
  } else {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

module.exports = router;
