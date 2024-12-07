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

    // Fetch book data from the database
    const bookGET = await prismaClient.books.findUnique({
      where: { book_id: book_id },
    });

    if (!bookGET) {
      return res.status(404).json({ error: "Book not found." });
    }

    const imageUrl = bookGET.cover
      ? `${req.protocol}://${req.get("host")}/assets/book-covers/${
          bookGET.cover
        }`
      : null;

    return res.status(200).json({
      book_id: bookGET.book_id,
      title: bookGET.book_title,
      summary: bookGET.summary,
      total_pages: bookGET.total_pages,
      publishing_year: bookGET.publishing_year,
      pubHouseId: bookGET.publishing_house_id,
      category: bookGET.categorie_id,
      imageUrl: imageUrl,
    });
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
    const { book_id } = req.params;
    const {
      book_title,
      summary,
      total_pages,
      publishing_year,
      categorie_id,
      publishing_house_id,
    } = req.body;

    const bookPATCH = await prismaClient.books.update({
      where: { book_id: book_id },
      data: {
        book_title,
        summary,
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
    console.log("Book ID received:", book_id);
    const bookDELETE = await prismaClient.books.update({
      where: {
        book_id: book_id,
      },
      data: {
        deleted: true,
      },
    });
    return res.status(200).json(bookDELETE);
  } catch (error) {
    console.error("Error deleting a book:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getBook, getBookByID, postBook, patchBook, deleteBook };
