import React from "react";
import Navbar from "./components/Navbar";
import BasketProducts from "./components/BasketProducts";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto px-5">
      <Navbar/>
      <h1 className="text-center mt-5 py-3 text-5xl mb-4">Redux Store</h1>
      <BasketProducts/>
    </div>
  );
}

export default App;
