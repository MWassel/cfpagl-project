import prismaClient from "../lib/prismaClient.js";

const getBookAuthors = async (req, res) => {
  try {
    const bookAuthorsGET = await prismaClient.book_authors.findMany();
    res.status(200).json(bookAuthorsGET);
  } catch (error) {
    console.error("Error getting book authors:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postBookAuthors = async (req, res) => {
  try {
    const bookAuthorsPOST = await prismaClient.book_authors.create({
      data: req.body,
    });
    res.status(200).json(bookAuthorsPOST);
  } catch (error) {
    console.error("Error creating book authors:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchBookAuthors = async (req, res) => {
  try {
    const { author_id, book_id } = req.params;
    const intAuthorID = parseInt(author_id);
    const bookAuthorsPATCH = await prismaClient.book_authors.update({
      where: { author_id_book_id: { author_id: intAuthorID, book_id } },
      data: req.body,
    });
    res.status(200).json(bookAuthorsPATCH);
  } catch (error) {
    console.error("Error updating book authors:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteBookAuthors = async (req, res) => {
  try {
    const { author_id, book_id } = req.params;
    const intAuthorID = parseInt(author_id);
    const bookAuthorsDELETE = await prismaClient.book_authors.delete({
      where: { author_id_book_id: { author_id: intAuthorID, book_id } },
    });
    res.status(200).json(bookAuthorsDELETE);
  } catch (error) {
    console.error("Error deleting book authors:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getBookAuthors, postBookAuthors, patchBookAuthors, deleteBookAuthors };
