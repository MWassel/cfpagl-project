import prismaClient from "../lib/prismaClient.js";

const postStudent = async (req, res) => {
  try {
    const {
      student_id,
      first_name,
      last_name,
      birth_date,
      phone_number,
      sex,
      branch_id,
    } = req.body;

    if (
      !student_id ||
      !first_name ||
      !last_name ||
      !birth_date ||
      !sex ||
      !branch_id
    ) {
      return res.status(400).json({ error: "Some fields are required." });
    }

    const studentPOST = await prismaClient.student.create({
      data: {
        student_id,
        first_name,
        last_name,
        birth_date,
        phone_number,
        sex,
        branch_id,
      },
    });

    return res
      .status(201)
      .json({ message: "Student created successfully.", studentPOST });
  } catch (error) {
    console.error("Error creating a new student:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const getStudent = async (req, res) => {
  try {
    const studentGET = await prismaClient.student.findMany();
    return res.status(200).json(studentGET);
  } catch (error) {
    console.error("Error finding students:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const getStudentByID = async (req, res) => {
  try {
    const { student_id } = req.params;

    const studentGET = await prismaClient.student.findUnique({
      where: { student_id: parseInt(student_id) },
    });
    if (!studentGET) {
      return res.status(404).json({ error: "Student not found." });
    }
    return res.status(200).json(studentGET);
  } catch (error) {
    console.error("Error finding a student:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchStudent = async (req, res) => {
  try {
    const { student_id, first_name, last_name, birth_date, phone_number, sex } =
      req.body;
    const studentPATCH = await prismaClient.student.update({
      where: { student_id: student_id },
      data: {
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        phone_number: phone_number,
        sex: sex,
      },
    });
    return res
      .status(200)
      .json({ message: "Student updated successfully.", studentPATCH });
  } catch (error) {
    console.error("Error updating a new student:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { postStudent, getStudent, getStudentByID, patchStudent };
