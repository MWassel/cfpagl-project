import prismaClient from "../lib/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginManager = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find manager by username
    const managerGET = await prismaClient.managers.findUnique({
      where: { username: username },
      // Optionally select specific fields to return
      select: {
        manager_id: true,
        username: true,
        passkey: true,
        // Add other non-sensitive fields you want to return
      },
    });

    // Consistent error handling
    if (!managerGET) {
      return res.status(404).json({
        error: "Manager not found.",
        success: false,
      });
    }

    // Password validation
    const isPasswordValid = await bcrypt.compare(password, managerGET.passkey);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials.",
        success: false,
      });
    }

    // Token creation with more robust signing
    const createToken = (id) => {
      return jwt.sign(
        {
          id,
          username: managerGET.username,
        },
        process.env.JWT_SECRET || "cfpagl secret",
        {
          expiresIn: "1d",
          algorithm: "HS256", // Explicitly set algorithm
        }
      );
    };

    const token = createToken(managerGET.manager_id);

    // Cookie and response configuration
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // Protect against CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Return user info without sensitive data
    res.status(200).json({
      success: true,
      user: {
        id: managerGET.manager_id,
        username: managerGET.username,
      },
      token, // Optional: return token for client-side storage if needed
    });
  } catch (error) {
    console.error("Error logging in manager:", error);
    res.status(500).json({
      error: "Internal Server Error.",
      success: false,
    });
  }
};

const logoutManager = async (req, res) => {
  try {
    // Clear JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logout successful.",
      success: true,
    });
  } catch (error) {
    console.error("Error logging out manager:", error);
    res.status(500).json({
      error: "Internal Server Error.",
      success: false,
    });
  }
};

const validateToken = async (req, res) => {
  try {
    // More robust token validation
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        valid: false,
        error: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "cfpagl secret"
    );

    // Optional: Additional checks
    const manager = await prismaClient.managers.findUnique({
      where: { manager_id: decoded.id },
      select: {
        manager_id: true,
        username: true,
        // Add other non-sensitive fields
      },
    });

    if (!manager) {
      return res.status(401).json({
        valid: false,
        error: "Invalid token",
      });
    }

    res.status(200).json({
      valid: true,
      user: {
        id: manager.manager_id,
        username: manager.username,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        valid: false,
        error: "Token expired",
      });
    }

    console.error("Token validation error:", error);
    res.status(500).json({
      valid: false,
      error: "Internal Server Error",
    });
  }
};

export { loginManager, logoutManager, validateToken };
