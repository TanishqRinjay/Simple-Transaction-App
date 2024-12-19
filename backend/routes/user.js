const express = require("express");
const { User } = require("../db");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");

// SignUp Schema:
const signUpSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6),
    firstName: zod.string().max(20),
    lastName: zod.string().max(20),
});
router.post("/signup", async (req, res) => {
    try {
        const { success } = signUpSchema.parse(req.body);
        if (!success) {
            throw new Error("Validation Error, please enter correct inputs");
        }
        const body = req.body;

        const user = User.findOne({ username: body.username });
        if (user) {
            throw new Error("Username already exists");
        }

        const dbUser = await User.create(body);
        const token = jwt.sign(
            {
                id: dbUser._id,
            },
            process.env.JWT_SECRET
        );
        res.status(200).json({
            message: "User created successfully",
            token: token,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;
