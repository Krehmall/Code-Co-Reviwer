import { getCollection, toObjectId } from "./dbModule.js";

const entity = "code_blocks";

const initCodeBlocks = [
  {
    theme: "Foor loop",
    code: `for (let i = 0; i < 5; i++) {
  text += "The number is " + i + "<br>";
}`,
  },
  {
    theme: "Arrow Func",
    code: `hello = () => {
  return "Hello World!";
}`,
  },
  {
    theme: "Reduce",
    code: `const numbers = [15.5, 2.3, 1.1, 4.7];
document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);

function getSum(total, num) {
  return total + Math.round(num);
}`,
  },
];

export async function insertInitCodeBlocks() {
  try {
    const collection = await getCollection(entity);
    if (!(await getCodeBlocks())) {
      const codeBlocks = await collection.insertMany(initCodeBlocks);
      console.log(codeBlocks);
      if (!codeBlocks || codeBlocks.length === 0) {
        throw new Error("There is no data to insert");
      }
    }
  } catch (error) {
    console.log({ error });
  }
}

export async function getCodeBlocks() {
  try {
    const collection = await getCollection(entity);
    const codeBlocks = await collection.find().toArray();
    if (!codeBlocks || codeBlocks.length === 0) {
      throw new Error("There is no data ");
    }
    return codeBlocks;
  } catch (error) {
    console.log({ error });
  }
}

export async function updateCodeBlock(Id, code) {
  try {
    const collection = await getCollection(entity);
    const updateResult = await collection.updateOne({ _id: toObjectId(Id) }, { $set: code });
    if (updateResult.matchedCount === 0) {
      throw new Error("Code block not found");
    }
    return { success: true, message: "Code block updated successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
