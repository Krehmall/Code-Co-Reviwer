import { Route, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby";
import SelectedCodeBlock from "./pages/SelectedCodeBlock";

function App() {
  return (
    <main>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/code-block/:Id" element={<SelectedCodeBlock />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
