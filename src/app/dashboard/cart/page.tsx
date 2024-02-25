import { cookies } from "next/headers";
import { type Product, products } from "@/products/data/products";
import { ItemCard } from "@/app/shopping-cart";
import { WidgetItem } from "@/components";

export const metadata = {
  name: "Shopping Cart Page",
  description: "SEO friendly shopping cart page",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };

  const productsInCart = getProductInCart(cart);
  const totalToPay = productsInCart
    .reduce((acc, { product, quantity }) => product.price * quantity + acc, 0)
    .toFixed(2);
  const totalTax = (Number(totalToPay) * Number(1.15)).toFixed(2);
  const taxes = (Number(totalToPay) * Number(0.15)).toFixed(2);
  return (
    <div>
      <h1 className="text- 5xl">Products on the cart</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-2xl font-bold text-gray-700">${totalTax}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Taxes 15%: {taxes}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
