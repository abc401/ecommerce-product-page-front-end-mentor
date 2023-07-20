import { createContext, useState, useContext } from "react";

const CartContext = createContext<[number, (new_value: number) => void]>([
  0,
  function (_) {},
]);
export default CartContext;
