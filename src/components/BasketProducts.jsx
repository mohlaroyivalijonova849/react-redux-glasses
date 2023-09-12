import Product from "./Product";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EmptyBacket from "./EmptyBacket";

function BasketProducts() {
  const [total, setTotal] = useState(0);
  const { products } = useSelector((store) => store.basket);
  useEffect(() => {
    // Calculate the initial total when the component mounts
    calculateTotal(products);
  }, [products]);

  const calculateTotal = (products) => {
    const newTotal = products.reduce((acc, product) => {
      return acc + product.price * product.amount;
    }, 0);

    setTotal(newTotal);
  };
  const handleUpdateQuantity = (price, quantityChange) => {
    // Update the total when a product's quantity changes
    const newTotal = total + price * quantityChange;
    setTotal(newTotal);
  };

  return (
    <div>
      {products.length ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {products.map((product) => {
              return (
                <Product
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  amount={product.amount}
                  price={product.price}
                  image={product.image}
                />
              );
            })}
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">
                  Total
                </th>

                <td className="px-6 py-3">${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <EmptyBacket />
      )}
    </div>
  );
}

export default BasketProducts;
