const express = require("express");
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware");
const { route } = require("./user");

const app = express();
app.use(express.json());

const router = express.Router();

const schema = zod.object({
  username: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
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

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

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

const updateSchema = zod.object({
  password: zod
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
  fullName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const data = req.body;

  const response = updateSchema.safeParse(data);

  if (!response.success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        fullName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
