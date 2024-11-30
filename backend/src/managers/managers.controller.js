import prismaClient from "../lib/prismaClient.js";
import bcrypt from "bcrypt";

const getManagers = async (req, res) => {
  try {
    const managerGET = await prismaClient.managers.findMany({
      select: {
        manager_id: true,
        username: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });
    res.status(200).json(managerGET);
  } catch (error) {
    console.error("Error getting managers:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postManager = async (req, res) => {
  try {
    const { username, passkey, first_name, last_name, sex, email } = req.body;

    // Validate required fields
    if (!username || !passkey || !first_name || !last_name || !sex) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(passkey, 10);

    // Save the manager in the database
    const managerPOST = await prismaClient.managers.create({
      data: {
        username,
        passkey: hashedPassword,
        first_name,
        last_name,
        sex,
        email,
      },
    });

    res.status(200).json(managerPOST);
  } catch (error) {
    console.error("Error creating manager:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const getManagerById = async (req, res) => {
  try {
    const { manager_id } = req.params;
    const intManagerID = parseInt(manager_id);
    const managerGET = await prismaClient.managers.findUnique({
      where: { manager_id: intManagerID },
    });
    res.status(200).json(managerGET);
  } catch (error) {
    console.error("Error getting manager:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchManager = async (req, res) => {
  try {
    const { username, passkey, first_name, last_name, sex, email } = req.body;
    const { manager_id } = req.params;
    const intManagerID = parseInt(manager_id);
    const hashedPassword = await bcrypt.hash(passkey, 10);
    const managerPATCH = await prismaClient.managers.update({
      where: { manager_id: intManagerID },
      data: {
        username,
        passkey: hashedPassword,
        first_name,
        last_name,
        sex,
        email,
      },
    });
    res.status(200).json(managerPATCH);
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteManager = async (req, res) => {
  try {
    const { manager_id } = req.params;
    const intManagerID = parseInt(manager_id);
    const managerDELETE = await prismaClient.managers.delete({
      where: { manager_id: intManagerID },
    });
    res.status(200).json(managerDELETE);
  } catch (error) {
    console.error("Error deleting manager:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export {
  getManagers,
  postManager,
  getManagerById,
  patchManager,
  deleteManager,
};
