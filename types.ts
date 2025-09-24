export interface ColorVariant {
  id: string;
  name: string;
  colorHex: string;
  image: string;
  mainImage: string;
}

export interface Product {
  id: string;
  name:string;
  tagline: string;
  price: number;
  sizes: (string | number)[];
  colors: ColorVariant[];
  brandText: string;
}

export interface CartItem {
  id: string; 
  name: string;
  tagline: string;
  colorName: string;
  size: string | number;
  price: number;
  image: string;
}
