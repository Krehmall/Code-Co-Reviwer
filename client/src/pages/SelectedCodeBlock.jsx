import { useEffect, useState, useRef } from "react";
import { Box, Button, Center, Container, Heading, Textarea, useColorMode } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useParams } from "react-router";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api/code-blocks" : "http://localhost:3000/api/code-blocks";

const SelectedCodeBlock = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("");
  const textareaRef = useRef(null);
  const { Id } = useParams();

  useEffect(() => {
    const loadCodeBlock = async () => {
      try {
        console.log("Fetching data...");
        const { data } = await axios.get("/");
        console.log("Data fetched:", data);
        const currCodeBlock = data.find((item) => item._id === Id);
        if (currCodeBlock) {
          setCode(currCodeBlock.code);
          setTheme(currCodeBlock.theme);
        } else {
          console.warn(`No code block found with ID ${Id}`);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadCodeBlock();
  }, [Id]);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
      alert("Code copied to clipboard!");
    } else {
      console.error("Textarea element not found");
    }
  };

  const handleCodeChange = async (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    console.log("Saving Data....");
    if (newCode) {
      try {
        const { data } = await axios.put(`/${Id}`, { code: newCode });
        console.log("The changes are done:", data);
      } catch (error) {
        console.error("Error updating code block:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Container maxW="100%" py={5} bg="black" centerContent>
        <Heading size={"2xl"} color={"white"}>
          The code block is about "{theme || "Unknown"}"
        </Heading>
      </Container>
      <Center>
        <Box p={4} width="600px">
          <Button onClick={toggleColorMode} mb={4}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            fontFamily="monospace"
            whiteSpace="pre-wrap"
            p={4}
            bg={colorMode === "light" ? "gray.100" : "gray.700"}
            color={colorMode === "light" ? "black" : "white"}
            borderRadius="md"
            size="md"
            minHeight="150px"
          />
          <Button mt={2} onClick={handleCopy} leftIcon={<CopyIcon />}>
            Copy Code
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default SelectedCodeBlock;
