import prismaClient from "../lib/prismaClient.js";

const getCategories = async (req, res) => {
  try {
    const categoriesGET = await prismaClient.categories.findMany();
    res.status(200).json(categoriesGET);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const categoryPOST = await prismaClient.categories.create({
      data: {
        categorie_name: category_name,
      },
    });
    return res.status(200).json(categoryPOST);
  } catch (error) {
    console.error("Error creating a new category:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchCategory = async (req, res) => {
  try {
    const { category_id, category_name } = req.body;
    const categoryPATCH = await prismaClient.categories.update({
      where: {
        categorie_id: category_id,
      },
      data: {
        categorie_name: category_name,
      },
    });
    return res.status(200).json(categoryPATCH);
  } catch (error) {
    console.error("Error patching category:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.body;
    const categoryDELETE = await prismaClient.categories.delete({
      where: {
        categorie_id: category_id,
      },
    });
    return res.status(200).json(categoryDELETE);
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export { getCategories, postCategory, patchCategory, deleteCategory };
