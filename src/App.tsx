import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RecordsPage from "./pages/Records";
import AddRecordPage from "./pages/AddRecord";
import EditRecordPage from "./pages/EditRecord";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecordsPage />} />
        <Route path="/add" element={<AddRecordPage />} />
        <Route path="edit" element={<EditRecordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
