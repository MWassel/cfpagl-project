import prismaClient from "../lib/prismaClient.js";

const getBook = async (req, res) => {
  try {
    const bookGET = await prismaClient.books.findMany();
    res.status(200).json(bookGET);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const getBookByID = async (req, res) => {
  try {
    const { book_id } = req.params;
    const bookGET = await prismaClient.books.findUnique({
      where: { book_id: book_id },
    });
    if (!bookGET) {
      return res.status(404).json({ error: "Book not found." });
    }
    return res.status(200).json(bookGET);
  } catch (error) {
    console.error("Error finding a book:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const postBook = async (req, res) => {
  try {
    const {
      book_id,
      book_title,
      summary,
      total_pages,
      publishing_year,
      categorie_id,
      publishing_house_id,
    } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Book cover is required." });
    }

    const cover = req.file.path;

    if (!book_id || !book_title || !categorie_id || !publishing_house_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const bookPOST = await prismaClient.books.create({
      data: {
        book_id: book_id,
        book_title,
        summary,
        total_pages: parseInt(total_pages),
        publishing_year: parseInt(publishing_year),
        cover,
        categorie_id: parseInt(categorie_id),
        publishing_house_id: parseInt(publishing_house_id),
      },
    });

    return res.status(200).json(bookPOST);
  } catch (error) {
    console.error("Error creating a new book:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchBook = async (req, res) => {
  try {
    const {
      book_id,
      book_title,
      summary,
      total_pages,
      publishing_year,
      categorie_id,
      publishing_house_id,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Book cover is required." });
    }

    const cover = req.file.path;

    const bookPATCH = await prismaClient.books.update({
      where: { book_id: book_id },
      data: {
        book_title,
        summary,
        cover,
        total_pages: parseInt(total_pages),
        publishing_year: parseInt(publishing_year),
        categorie_id: parseInt(categorie_id),
        publishing_house_id: parseInt(publishing_house_id),
      },
    });

    return res.status(200).json(bookPATCH);
  } catch (error) {
    console.error("Error updating a book:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const bookDELETE = await prismaClient.books.delete({
      where: {
        book_id: book_id,
      },
    });
    return res.status(200).json(bookDELETE);
  } catch (error) {
    console.error("Error deleting a book:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getBook, getBookByID, postBook, patchBook, deleteBook };
