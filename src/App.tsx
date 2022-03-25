import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/dist/styles/ag-grid.min.css";
import HomePage from "./pages/Home";
import AddRecordPage from "./pages/AddRecord";
import EditRecordPage from "./pages/EditRecord";
import { Layout } from "./components/Layout";

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddRecordPage />} />
          <Route path="edit" element={<EditRecordPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
