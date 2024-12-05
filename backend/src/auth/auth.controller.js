import prismaClient from "../lib/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginManager = async (req, res) => {
  try {
    const { username, password } = req.body;
    const managerGET = await prismaClient.managers.findUnique({
      where: { username: username },
    });
    if (!managerGET) {
      return res.status(404).json({ error: "Manager not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, managerGET.passkey);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }
    const createToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET || "cfpagl secret", {
        expiresIn: "1d",
      });
    };
    const token = createToken(managerGET.manager_id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json(managerGET.manager_id);
  } catch (error) {
    console.error("Error logging in manager:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const logoutManager = async (req, res) => {
  try {
    res.clearCookie("jwt");
    //res.redirect("/login");
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error logging out manager:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const validateToken = async (req, res) => {
  res.status(200).json({ valid: true });
};

export { loginManager, logoutManager, validateToken };
