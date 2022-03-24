import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { Registration } from "./components/Registration";
import { Board } from "./components/Board";
import { Layout } from "./Layout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LogIn text="Log In" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/board" element={<Board text="Board" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default App;
