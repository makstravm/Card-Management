import React from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { Registration } from "./components/Registration";
import { Board } from "./components/Board";
import { Layout } from "./Layout";
import { Home } from "./components/Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/board" element={<Board />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default App;
