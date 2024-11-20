import prismaClient from "../lib/prismaClient.js";

const getIndexById = async (req, res) => {
  try {
    const indexGET = await prismaClient.indexs.findUnique({
      where: { index_id_book_id: req.params },
    });
    res.status(200).json(indexGET);
  } catch (error) {
    console.error("Error getting indexes:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postIndex = async (req, res) => {
  try {
    const { index_id, book_id } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Book index is required." });
    }
    const index_picture = req.file.path;
    const indexPOST = await prismaClient.indexs.create({
      data: {
        index_id,
        book_id,
        index_picture,
      },
    });
    res.status(200).json(indexPOST);
  } catch (error) {
    console.error("Error creating index:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchIndex = async (req, res) => {
  try {
    const { index_id, book_id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "Book index is required." });
    }
    const index_picture = req.file.path;
    const indexPATCH = await prismaClient.indexs.update({
      where: { index_id_book_id: { index_id, book_id } },
      data: req.body,
    });
    res.status(200).json(indexPATCH);
  } catch (error) {
    console.error("Error updating index:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getIndexById, postIndex, patchIndex };
