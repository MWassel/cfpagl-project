import prismaClient from "../lib/prismaClient.js";

const getBranch = async (req, res) => {
  try {
    const branchGET = await prismaClient.branch.findMany();
    res.status(200).json(branchGET);
  } catch (error) {
    console.error("Error creating a new branch:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postBranch = async (req, res) => {
  try {
    const { branch_id, training_start_date, training_end_date, speciality_id } =
      req.body;

    if (
      !branch_id ||
      !speciality_id ||
      !training_start_date ||
      !training_end_date
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const branchPOST = await prismaClient.branch.create({
      data: {
        branch_id,
        speciality_id,
        training_start_date,
        training_end_date,
      },
    });

    res
      .status(201)
      .json({ message: "Branch created successfully.", branchPOST });
  } catch (error) {
    console.error("Error creating a new branch:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchBranch = async (req, res) => {
  try {
    const { branch_id, training_start_date, training_end_date, speciality_id } =
      req.body;

    if (
      !branch_id ||
      !speciality_id ||
      !training_start_date ||
      !training_end_date
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const branchPATCH = await prismaClient.branch.update({
      where: {
        branch_id,
      },
      data: {
        speciality_id,
        training_start_date,
        training_end_date,
      },
    });

    res
      .status(201)
      .json({ message: "Branch updated successfully.", branchPATCH });
  } catch (error) {
    console.error("Error creating a new branch:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getBranch, postBranch, patchBranch };
