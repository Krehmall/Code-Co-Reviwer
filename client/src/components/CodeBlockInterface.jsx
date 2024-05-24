import React, { useRef } from "react";
import { Box, Button, Center, Textarea, useColorMode } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api/code-blocks" : "http://localhost:3000/api/code-blocks";

const CopyButton = ({ sendCodeEdit, Id, code, setCode, canEdit }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textareaRef = useRef(null);

  const handleCodeChange = async (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (canEdit) {
      sendCodeEdit(newCode);
      if (newCode) {
        try {
          const { data } = await axios.put(`/${Id}`, { code: newCode });
          console.log("The changes are done:", data);
        } catch (error) {
          console.error("Error updating code block:", error);
        }
      }
    }
  };

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
      alert("Code copied to clipboard!");
    } else {
      console.error("Textarea element not found");
    }
  };

  return (
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
          isReadOnly={!canEdit}
        />
        <Button mt={2} onClick={handleCopy} leftIcon={<CopyIcon />}>
          Copy Code
        </Button>
      </Box>
    </Center>
  );
};

export default CopyButton;
