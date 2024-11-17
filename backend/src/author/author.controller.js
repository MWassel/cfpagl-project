import prismaClient from "../lib/prismaClient.js";

const postAuthor = async (req, res) => {
  try {
    const { author_name, nationality } = req.body;
    const authorPOST = await prismaClient.author.create({
      data: {
        author_name,
        nationality,
      },
    });
    return res.status(200).json(authorPOST);
  } catch (error) {
    console.error("Error creating a new author:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const getAuthor = async (req, res) => {
  try {
    const authorGET = await prismaClient.author.findMany();
    res.status(200).json(authorGET);
  } catch (error) {
    console.error("Error getting authors:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchAuthor = async (req, res) => {
  try {
    const { author_id, author_name, nationality } = req.body;
    const authorPATCH = await prismaClient.author.update({
      where: { author_id: author_id },
      data: {
        author_name: author_name,
        nationality: nationality,
      },
    });
    return res
      .status(200)
      .json({ message: "Author updated successfully.", authorPATCH });
  } catch (error) {
    console.error("Error updating author:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { postAuthor, getAuthor, patchAuthor };
