import prismaClient from "../lib/prismaClient.js";

const postSpeciality = async (req, res) => {
  try {
    const { speciality_id, speciality, training_duration, training_type } =
      req.body;

    if (!speciality_id || !speciality || !training_duration || !training_type) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const specialityPOST = await prismaClient.speciality.create({
      data: {
        speciality_id,
        speciality,
        training_duration: parseInt(training_duration),
        training_type,
      },
    });

    res
      .status(201)
      .json({ message: "Speciality created successfully.", specialityPOST });
  } catch (error) {
    console.error("Error creating a new speciality:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchSpeciality = async (req, res) => {
  try {
    const { speciality_id, speciality, training_duration, training_type } =
      req.body;

    if (!speciality_id || !speciality || !training_duration || !training_type) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const specialityPATCH = await prismaClient.speciality.update({
      where: {
        speciality_id,
      },
      data: {
        speciality,
        training_duration: parseInt(training_duration),
        training_type,
      },
    });

    res
      .status(201)
      .json({ message: "Speciality updated successfully.", specialityPATCH });
  } catch (error) {
    console.error("Error creating a new speciality:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const getSpeciality = async (req, res) => {
  try {
    const specialityGET = await prismaClient.speciality.findMany();
    res.status(200).json(specialityGET);
  } catch (error) {
    console.error("Error creating a new speciality:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { postSpeciality, patchSpeciality, getSpeciality };
