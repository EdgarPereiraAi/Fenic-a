import { Category } from './types';

// URL de uma imagem ilustrativa que remete ao logótipo (Chef Italiano)
// Para usar o seu ficheiro exato, pode carregar no painel de admin ou renomear o seu ficheiro para 'logo.jpg'
const LOGO_URL = 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=400&q=80';

export const MENU_DATA: Category[] = [
  {
    id: 'entradas',
    title: 'Entradas',
    items: [
      { id: 'e00', number: '00', name: 'Pão', price: '1.20€', ingredients: { pt: 'Pão fresco', en: 'Bread', fr: 'Pain', de: 'Brot' }, image: LOGO_URL },
      { id: 'e01', number: '01', name: 'Pão com Alho', price: '3.50€', ingredients: { pt: 'Pão com alho', en: 'Bread with garlic', fr: 'Pain à l\'ail', de: 'Brot mit knoblauch' }, image: LOGO_URL },
      { id: 'e02', number: '02', name: 'Pão com Alho e Queijo', price: '4.50€', ingredients: { pt: 'Pão com alho e queijo', en: 'Bread with garlic and cheese', fr: 'Pain à l\'ail et fromage', de: 'Brot mit knoblauch und käse' }, image: LOGO_URL },
      { id: 'e03', number: '03', name: 'Pão com Alho, Queijo e Fiambre', price: '5.00€', ingredients: { pt: 'Pão com alho, queijo e fiambre', en: 'Bread with garlic, cheese and ham', fr: 'Pain à l\'ail, fromage et jambom', de: 'Brot mit knoblauch, käse und schinken' }, image: LOGO_URL },
      { id: 'e04', number: '04', name: 'Pão com alecrim', price: '3.00€', ingredients: { pt: 'Pão com alecrim', en: 'Rosemary bread', fr: 'Pain au romarin', de: 'Rosmarin-brot' }, image: LOGO_URL }
    ]
  },
  {
    id: 'massas',
    title: 'Massas e Empadas',
    items: [
      { id: 'm44', number: '44', name: 'Lasagne da Casa', price: '11.00€', ingredients: { pt: 'Lasanha da casa', en: 'House lasagne', fr: 'Lasagnes maison', de: 'Haus lasagne' }, image: LOGO_URL },
      { id: 'm45', number: '45', name: 'Esparguete à Bolonhesa', price: '10.00€', ingredients: { pt: 'Esparguete à bolonhesa', en: 'Bolognaise spaghetti', fr: 'Spagetthi à la bolognaise', de: 'Bolognaise spaghetti' }, image: LOGO_URL },
      { id: 'sp28', number: '28', name: 'Empadinha à bolonhesa', price: '9.50€', ingredients: { pt: 'Bolognaise meat-pie', en: 'Bolognaise meat-pie', fr: 'Petit tourte bolognaise', de: 'Bolognese-fleischpastete' }, image: LOGO_URL },
      { id: 'sp29', number: '29', name: 'Empadinha de carne kebab', price: '9.50€', ingredients: { pt: 'Kebab meat-pie', en: 'Kebab meat-pie', fr: 'Petit tourte à la viande de kebab', de: 'Kebab-fleischpastete' }, image: LOGO_URL },
      { id: 'sp17', number: '17', name: 'Ciao-Ciao', price: '11.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, cebola, lombo de porco e alho', en: 'Tomato, cheese, mushrooms, onions, pork fillet and garlic', fr: 'Tomate, fromage, champignons, oignon, filet de porc et ail', de: 'Tomaten, käse, pilze, zwiebeln, schweinefilet und Knoblauch' }, image: LOGO_URL }
    ]
  },
  {
    id: 'pizzas-classicas',
    title: 'Pizzas Clássicas',
    items: [
      { id: 'p01', number: '1', name: 'Capriciosa', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre e cogumelos', en: 'Tomato, cheese, ham and mushrooms', fr: 'Tomate, fromage, jambon et champignons', de: 'Tomaten, käse, schinken and pilze' }, image: LOGO_URL },
      { id: 'p02', number: '2', name: 'Milano', price: '9.50€', ingredients: { pt: 'Tomate, queijo, fiambre', en: 'Tomato, cheese and ham', fr: 'Tomate, fromage et jambon', de: 'Tomaten, käse und schinken' }, image: LOGO_URL },
      { id: 'p04', number: '4', name: 'Bolonhesa', price: '10.00€', ingredients: { pt: 'Tomate, queijo, cebola e bolonhesa', en: 'Tomato, chesse, onions and bolognaise sauce', fr: 'Tomate, fromage, oignons et sauce bolognaise', de: 'Tomaten, käse, zwiebeln und bolognese-sauce' }, image: LOGO_URL },
      { id: 'p06', number: '6', name: 'Amor', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre, delicias e camarão', en: 'Tomato, cheese, ham, crab and prawns', fr: 'Tomate, fromage, jambon, surimi et crevettes', de: 'Tomaten, käse, schinken, krabben und garnelen' }, image: LOGO_URL },
      { id: 'p07', number: '7', name: 'Sicilia', price: '10.00€', ingredients: { pt: 'Tomate, queijo, cogumelos e salami', en: 'Tomato, cheese, mushrooms and salami', fr: 'Tomate, fromage, champignons et salami', de: 'Tomaten, käse, pilze e salami' }, image: LOGO_URL },
      { id: 'p08', number: '8', name: 'Roma', price: '10.00€', ingredients: { pt: 'Tomate, queijo, atum e camarão', en: 'Tomato, cheese, tunafish and prawns', fr: 'Tomate, fromage, thon et crevettes', de: 'Tomaten, käse, thunfisch und garnelen' }, image: LOGO_URL },
      { id: 'p09', number: '9', name: 'Quatro estações', price: '11.00€', ingredients: { pt: 'Tomate, queijo, fiambre, cogumelos, camarão e mexilhão', en: 'Tomato, cheese, ham, prawns and mussels', fr: 'Tomate, fromage, jambom, champignons, crevettes et moules', de: 'Tomaten, Käse, Schinken, Garnelen und Muscheln' }, image: LOGO_URL },
      { id: 'p13', number: '13', name: 'Hawaii-havaiana', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre e ananás', en: 'Tomato, cheese, ham and pine-apple', fr: 'Tomate, fromage, jambon et ananas', de: 'Tomaten, käse, schinken and pinienapfel' }, image: LOGO_URL },
      { id: 'p15', number: '15', name: 'Americana', price: '11.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, pepperoni e camarão', en: 'Tomato, cheese, mushrooms, pepperoni and prawns', fr: 'Tomate, fromage, champignons, pepperoni et crevettes', de: 'Tomaten, käse, pilze, peperoni and garnelen' }, image: LOGO_URL },
      { id: 'p16', number: '16', name: 'Jamaica', price: '11.00€', ingredients: { pt: 'Tomate, queijo, fiambre, cogumelos e camarão', en: 'Tomato, cheese, ham, mushrooms e prawns', fr: 'Tomate, fromage, jambon, champignons et crevettes', de: 'Tomaten, käse, schinken, pilze and garnelen' }, image: LOGO_URL },
      { id: 'p18', number: '18', name: 'Disco', price: '11.00€', ingredients: { pt: 'Tomate, queijo, fiambre, bolonhesa e camarão', en: 'Tomato, cheese, ham, bolognaise sauce and prawns', fr: 'Tomate, fromage, jambon, sauce bolognaise et crevettes', de: 'Tomaten, käse, schinken, bolognese-sauce und garnelen' }, image: LOGO_URL },
      { id: 'p19', number: '19', name: 'Vegetariana', price: '10.00€', ingredients: { pt: 'Tomate, queijo, cebola, cogumelos, ananás, banana e pimento', en: 'Tomato, cheese, onions, mushrooms, pine-apple, banana and peppers', fr: 'Tomate, fromage, oignon, champignons, ananas, banane et piment vert', de: 'Tomaten, käse, zwiebeln, pilze, pinienapfel, bananen und paprika' }, image: LOGO_URL },
      { id: 'p20', number: '20', name: 'Margarita', price: '9.50€', ingredients: { pt: 'Tomate, queijo', en: 'Tomato and cheese', fr: 'Tomate et fromage', de: 'Tomaten und käse' }, image: LOGO_URL },
      { id: 'p23', number: '23', name: 'Algarvia', price: '10.00€', ingredients: { pt: 'Tomate, queijo, fiambre, cebola e bacon', en: 'Tomato, cheese, ham, onions and bacon', fr: 'Tomate, fromage, jambon, oignons et bacon', de: 'Tomaten, käse, schinken, zwiebeln und speck' }, image: LOGO_URL }
    ]
  },
  {
    id: 'pizzas-especiais',
    title: 'Pizzas Especiais',
    items: [
      { id: 'ps12', number: '12', name: 'Fenícia Especial', price: '12.00€', ingredients: { pt: 'Tomate, queijo, fiambre,cebola, lombo de porco, camarão e pimentos', en: 'Tomato, cheese, ham, onions, pork fillet, prawns and peppers', fr: 'Tomate, fromage, jambon, oignons, filet de porc, crevettes et piment vert', de: 'Tomaten, käse, schinken, zwiebeln, schweinefilet, garnelen und paprika' }, image: LOGO_URL },
      { id: 'ps22', number: '22', name: 'Tavira Especial', price: '12.00€', ingredients: { pt: 'Tomate, queijo, fiambre, carne kebab e molho', en: 'Tomato, cheese, ham, kebab meat and sauce', fr: 'Tomate, fromage, jambon, viande de kebab et sauce', de: 'Tomaten, käse, schinken, kebab fleisch und soße' }, image: LOGO_URL },
      { id: 'ps24', number: '24', name: 'Babilon Especial', price: '12.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, cebola, carne kebab e molho', en: 'Tomato, cheese, mushrooms, onions, kebab meat and sauce', fr: 'Tomate, fromage, champignons, oignons, viande de kebab et sauce', de: 'Tomaten, käse, pilze, zwiebeln, kebab fleisch und soße' }, image: LOGO_URL },
      { id: 'ps38', number: '38', name: 'Chicken pizza', price: '12.00€', ingredients: { pt: 'Tomate, queijo, frango, cogumelos, cebola, pimentos,natas e tomate fresco', en: 'Tomato, cheese, chicken, mushrooms, onions, peppers, cream and fresh tomato', fr: 'Tomate, fromage, poulet, champignons, oignon, piment vert, crème fraîche et tomate fraiche', de: 'Tomaten, käse, hühnchen, pilze, zwiebeln, paprika, sahne und frische tomaten' }, image: LOGO_URL },
      { id: 'ps39', number: '39', name: 'Pizza Barco', price: '12.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, cebola, lombinho de porco, natas e molho', en: 'Tomato, cheese, mushrooms, onions, pork fillet, cream and kebab sauce', fr: 'Tomate, fromage, champignons, oignon, filet de porc, crème fraîche e sauce de kebab', de: 'Tomaten, käse, pilze, zwiebeln, schweinefilet, sahne und kebab-sauce' }, image: LOGO_URL },
      { id: 'ps40', number: '40', name: 'Portuguesa', price: '12.00€', ingredients: { pt: 'Tomate, queijo, cogumelos, cebola, bacon, anchovas e ovo', en: 'Tomato, cheese, mushrooms, onions, bacon, anchovy and egg', fr: 'Tomate, fromage, champignons, oignons, bacon, anchois et oeuf', de: 'Tomate, käse, pilze, zwiebeln, speck, sardelle und ei' }, image: LOGO_URL },
      { id: 'ps41', number: '41', name: 'Jack Especial', price: '12.00€', ingredients: { pt: 'Tomate, queijo, atum, cebola, bacon, pimentos, milho', en: 'Tomato, cheese, tunafish, onions, bacon, peppers, sweet corn', fr: 'Tomate, fromage, thon, oignon, bacon, piment vert et maїs', de: 'Tomaten, käse, thunfisch, zwiebeln, speck, paprika, mais' }, image: LOGO_URL },
      { id: 'ps50', number: '50', name: 'Black and White', price: '12.00€', ingredients: { pt: 'Tomate, queijo, lombinho de porco, carne kebab, cogumelos, tomate fresco, molho bearnesa e molho de kebab', en: 'Tomato, cheese, pork fillet, kebab meat, mushrooms, fresh tomato, bearnesa sauce and kebab sauce', fr: 'Tomate, fromage, filet de porc, viande de kebab, champignons, tomate fraîche, sauce bernaise et sauce de kebab', de: 'Tomaten, käse, schweinefilet, kebab-fleisch, pilze, frische tomaten, sauce béarnaise und kebab-sauce' }, image: LOGO_URL },
      { id: 'ps51', number: '51', name: 'Jakob Voador', price: '12.00€', ingredients: { pt: 'Tomate, queijo, frango, cogumelos, amendoins, caril e molho de kebab', en: 'Tomato, cheese, chicken, mushrooms, peanuts, curry and kebab sauce', fr: 'Tomate, fromage, poulet, champignons, cacahuètes, curry et sauce de kebab', de: 'Tomaten, käse, hühnchen, pilze, erdnüsse, curry und kebab-sauce' }, image: LOGO_URL },
      { id: 'ps52', number: '52', name: 'Marinheiro', price: '12.00€', ingredients: { pt: 'Tomate, queijo, bolonhesa, bacon, ananás, pimentos, camarão e molho de kebab', en: 'Tomato, cheese, bolognaise, bacon, pine-apple, peppers, prawns and kebab sauce', fr: 'Tomate, fromage, bolognaise, bacon, ananas, piment verd, crevettes et sauce de kebab', de: 'Tomaten, käse, bolognese, speck, ananas, paprika, garnelen und kebab-sauce' }, image: LOGO_URL },
      { id: 'ps55', number: '55', name: 'Frango', price: '12.00€', ingredients: { pt: 'Tomate, queijo, frango, ananás, caril e molho de kebab', en: 'Tomato, cheese, chicken, pine-apple, curry and kebab sauce', fr: 'Tomate, fromage, poulet, ananas, curry et sauce de kebab', de: 'Tomaten, käse, hühnchen, ananas, curry und kebab-sauce' }, image: LOGO_URL },
      { id: 'ps57', number: '57', name: 'Formula 1', price: '12.00€', ingredients: { pt: 'Tomate, queijo, fiambre, carne kebab, bacon, cebola, tomate fresco e molho de kebab', en: 'Tomato, cheese, ham, kebab meat, bacon, onions, fresh tomato and kebab sauce', fr: 'Tomate, fromage, jambon, viande de kebab, oignon, tomate fraîche e sauce de kebab', de: 'Tomaten, käse, schinken, kebab-fleisch, speck, zwiebeln, frische tomaten und kebab-sauce' }, image: LOGO_URL },
      { id: 'ps58', number: '58', name: 'Tropical (empada)', price: '11.00€', ingredients: { pt: 'Queijo, banana, ananás, maça, canela, natas e açucar', en: 'Cheese, banana, pine-apple, apple cinnamon, cream and sugar', fr: 'Fromage, banana, ananas, pomme, cannelle, crème fraîche et sucre', de: 'Käse, banane, pinienapfel, apfel zimt, sahne und zucker' }, image: LOGO_URL },
      { id: 'ps59', number: '59', name: 'Cheese Pizza', price: '11.00€', ingredients: { pt: '4- diferentes queijos', en: '4- different cheese', fr: '4-assortiment de 4 fromages', de: '4 verschiedene käse' }, image: LOGO_URL }
    ]
  },
  {
    id: 'saladas',
    title: 'Saladas',
    items: [
      { id: 's30', number: '30', name: 'Salada Americana', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, fiambre, ananás e molho', en: 'Lettuce, tomato, cucumber, ham, pine-apple and sauce', fr: 'Laitue, tomate, concombre, jambon, ananas et sauce', de: 'Salat, tomate, gurke, schinken, kieferapfel und soße' }, image: LOGO_URL },
      { id: 's31', number: '31', name: 'Salada Portuguesa', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, cebola, queijo mozzarella, azeitonas e molho', en: 'Lettuce, tomato, cucumber, onions, cheese mozzarella, olives and sauce', fr: 'Laitue, tomate, concombre, oignon, fromage, olives et sauce', de: 'Salat, tomate, gurke, zwiebeln, käsemozzarella, oliven und soße' }, image: LOGO_URL },
      { id: 's32', number: '32', name: 'Salada Tavira', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, cebola, atum, ovo e molho', en: 'Lettuce, tomato, cucumber, onions, tunafish, egg and sauce', fr: 'Laitue, tomato, concombre, oignon, thon, oeuf et sauce', de: 'Salat, tomaten, gurken, zwiebeln, thunfisch, ei und soße' }, image: LOGO_URL },
      { id: 's33', number: '33', name: 'Salada Vegetariana', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, cebola, cogumelos, milho, pimentos, azeitonas e molho', en: 'Lettuce, tomato, cucumber, onions, mushrooms, sweet corn, peppers, olives and sauce', fr: 'Laitue, tomate, concombre, oignons, champignons, maїs, piment vert, olives et sauce', de: 'Kopfsalat, tomate, gurke, zwiebeln, pilze, süßer mais, pfeffer, oliven und soße' }, image: LOGO_URL },
      { id: 's34', number: '34', name: 'Salada de Galinha', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, galinha, milho, pimentos e molho', en: 'Lettuce, tomato, cucumber, chicken, sweet corn, peppers and sauce', fr: 'Laitue, tomate, concombre, poulet, maїs, piment vert et sauce', de: 'Kopfsalat, tomate, gurke, huhn, süßer mais, pfeffer und soße' }, image: LOGO_URL },
      { id: 's35', number: '35', name: 'Salada Fenícia', price: '10.00€', ingredients: { pt: 'Alface, tomate, pepino, delicías, camarão, ovo e molho', en: 'Lettuce, tomato, cucumber, crab, prawns, egg and sauce', fr: 'Laitue, tomate, concombre, crevettes, surimi et sauce', de: 'Kopfsalat, tomate, gurke, krabbe, garnelen, ei und soße' }, image: LOGO_URL },
      { id: 's36', number: '36', name: 'Salada Mista', price: '6.00€', ingredients: { pt: 'Alface, tomate, pepino, cebola e pimento', en: 'Lettuce, tomato, cucumber, onions and peppers', fr: 'Laitue, tomate, concombre, oignon et piment', de: 'Salat, tomaten, gurken, zwiebeln und paprika' }, image: LOGO_URL }
    ]
  },
  {
    id: 'especialidades',
    title: 'Especialidades',
    items: [
      { id: 'sp25', number: '25', name: 'Kebab no Pão', price: '9.00€', ingredients: { pt: 'Alface, tomate, pepino, cebola, carne e molho de kebab', en: 'Lettuce, tomato, cucumber, onions, meat and kebab sauce', fr: 'Laitue, tomate fraîche concombre, oignon, viande de kebab et sauce de kebab', de: 'Salat, tomaten, gurken, zwiebeln, fleisch und kebab-sauce' }, image: LOGO_URL },
      { id: 'sp60', number: '60', name: 'Rolo de Kebab', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, cebola, carne e molho de kebab', en: 'Lettuce, tomato, cucumber, onions, meat and kebab sauce', fr: 'Laitue, tomate fraîche, concombre, oignon, viande de kebab et sauce de kebab', de: 'Salat, tomaten, gurken, zwiebeln, fleisch und kebab-sauce' }, image: LOGO_URL },
      { id: 'sp61', number: '61', name: 'Rolo de Frango', price: '9.50€', ingredients: { pt: 'Alface, tomate, pepino, cebola, frango e molho de kebab', en: 'Lettuce, tomato, cucumber, onions, chicken and kebab sauce', fr: 'Laitue, tomate fraîche, concombre, oignon, poulet et sauce de kebab', de: 'Salat, tomaten, gurken, zwiebeln, hühnchen und kebab-sauce' }, image: LOGO_URL }
    ]
  }
];