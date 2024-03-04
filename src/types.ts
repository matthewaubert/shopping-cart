export interface CartItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  rating: { count: number; rate: number };
  title: string;
}

export interface ColorSchemeObj {
  accent: string;
  modalBg: string;
  navBg: string;
}

export type SetCartFunc = (arg: CartItem[]) => void;
