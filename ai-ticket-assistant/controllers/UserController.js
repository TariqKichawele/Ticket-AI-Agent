import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { inngest } from "../inngest/client.js";

export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed, skills });

        // Try to send Inngest event, but don't let it block signup
        try {
            await inngest.send({
                name: "user/signup",
                data: { email },
            });
        } catch (inngestError) {
            console.error("Failed to send Inngest event:", inngestError);
            // Continue with signup even if Inngest fails
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET);

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Failed to signup", details: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET);

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Failed to login", details: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to logout", details: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { skills = [], role, email } = req.body;
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        await User.updateOne(
            { email },
            {
                $set: {
                    skills: skills.length ? skills : user.skills,
                    role: role || user.role,
                }
            }
        );

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user", details: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to get users", details: error.message });
    }
}

