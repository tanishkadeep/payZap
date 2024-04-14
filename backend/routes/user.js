const express = require("express");
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(5),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const userObject = req.body;
  const response = signupSchema.safeParse(userObject);

  if (!response.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: userObject.username,
  });

  if (existingUser)
    res.status(411).json({
      message: "Email already taken",
    });

  const user = await User.create({
    username: userObject.username,
    password: userObject.password,
    firstName: userObject.firstName,
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

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(5)
});

router.post("/signin", async (req, res) => {
  const userObject = req.body;
  const response = signinSchema.safeParse(userObject);

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

const updateBody = zod.object({
  password: zod.string().min(5).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
