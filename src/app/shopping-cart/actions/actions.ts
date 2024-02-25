// 'use client'

/*
cookie: cart {
    id-uuid: number,
}
*/
import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookiesCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookiesCart();
  if (cookieCart[id]) {
    cookieCart[id]++;
  } else {
    cookieCart[id] = 1;
  }
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookiesCart();
  if (cookieCart[id]) {
    delete cookieCart[id];
    setCookie("cart", JSON.stringify(cookieCart));
  }
};

export const removeItemFromCart = (id: string) => {
  const cookieCart = getCookiesCart();
  if (cookieCart[id]) {
    cookieCart[id]--;
    if (cookieCart[id] === 0) {
      delete cookieCart[id];
    }
    setCookie("cart", JSON.stringify(cookieCart));
  }
};
