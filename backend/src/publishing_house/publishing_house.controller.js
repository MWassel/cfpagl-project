import prismaClient from "../lib/prismaClient.js";

const getPublishingHouse = async (req, res) => {
  try {
    const publishingHouseGET = await prismaClient.publishing_house.findMany();
    res.status(200).json(publishingHouseGET);
  } catch (error) {
    console.error("Error getting publishing houses:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const postPublishingHouse = async (req, res) => {
  try {
    const { publishing_house_name } = req.body;
    const publishingHousePOST = await prismaClient.publishing_house.create({
      data: {
        publishing_house_name,
      },
    });
    return res.status(200).json(publishingHousePOST);
  } catch (error) {
    console.error("Error creating a new publishing house:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const patchPublishingHouse = async (req, res) => {
  try {
    const { publishing_house_id, publishing_house_name } = req.body;
    const publishingHousePATCH = await prismaClient.publishing_house.update({
      where: {
        publishing_house_id: publishing_house_id,
      },
      data: {
        publishing_house_name: publishing_house_name,
      },
    });
    return res.status(200).json(publishingHousePATCH);
  } catch (error) {
    console.error("Error patching publishing house:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const deletePublishingHouse = async (req, res) => {
  try {
    const { publishing_house_id } = req.body;
    const publishingHouseDELETE = await prismaClient.publishing_house.delete({
      where: {
        publishing_house_id: publishing_house_id,
      },
    });
    return res.status(200).json(publishingHouseDELETE);
  } catch (error) {
    console.error("Error deleting publishing house:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export {
  getPublishingHouse,
  postPublishingHouse,
  patchPublishingHouse,
  deletePublishingHouse,
};
