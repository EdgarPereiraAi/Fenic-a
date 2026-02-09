
export interface MenuItem {
  id: string;
  number?: string;
  name: string;
  price: string;
  ingredients: {
    pt: string;
    en: string;
    fr: string;
    de: string;
    es: string;
  };
  image: string;
}

export interface Category {
  id: string;
  title: {
    pt: string;
    en: string;
    fr: string;
    de: string;
    es: string;
  };
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type Language = 'pt' | 'en' | 'fr' | 'de' | 'es';
