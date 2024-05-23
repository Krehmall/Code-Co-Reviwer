async function makeFetchRequest(url, method = "GET", body = null) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return response.json();
}

async function getCodeBlocks() {
  try {
    const response = await makeFetchRequest("/api/code-blocks");
    console.log("Here are all code blocks we have", response);
  } catch (error) {
    console.log(error);
  }
}

async function getCodeBlockById(id) {
  try {
    const response = await makeFetchRequest(`/api/code-blocks/${id}`);
    console.log("Here is your requested code block", response);
  } catch (error) {
    console.log(error);
  }
}

async function updateCodeBlock(id, code) {
  try {
    const response = await makeFetchRequest(`/api/code-blocks/${id}`, "PUT", { code });
    console.log("Updated successfully", response);
  } catch (error) {
    console.log(error);
  }
}

console.log("Front is here");

// getCodeBlocks();
// getCodeBlockById("664e66c85773d136561bf94d");
updateCodeBlock(
  "664e66c85773d136561bf94d",
  `for (let j = 0; j < 5; j++) {
  text += "The number is " + j + "<br>";
}`
);
