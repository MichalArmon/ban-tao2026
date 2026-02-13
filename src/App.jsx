import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import PublicLayout from "./resort/Layout/PublicLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />} />
    </Routes>
  );
}

export default App;
