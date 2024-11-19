import prismaClient from "../lib/prismaClient.js";

const getPunishment = async (req, res) => {
  try {
    const punishmentGET = await prismaClient.punishment.findMany();
    res.status(200).json(punishmentGET);
  } catch (error) {
    console.error("Error getting punishments:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postPunishment = async (req, res) => {
  try {
    const { cause, duration } = req.body;
    const punishmentPOST = await prismaClient.punishment.create({
      data: {
        cause,
        duration,
      },
    });
    return res.status(200).json(punishmentPOST);
  } catch (error) {
    console.error("Error creating a new punishment:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const deletePunishment = async (req, res) => {
  try {
    const { punishment_id } = req.body;
    const punishmentDELETE = await prismaClient.punishment.delete({
      where: {
        punishment_id: punishment_id,
      },
    });
    return res.status(200).json(punishmentDELETE);
  } catch (error) {
    console.error("Error deleting punishment:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchPunishment = async (req, res) => {
  try {
    const { punishment_id, cause, duration } = req.body;
    const punishmentPATCH = await prismaClient.punishment.update({
      where: {
        punishment_id: punishment_id,
      },
      data: {
        cause,
        duration,
      },
    });
    return res.status(200).json(punishmentPATCH);
  } catch (error) {
    console.error("Error patching punishment:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getPunishment, postPunishment, deletePunishment, patchPunishment };
