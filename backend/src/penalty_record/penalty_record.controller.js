import prismaClient from "../lib/prismaClient.js";

const getPenaltyRecord = async (req, res) => {
  try {
    const penaltyRecordGET = await prismaClient.penalty_record.findMany();
    res.status(200).json(penaltyRecordGET);
  } catch (error) {
    console.error("Error getting penalty records:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postPenaltyRecord = async (req, res) => {
  try {
    const { loan_id, punishment_id } = req.body;
    const penaltyRecordPOST = await prismaClient.penalty_record.create({
      data: {
        loan_id: parseInt(loan_id),
        punishment_id: parseInt(punishment_id),
      },
    });
    res.status(200).json(penaltyRecordPOST);
  } catch (error) {
    console.error("Error creating a new penalty record:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchPenaltyRecord = async (req, res) => {
  try {
    const { loan_id, punishment_id } = req.body;
    const { penalty_id } = req.params;
    const penaltyRecordPATCH = await prismaClient.penalty_record.update({
      where: {
        penalty_id: parseInt(penalty_id),
      },
      data: {
        loan_id: parseInt(loan_id),
        punishment_id: parseInt(punishment_id),
      },
    });
    res.status(200).json(penaltyRecordPATCH);
  } catch (error) {
    console.error("Error updating a penalty record:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getPenaltyRecord, postPenaltyRecord, patchPenaltyRecord };
