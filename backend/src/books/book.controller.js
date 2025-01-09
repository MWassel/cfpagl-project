import prismaClient from "../lib/prismaClient.js";

const getBook = async (req, res) => {
  try {
    const bookGET = await prismaClient.books.findMany({
      where: {
        deleted: false,
      },
      include: {
        Categories: {
          select: {
            categorie_name: true,
          },
        },
        publishing_house: {
          select: {
            publishing_house_name: true,
          },
        },
      },
    });

    // Fix: Spread 'book' instead of 'bookGET'
    const booksWithRelativePaths = bookGET.map((book) => ({
      ...book,
      cover: `/assets/book-covers/${book.cover.split("book-covers/")[1]}`,
    }));

    res.status(200).json(booksWithRelativePaths);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
const getBookByID = async (req, res) => {
  try {
    const book_id = req.params.book_id; // Make sure this matches your route parameter

    const bookGET = await prismaClient.books.findUnique({
      where: {
        book_id: book_id,
        deleted: false,
      },
      include: {
        Categories: {
          select: {
            categorie_name: true,
          },
        },
        publishing_house: {
          select: {
            publishing_house_name: true,
          },
        },
      },
    });

    if (!bookGET) {
      return res.status(404).json({ error: "Book not found." });
    }

    const cover = bookGET.cover
      ? `/assets/book-covers/${bookGET.cover.split("book-covers/")[1]}`
      : null;

    const response = {
      ...bookGET,
      cover: cover,
    };

    console.log("Sending response:", response); // Add debug log
    return res.status(200).json(response);
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
const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(200).json([]);
    }

    const books = await prismaClient.books.findMany({
      where: {
        book_title: {
          contains: query,
        },
        deleted: false,
      },
      select: {
        book_id: true,
        book_title: true,
        cover: true,
      },
      take: 5, // Limit results to 5 books
    });

    // Process cover paths
    const booksWithProcessedCovers = books.map((book) => ({
      ...book,
      cover: book.cover
        ? `/assets/book-covers/${book.cover.split("book-covers/")[1]}`
        : null,
    }));

    res.status(200).json(booksWithProcessedCovers);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getBook, getBookByID, postBook, patchBook, deleteBook, searchBooks };
