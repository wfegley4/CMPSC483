import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import Students from "./pages/Students";
import Teams from "./pages/Teams";
import Export from "./pages/Export";

import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Home" element={<Blank />} />
          {/* <Route path="Group" element={<Group />} /> */}
          <Route path="Students" element={<Students />} />
          <Route path="Teams" element={<Teams />} />
          <Route path="Export" element={<Export />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
