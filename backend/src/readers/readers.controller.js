import prismaClient from "../lib/prismaClient.js";

const getReader = async (req, res) => {
  try {
    const readerGET = await prismaClient.readers.findMany();
    res.status(200).json(readerGET);
  } catch (error) {
    console.error("Error getting readers:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postReader = async (req, res) => {
  try {
    const { student_id, manager_id, copy_id, note } = req.body;
    const readerPOST = await prismaClient.readers.create({
      data: {
        student_id,
        manager_id,
        copy_id,
        note,
      },
    });
    res.status(200).json(readerPOST);
  } catch (error) {
    console.error("Error creating a new reader:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchReader = async (req, res) => {
  try {
    const { student_id, mangager_id, copy_id, note } = req.body;
    const { read_session } = req.params;
    const readerPATCH = await prismaClient.readers.update({
      where: {
        read_session: parseInt(read_session),
      },
      data: {
        student_id,
        mangager_id,
        copy_id,
        note,
      },
    });
    res.status(200).json(readerPATCH);
  } catch (error) {
    console.error("Error updating a reader:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getReader, postReader, patchReader };
