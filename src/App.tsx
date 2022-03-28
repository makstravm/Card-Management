import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Registration } from "./components/Registration/Registration";
import { Board } from "./components/Board";
import { Layout } from "./Layout";
import { Login } from "./components/Login/LogIn";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/board" element={<Board />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default App;
