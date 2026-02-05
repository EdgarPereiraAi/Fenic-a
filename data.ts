
import { Category } from './types';

// Logotipo do Chef fornecido pelo utilizador
export const CHEF_LOGO = 'https://images.unsplash.com/photo-1583394293214-28dea15ee548?auto=format&fit=crop&w=400&q=80'; 

// Imagens mapeadas conforme as fotos do utilizador
const IMG_PWA_BREAD = 'https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&w=800&q=80';
const IMG_GARLIC_BREAD = 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80'; // Imagem 01
const IMG_GARLIC_CHEESE_HAM = 'https://images.unsplash.com/photo-1626078297492-b7ca552745d1?auto=format&fit=crop&w=800&q=80'; // Imagem 11 (Pão dobrado)
const IMG_ROSEMARY_BREAD = 'https://images.unsplash.com/photo-1610439665115-43093959c86a?auto=format&fit=crop&w=800&q=80'; // Imagem 03

const IMG_LASAGNA = 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80'; // Imagem 10
const IMG_SPAGHETTI = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'; // Imagem 22
const IMG_EMPADINHA = 'https://images.unsplash.com/photo-1619051810561-26c71c1f7282?auto=format&fit=crop&w=800&q=80'; // Imagem 15

const IMG_PIZZA_CAPRICIOSA = 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'; // Imagem 08
const IMG_PIZZA_MILANO = 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=800&q=80'; // Imagem 05
const IMG_PIZZA_AMOR = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'; // Imagem 09
const IMG_PIZZA_SICILIA = 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80';
const IMG_PIZZA_AMERICANA = 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'; // Imagem 07

const IMG_PIZZA_FENICIA_ESP = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'; // Imagem 04 (Chicken/Pepper)
const IMG_PIZZA_BARCO = 'https://images.unsplash.com/photo-1542834369-f10f2254302c?auto=format&fit=crop&w=800&q=80'; // Imagem 17 (Boat style)
const IMG_PIZZA_JACK_ESP = 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=800&q=80'; // Imagem 18 (Corn)
const IMG_PIZZA_BLACK_WHITE = 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=800&q=80'; // Imagem 06 (Swirl sauce)
const IMG_PIZZA_TROPICAL = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'; // Imagem 19
const IMG_PIZZA_CHEESE = 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=800&q=80'; // Imagem 14

const IMG_KEBAB_PÃO = 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80'; // Imagem 13
const IMG_KEBAB_ROLO = 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80'; // Imagem 12
const IMG_SALADA_FENICIA = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'; // Imagem 02 (Salada com ovo/camarão)

