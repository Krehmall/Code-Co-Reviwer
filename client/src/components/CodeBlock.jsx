import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const CodeBlock = ({ codeBlock }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/code-block/${codeBlock._id}`);
  };
  return (
    <>
      <Box
        p={5}
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        color={colorMode === "light" ? "black" : "white"}
        borderRadius="md"
        cursor="pointer"
        _hover={{
          bg: colorMode === "light" ? "gray.200" : "gray.600",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={handleClick}
        width="400px"
        margin="auto"
        textAlign="center"
      >
        <Heading size={"lg"} mb={4}>
          {codeBlock.theme}
        </Heading>
        {codeBlock.code}
      </Box>
    </>
  );
};

export default CodeBlock;
