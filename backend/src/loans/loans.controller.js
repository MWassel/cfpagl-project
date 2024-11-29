import prismaClient from "../lib/prismaClient.js";

const getLoans = async (req, res) => {
  try {
    const loansGET = await prismaClient.loans.findMany();
    res.status(200).json(loansGET);
  } catch (error) {
    console.error("Error getting loans:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postLoan = async (req, res) => {
  try {
    const { note, student_id, manager_id, copy_id } = req.body;
    const loanPOST = await prismaClient.loans.create({
      data: {
        note,
        student_id: parseInt(student_id),
        manager_id: parseInt(manager_id),
        copy_id,
      },
    });
    res.status(200).json(loanPOST);
  } catch (error) {
    console.error("Error creating a new loan:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchLoan = async (req, res) => {
  try {
    const { note, student_id, manager_id, copy_id } = req.body;
    const { loan_id } = req.params;
    const loanPATCH = await prismaClient.loans.update({
      where: {
        loan_id: parseInt(loan_id),
      },
      data: {
        note,
        student_id: parseInt(student_id),
        manager_id: parseInt(manager_id),
        copy_id,
      },
    });
    res.status(200).json(loanPATCH);
  } catch (error) {
    console.error("Error updating a loan:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getLoans, postLoan, patchLoan };
