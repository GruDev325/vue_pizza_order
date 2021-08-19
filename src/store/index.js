import { createStore } from 'vuex';
import image from "../assets/pizza.jpg"

const state = {
  theme: 'light',
  ingredientsPreview: [
    {
      id: 0,
      image: image,
      name: "Mushrooms",
      price: 5
    },
    {
      id: 1,
      image: image,
      name: "Olives",
      price: 5
    },
    {
      id: 2,
      image: image,
      name: "Tomato",
      price: 5
    },
    {
      id: 3,
      image: image,
      name: "Tona",
      price: 5
    },
    {
      id: 4,
      image: image,
      name: "Pineapple",
      price: 5
    },
    {
      id: 5,
      image: image,
      name: "Seafood",
      price: 5
    },
    {
      id: 6,
      image: image,
      name: "Pepperoni",
      price: 5
    },
    {
      id: 7,
      image: image,
      name: "Bacon",
      price: 5
    },
    {
      id: 8,
      image: image,
      name: "Onion",
      price: 5
    },
    {
      id: 9,
      image: image,
      name: "Mozzarella",
      price: 5
    }
  ],
  orders: [{
    id: 0,
    title: 'Yammy Pizza',
    image: image,
    ingredients: [
      {
        id: 1,
        image: image,
        name: "Mushrooms",
        price: 5
      },
    ],
    totalPrice: 0
  }]
};

const mutations = {
  toggleTheme(state) {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
  },
  addIngredient: (state, payload) => {
    state.ingredients.push(payload);
  },
  addOrder: (state, payload) => {
    state.orders.push(payload);
  },
};

export default createStore({
  state,
  mutations,
});
