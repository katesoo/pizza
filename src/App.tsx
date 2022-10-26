import { Routes, Route } from "react-router-dom";
import React from "react";

import "./scss/app.scss";
import { Header } from "./components/Header";

import { PizzaStore } from "./pages/PizzaStore";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Cart } from "./pages/Cart";
import { FullPizzaData } from "./components/fullPizzaData";

function App() {
  return (
    <div className="wrapper">
      <Header></Header>
      <div className="content">
        {
          <Routes>
            <Route path="/" element={<PizzaStore />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizzas/:id" element={<FullPizzaData />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        }
      </div>
    </div>
  );
}

export default App;
