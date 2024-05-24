import { useEffect, useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { useParams } from "react-router";
import io from "socket.io-client";
import axios from "axios";
import CodeBlockInterface from "../components/CodeBlockInterface";

const socket = io.connect("http://localhost:3001");
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api/code-blocks" : "http://localhost:3000/api/code-blocks";

const SelectedCodeBlock = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("");
  const [canEdit, setCanEdit] = useState(true);
  const { Id } = useParams();

  useEffect(() => {
    socket.on("code-to-client", (data) => {
      console.log(data);
      setCode(data.code);
    });

    socket.on("disable-editing", () => {
      setCanEdit(false);
      console.log("Editing disabled");
    });

    socket.on("visitor-count", (count) => {
      console.log("Visitor count:", count);
    });

    loadCodeBlock();
    joinRoom();
    return leaveRoom;
  }, [socket, Id]);

  const loadCodeBlock = async () => {
    try {
      const { data } = await axios.get("/");
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

  const joinRoom = () => {
    socket.emit("join-room", Id);
  };

  const leaveRoom = () => {
    return socket.emit("leave-room", Id);
  };

  const sendCodeEdit = (dataCode) => {
    if (canEdit) {
      const codeData = {
        code: dataCode,
        room: Id,
      };
      socket.emit("code-to-server", codeData);
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
      <CodeBlockInterface sendCodeEdit={sendCodeEdit} Id={Id} code={code} setCode={setCode} canEdit={canEdit} />
    </>
  );
};

export default SelectedCodeBlock;
