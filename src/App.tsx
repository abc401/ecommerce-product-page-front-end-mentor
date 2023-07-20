import ProductShowCase from "@components/ProductShowCase";
import { useState } from "react";
import "./App.css";
import ProductDescription from "@components/ProductDescription";
import Nav from "@components/Nav";
import CartContext from "@contexts/CartContext";

function App() {
  const cartContext = useState(0);

  return (
    <CartContext.Provider value={cartContext}>
      <div className="m-auto max-w-6xl sm:grid sm:px-6">
        <Nav />
        <main className="grid-cols-[minmax(auto,_1fr),_minmax(19.5rem,_1fr)] gap-14 align-top sm:grid sm:py-[clamp(1rem,_calc(16vw_-_5.4rem),5rem)]">
          <ProductShowCase className="mx-auto" />
          <ProductDescription className="sm:min-w-[19.5rem] sm:max-w-md" />
        </main>
      </div>
    </CartContext.Provider>
  );
}

export default App;
