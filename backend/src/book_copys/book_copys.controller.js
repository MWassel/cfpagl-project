import prismaClient from "../lib/prismaClient.js";

const getBookCopys = async (req, res) => {
  try {
    const bookCopysGET = await prismaClient.book_copys.findMany();
    res.status(200).json(bookCopysGET);
  } catch (error) {
    console.error("Error getting book copys:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postBookCopy = async (req, res) => {
  try {
    const { copy_id, inventory_number, book_id, location } = req.body;
    const bookCopyPOST = await prismaClient.book_copys.create({
      data: {
        copy_id,
        inventory_number: parseInt(inventory_number),
        location,
        book_id,
      },
    });
    return res.status(200).json(bookCopyPOST);
  } catch (error) {
    console.error("Error creating a new book copy:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchBookCopy = async (req, res) => {
  try {
    const { copy_id, inventory_number, book_id, location } = req.body;
    const bookCopyPATCH = await prismaClient.book_copys.update({
      where: {
        copy_id,
      },
      data: {
        copy_id,
        inventory_number: parseInt(inventory_number),
        location,
        book_id,
      },
    });
    return res.status(200).json(bookCopyPATCH);
  } catch (error) {
    console.error("Error updating book copy:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteBookCopy = async (req, res) => {
  try {
    const { copy_id } = req.params;
    const bookCopyDELETE = await prismaClient.book_copys.delete({
      where: {
        copy_id: copy_id,
      },
    });
    return res.status(200).json(bookCopyDELETE);
  } catch (error) {
    console.error("Error deleting a book copy:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getBookCopys, postBookCopy, patchBookCopy, deleteBookCopy };
