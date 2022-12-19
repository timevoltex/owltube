import { Route, Routes } from "react-router-dom";
import { Home, Auth } from "pages";

function App() {
  console.log("23");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
