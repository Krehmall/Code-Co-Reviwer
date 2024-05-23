import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import codeBlockRoutes from "./api/codeBlockRoutes.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
};

app.use(cors(corsOptions));

app.use("/api/code-blocks", codeBlockRoutes);

///Insert Uncheked CODE here

///Insert Uncheked CODE here

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server in running on http://localhost:${port}`);
});

import { insertInitCodeBlocks } from "./modules/codeBlockModule.js";
insertInitCodeBlocks();
