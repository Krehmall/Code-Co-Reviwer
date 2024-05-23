import express from "express";
import { getCodeBlocks, updateCodeBlock } from "../modules/codeBlockModule.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const codeBlocks = await getCodeBlocks();
    console.log({ codeBlocks });

    res.send(codeBlocks);
  } catch (error) {
    return res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

// router.get("/:Id", async (req, res) => {
//   try {
//     const codeBlock = await getCodeBlockById(req.params.Id);
//     res.send(codeBlock);
//   } catch (error) {
//     return res.status(500).send({ message: error.message || "Internal Server Error" });
//   }
// });

router.put("/:Id", async (req, res) => {
  try {
    const code = req.body;
    await updateCodeBlock(req.params.Id, code);
    console.log(req.params.Id, code);

    res.status(200).send({ message: "Code block updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

export default router;
