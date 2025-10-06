// lib/products.js

// Minimal catalog with hidden store detail; add more later.
export const productCatalog = {
  books: {
    '0-2': [
      { id:'b02-1', title:'Livro de tecido', img:'https://via.placeholder.com/600x400.jpg?text=Livro', url:'https://www.amazon.com/' },
      { id:'b02-2', title:'Primeiros contrastes', img:'https://via.placeholder.com/600x400.jpg?text=Contrastes', url:'https://shopee.com/' }
    ],
    '3-4': [
      { id:'b34-1', title:'Histórias em figuras', img:'https://via.placeholder.com/600x400.jpg?text=Figuras', url:'https://www.amazon.com/' },
      { id:'b34-2', title:'Cores e formas', img:'https://via.placeholder.com/600x400.jpg?text=Cores', url:'https://shopee.com/' }
    ],
    '5-7': [
      { id:'b57-1', title:'Ciência divertida', img:'https://via.placeholder.com/600x400.jpg?text=Ci%C3%AAncia', url:'https://www.amazon.com/' }
    ],
    '8+': [
      { id:'b8-1', title:'Maker kids', img:'https://via.placeholder.com/600x400.jpg?text=Maker', url:'https://shopee.com/' }
    ]
  },
  toys: {
    '0-2': [
      { id:'t02-1', title:'Argolas de encaixe', img:'https://via.placeholder.com/600x400.jpg?text=Argolas', url:'https://shopee.com/' }
    ],
    '3-4': [
      { id:'t34-1', title:'Blocos grandes', img:'https://via.placeholder.com/600x400.jpg?text=Blocos', url:'https://www.amazon.com/' }
    ],
    '5-7': [
      { id:'t57-1', title:'LEGO básico', img:'https://via.placeholder.com/600x400.jpg?text=LEGO', url:'https://www.amazon.com/' }
    ],
    '8+': [
      { id:'t8-1', title:'Kit de eletrônica', img:'https://via.placeholder.com/600x400.jpg?text=Eletr%C3%B4nica', url:'https://shopee.com/' }
    ]
  }
};