export const MENU_DATA: Category[] = [
  {
    id: 'entradas',
    title: 'Entradas',
    items: [
      { id: 'e00', number: '00', name: 'Pão', price: '1.50€', ingredients: { pt: 'Pão fresco', en: 'Bread', fr: 'Pain', de: 'Brot', es: 'Pan fresco' }, image: IMG_PWA_BREAD },
      { id: 'e01', number: '01', name: 'Pão com Alho', price: '3.50€', ingredients: { pt: 'Pão com alho', en: 'Bread with garlic', fr: 'Pain à l\'ail', de: 'Brot mit knoblauch', es: 'Pan con ajo' }, image: IMG_GARLIC_BREAD },
      { id: 'e02', number: '02', name: 'Pão com Alho e Queijo', price: '4.50€', ingredients: { pt: 'Pão com alho e queijo', en: 'Bread with garlic and cheese', fr: 'Pain à l\'ail et fromage', de: 'Brot mit knoblauch und käse', es: 'Pan con ajo y queso' }, image: IMG_GARLIC_BREAD },
      { id: 'e03', number: '03', name: 'Pão com Alho, Queijo e Fiambre', price: '5.00€', ingredients: { pt: 'Pão com alho, queijo e fiambre', en: 'Bread with garlic, cheese and ham', fr: 'Pain à l\'ail, fromage et jambom', de: 'Brot mit knoblauch, käse und schinken', es: 'Pan con ajo, queso y jamón' }, image: IMG_GARLIC_CHEESE_HAM },
      { id: 'e04', number: '04', name: 'Pão com alecrim', price: '3.00€', ingredients: { pt: 'Pão com alecrim', en: 'Rosemary bread', fr: 'Pain au romarin', de: 'Rosmarin-brot', es: 'Pan con romero' }, image: IMG_ROSEMARY_BREAD }
    ]
  },
  {
    id: 'massas',
    title: 'Massas e Empadas',
    items: [
      { id: 'm44', number: '44', name: 'Lasanha da Casa', price: '11.00€', ingredients: { pt: 'Lasanha da casa', en: 'House lasagne', fr: 'Lasagnes maison', de: 'Haus lasagne', es: 'Lasaña de casa' }, image: IMG_LASAGNA },
      { id: 'm45', number: '45', name: 'Esparguete à Bolonhesa', price: '10.00€', ingredients: { pt: 'Esparguete à bolonhesa', en: 'Bolognaise spaghetti', fr: 'Spagetthi à la bolognaise', de: 'Bolognaise spaghetti', es: 'Espaguetis a la boloñesa' }, image: IMG_SPAGHETTI },
      { id: 'sp28', number: '28', name: 'Empadinha à bolonhesa', price: '9.50€', ingredients: { pt: 'Bolognaise meat-pie', en: 'Bolognaise meat-pie', fr: 'Petit tourte bolognaise', de: 'Bolognese-fleischpastete', es: 'Pastel de carne a la boloñesa' }, image: IMG_EMPADINHA },
      { id: 'sp29', number: '29', name: 'Empadinha de carne kebab', price: '9.50€', ingredients: { pt: 'Kebab meat-pie', en: 'Kebab meat-pie', fr: 'Petit tourte à la viande de kebab', de: 'Kebab-fleischpastete', es: 'Pastel de carne de kebab' }, image: IMG_EMPADINHA },
      { id: 'sp17', number: '17', name: 'Ciao-Ciao', price: '11.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, cebola, lombo de porco e alho', en: 'Tomato, cheese, mushrooms, onions, pork fillet and garlic', fr: 'Tomate, fromage, champignons, oignon, filet de porc et ail', de: 'Tomaten, käse, pilze, zwiebeln, schweinefilet und Knoblauch', es: 'Tomate, queso, champiñones, cebolla, solomillo de cerdo y ajo' }, image: IMG_PIZZA_FENICIA_ESP }
    ]
  },
  {
    id: 'pizzas-classicas',
    title: 'Pizzas Clássicas',
    items: [
      { id: 'p01', number: '1', name: 'Capriciosa', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre e cogumelos', en: 'Tomato, cheese, ham and mushrooms', fr: 'Tomate, fromage, jambon et champignons', de: 'Tomaten, käse, schinken and pilze', es: 'Tomate, queso, jamón y champiñones' }, image: IMG_PIZZA_CAPRICIOSA },
      { id: 'p02', number: '2', name: 'Milano', price: '9.50€', ingredients: { pt: 'Tomate, queijo, fiambre', en: 'Tomato, cheese and ham', fr: 'Tomate, fromage et jambon', de: 'Tomaten, käse und schinken', es: 'Tomate, queso y jamón' }, image: IMG_PIZZA_MILANO },
      { id: 'p04', number: '4', name: 'Bolonhesa', price: '10.00€', ingredients: { pt: 'Tomate, queijo, cebola e bolonhesa', en: 'Tomato, chesse, onions and bolognaise sauce', fr: 'Tomate, fromage, oignons et sauce bolognaise', de: 'Tomaten, käse, zwiebeln and bolognese-sauce', es: 'Tomate, queso, cebolla y boloñesa' }, image: IMG_PIZZA_SICILIA },
      { id: 'p06', number: '6', name: 'Amor', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre, delícias do mar e camarão', en: 'Tomato, cheese, ham, crab and prawns', fr: 'Tomate, fromage, jambon, surimi et crevettes', de: 'Tomaten, käse, schinken, krabben und garnelen', es: 'Tomate, queso, jamón, surimi y gambas' }, image: IMG_PIZZA_AMOR },
      { id: 'p07', number: '7', name: 'Sicilia', price: '10.00€', ingredients: { pt: 'Tomate, queijo, champiñones e salami', en: 'Tomato, cheese, mushrooms and salami', fr: 'Tomate, fromage, champignons et salami', de: 'Tomaten, käse, pilze e salami', es: 'Tomate, queso, champiñones y salami' }, image: IMG_PIZZA_CAPRICIOSA },
      { id: 'p08', number: '8', name: 'Roma', price: '10.00€', ingredients: { pt: 'Tomate, queijo, atum e camarão', en: 'Tomato, cheese, tuna and prawns', fr: 'Tomate, fromage, thon et crevettes', de: 'Tomaten, käse, thunfisch und garnelen', es: 'Tomate, queso, atún y gambas' }, image: IMG_PIZZA_SICILIA },
      { id: 'p09', number: '9', name: 'Quatro estações', price: '11.00€', ingredients: { pt: 'Tomate, queijo, fiambre, cogumelos, camarão e mexilhão', en: 'Tomato, cheese, ham, prawns and mussels', fr: 'Tomate, fromage, jambom, champignons, crevettes et moules', de: 'Tomaten, Käse, Schinken, Garnelen und Muscheln', es: 'Tomate, queso, jamón, champiñones, gambas y mejillones' }, image: IMG_PIZZA_AMOR },
      { id: 'p13', number: '13', name: 'Hawaii-havaiana', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre e ananás', en: 'Tomato, cheese, ham and pine-apple', fr: 'Tomate, fromage, jambon et ananas', de: 'Tomaten, käse, schinken and pinienapfel', es: 'Tomate, queso, jamón y piña' }, image: IMG_PIZZA_TROPICAL },
      { id: 'p15', number: '15', name: 'Americana', price: '11.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, pepperoni e camarão', en: 'Tomato, cheese, mushrooms, pepperoni and prawns', fr: 'Tomate, fromage, champignons, pepperoni et crevettes', de: 'Tomaten, käse, pilze, peperoni and garnelen', es: 'Tomate, queso, champiñones, pepperoni y gambas' }, image: IMG_PIZZA_AMERICANA },
      { id: 'p20', number: '20', name: 'Margarita', price: '9.50€', ingredients: { pt: 'Tomate, queijo', en: 'Tomato and cheese', fr: 'Tomate et fromage', de: 'Tomaten und käse', es: 'Tomate y queso' }, image: IMG_PIZZA_CHEESE }
    ]
  },
  {
    id: 'pizzas-especiais',
    title: 'Pizzas Especiais',
    items: [
      { id: 'ps12', number: '12', name: 'Fenicia Especial', price: '12.00€', ingredients: { pt: 'Tomate, queijo, fiambre,cebola, lombo de porco, camarão e pimentos', en: 'Tomato, cheese, ham, onions, pork fillet, prawns and peppers', fr: 'Tomate, fromage, jambon, oignons, filet de porc, crevettes et piment vert', de: 'Tomaten, käse, schinken, zwiebeln, schweinefilet, garnelen und paprika', es: 'Tomate, queso, jamón, cebolla, solomillo, gambas e pimientos' }, image: IMG_PIZZA_FENICIA_ESP },
      { id: 'ps38', number: '38', name: 'Chicken pizza', price: '12.00€', ingredients: { pt: 'Tomate, queijo, frango, cogumelos, cebola, pimentos,natas e tomate fresco', en: 'Tomato, cheese, chicken, mushrooms, onions, peppers, cream and fresh tomato', fr: 'Tomate, fromage, poulet, champignons, oignon, piment vert, crème fraîche e tomate fraiche', de: 'Tomaten, käse, hühnchen, pilze, zwiebeln, paprika, sahne und frische tomaten', es: 'Tomate, queso, pollo, champiñones, cebolla, pimientos, nata y tomate fresco' }, image: IMG_PIZZA_FENICIA_ESP },
      { id: 'ps39', number: '39', name: 'Pizza Barco', price: '12.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, cebola, lombinho de porco, natas e molho', en: 'Tomato, cheese, mushrooms, onions, pork fillet, cream and kebab sauce', fr: 'Tomate, fromage, champignons, oignon, filet de porc, crème fraîche e sauce de kebab', de: 'Tomaten, käse, pilze, zwiebeln, schweinefilet, sahne und kebab-sauce', es: 'Tomate, queso, champiñones, cebolla, solomillo, nata y salsa kebab' }, image: IMG_PIZZA_BARCO },
      { id: 'ps41', number: '41', name: 'Jack Especial', price: '12.00€', ingredients: { pt: 'Tomate, queijo, atum, cebola, bacon, pimentos, milho', en: 'Tomato, cheese, tunafish, onions, bacon, peppers, sweet corn', fr: 'Tomate, fromage, thon, oignon, bacon, piment vert et maїs', de: 'Tomaten, käse, thunfisch, zwiebeln, speck, paprika, mais', es: 'Tomate, queso, atún, cebolla, bacon, pimientos y maíz' }, image: IMG_PIZZA_JACK_ESP },
      { id: 'ps50', number: '50', name: 'Black and White', price: '12.00€', ingredients: { pt: 'Tomate, queijo, lombinho de porco, carne kebab, cogumelos, tomate fresco, molho bearnesa e molho de kebab', en: 'Tomato, cheese, pork fillet, kebab meat, mushrooms, fresh tomato, bearnesa sauce and kebab sauce', fr: 'Tomate, fromage, filet de porc, viande de kebab, champignons, tomate fraîche, sauce bernaise et sauce de kebab', de: 'Tomaten, käse, schweinefilet, kebab-fleisch, pilze, frische tomaten, sauce béarnaise und kebab-sauce', es: 'Tomate, queso, solomillo, carne kebab, champiñones, tomate fresco, salsa bearnesa y salsa kebab' }, image: IMG_PIZZA_BLACK_WHITE },
      { id: 'ps58', number: '58', name: 'Tropical (empada)', price: '11.00€', ingredients: { pt: 'Queijo, banana, ananás, maça, canela, natas e açucar', en: 'Cheese, banana, pine-apple, apple cinnamon, cream and sugar', fr: 'Fromage, banana, ananas, pomme, cannelle, crème fraîche et sucre', de: 'Käse, banane, pinienapfel, apfel zimt, sahne und zucker', es: 'Queso, plátano, piña, manzana, canela, nata y azúcar' }, image: IMG_PIZZA_TROPICAL },
      { id: 'ps59', number: '59', name: 'Cheese Pizza', price: '11.00€', ingredients: { pt: '4- diferentes queijos', en: '4- different cheese', fr: '4-assortiment de 4 fromages', de: '4 veschiedene käse', es: '4- diferentes quesos' }, image: IMG_PIZZA_CHEESE }
    ]
  },
  {
    id: 'saladas',
    title: 'Saladas',
    items: [
      { id: 's35', number: '35', name: 'Salada Fenícia', price: '10.00€', ingredients: { pt: 'Alface, tomate, pepino, delicías, camarão, ovo e molho', en: 'Lettuce, tomato, cucumber, crab, prawns, egg and sauce', fr: 'Laitue, tomate, concombre, crevettes, surimi et sauce', de: 'Kopfsalat, tomate, gurke, krabbe, garnelen, ei und soße', es: 'Lechuga, tomate, pepino, surimi, gambas, huevo y salsa' }, image: IMG_SALADA_FENICIA },
      { id: 's36', number: '36', name: 'Salada Mista', price: '6.00€', ingredients: { pt: 'Alface, tomate, pepino, cebola e pimento', en: 'Lettuce, tomato, cucumber, onions and peppers', fr: 'Laitue, tomate, concombre, oignon e piment', de: 'Salat, tomaten, gurken, zwiebeln und paprika', es: 'Lechuga, tomate, pepino, cebolla y pimiento' }, image: IMG_SALADA_FENICIA }
    ]
  },
  {
    id: 'especialidades',
    title: 'Especialidades',
    items: [
      { id: 'sp25', number: '25', name: 'Kebab no Pão', price: '9.00€', ingredients: { pt: 'Alface, tomate, pepino, cebola, carne e molho de kebab', en: 'Lettuce, tomato, cucumber, onions, meat and kebab sauce', fr: 'Laitue, tomate fraîche concombre, oignon, viande de kebab et sauce de kebab', de: 'Salat, tomaten, gurken, zwiebeln, fleisch und kebab-sauce', es: 'Lechuga, tomate, pepino, cebolla, carne e salsa kebab' }, image: IMG_KEBAB_PÃO },
      { id: 'sp60', number: '60', name: 'Rolo de Kebab', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, cebola, carne e molho de kebab', en: 'Lettuce, tomato, cucumber, onions, meat and kebab sauce', fr: 'Laitue, tomate fraîche, concombre, oignon, viande de kebab et sauce de kebab', de: 'Salat, tomaten, gurken, zwiebeln, fleisch und kebab-sauce', es: 'Lechuga, tomate, pepino, cebolla, carne e salsa kebab' }, image: IMG_KEBAB_ROLO }
    ]
  }
];
