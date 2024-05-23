import { Container, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CodeBlock from "../components/CodeBlock";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api/code-blocks";

const Lobby = () => {
  useEffect(() => {
    const loadCodeBlocksData = async () => {
      const { data } = await axios.get("/");
      setCodeBlocksData(data || []);
    };
    loadCodeBlocksData();
  }, []);

  const [codeBlocksData, setCodeBlocksData] = useState([]);

  return (
    <>
      <Container maxW="100%" py={5} bg="black" centerContent>
        <Heading size={"2xl"} color={"white"}>
          Choose code block
        </Heading>
      </Container>
      <br />
      <Flex direction="column" alignItems="space-around" gap={4}>
        {codeBlocksData.map((codeBlock) => (
          <CodeBlock key={codeBlock._id} codeBlock={codeBlock} />
        ))}
      </Flex>
    </>
  );
};

export default Lobby;
