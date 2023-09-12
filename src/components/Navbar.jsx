import { useSelector } from "react-redux";

function Navbar() {
  const { products } = useSelector((state) => state.basket);

  // Calculate the total quantity by summing up the 'amount' property of all products
  const totalQuantity = products.reduce((total, product) => {
    return total + product.amount;
  }, 0);
  return (
    <div className="flex justify-between pt-5">
      <p className="font-medium">Home</p>
      <p className="flex relative">
        <img
          src="https://static5.tgstat.ru/channels/_0/b2/b2d6876588c215ec9d66d122cd88e8f0.jpg"
          alt=""
          className="w-9 h-9 rounded-full"
        />
        <span className="bg-red-500 text-sm absolute text-white right-[-18px] w-[20px] h-[20px] px-1 text-center rounded-full">
          {totalQuantity}
        </span>
      </p>
    </div>
  );
}

export default Navbar;
