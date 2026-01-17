
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
  };
  image: string;
}

export interface Category {
  id: string;
  title: string;
  items: MenuItem[];
}

export type Language = 'pt' | 'en' | 'fr' | 'de';
