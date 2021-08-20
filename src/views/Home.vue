<template>
  <div class="container mb-3">
    <h1>Pizza</h1>
    <h4 class="mb-3">Pizza Total Price: ${{ state.totalPrice }}</h4>
    <div class="mb-3">
      <button type="button" class="btn btn-primary" @click="openModal">
        Purchase
      </button>
      <Modal v-if="!!state.showModal" title="Customer Info" @close="closeModal" @on-Submit="onSubmit">
        <div class="form-group">
          <label for="usr">Name:</label>
          <input type="text" class="form-control" id="usr" />
        </div>
        <div class="form-group">
          <label for="addr">Address:</label>
          <input type="text" class="form-control" id="addr" />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="text" class="form-control" id="phone" />
        </div>
      </Modal>
    </div>
    <Pizza
      v-model:selectedSize="state.selectedSize"
      @select-size="selectSize"
    />
    <Ingredients
      v-bind:ingredients="state.ingredients"
      @remove-ingredient="removeIngredient"
      @get-recipes="getRecipes"
    />
    <IngredientsPreview
      :ingredients-preview="state.ingredientsPreview"
      @add-ingredient="addIngredient"
    />    
  </div>
</template>

<script>
/*eslint-disable */

import Pizza from "@/components/Pizza.vue";
import Ingredients from "@/components/Ingredients";
import IngredientsPreview from "@/components/IngredientsPreview";
import Modal from "@/components/Modal";
import Recipes from "@/components/Recipes";
import RecipeContent from "@/components/RecipeContent";
import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import image from "../assets/pizza.jpg";

export default {
  name: "Home",
  components: {
    Pizza,
    Ingredients,
    IngredientsPreview,
    Modal,
    Recipes,
    RecipeContent,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const orderId = route.params.id;
    const store = useStore();
    /*eslint-disable */
    const state = reactive({
      selectedSize: 0,
      ingredients: [],
      ingredientsPreview: computed(() => store.state.ingredientsPreview),
      recipes: [],
      recipe: null,
      totalPrice: 0,
      type: "",
      showModal: false,
    });

    if (typeof orderId != "undefined") {
      if (orderId >= store.state.orders.length) {
        router.push("/home");
      } else {
        state.ingredients = computed(() =>
          store.state.orders[orderId].ingredients
            ? store.state.orders[orderId].ingredients
            : []
        );
      }
    }

    // let timer = '';
    watchEffect(() => {
      // getIngredients();
      if (state.selectedSize) {
        console.log(state.selectedSize);
      }
      // else state.ingredientsPreview = [];
      state.totalPrice = 0;
      if (state.ingredients.length > 0) {
        state.ingredients.map((item) => {
          state.totalPrice += item.price;
        });
      }
      switch (state.selectedSize) {
        case 5:
          state.type = "Small Pizza";
          break;
        case 10:
          state.type = "Medium Pizza";
          break;
        case 15:
          state.type = "Large Pizza";
          break;
        case 20:
          state.type = "Extra large Pizza";
          break;

        default:
      }

      state.totalPrice += state.selectedSize;
    });

    const addIngredient = (ingredient) => {
      if (!state.ingredients.some((i) => i.id === ingredient.id)) {
        state.ingredients.push(ingredient);
      }
    };

    const selectSize = (size) => {
      state.selectedSize = size;
    };

    const removeIngredient = (ingredientId) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== ingredientId
      );
    };

    const clearPizza = () => {
      state.pizza = "";
      state.ingredientsPreview = [];
    };

    const previewRecipe = (recipe) => {
      state.recipe = recipe;
    };

    const openModal = () => {
      state.showModal = true;
    };

    const closeModal = () => {      
      state.showModal = false;      
    };

    const onSubmit = () => {
      store.commit("addOrder", {
        id: 1,
        title: state.type,
        image: image,
        totalPrice: state.totalPrice,
      });
      state.showModal = false;
      router.push("/");
    };

    return {
      state,
      addIngredient,
      removeIngredient,
      clearPizza,
      selectSize,
      previewRecipe,
      closeModal,
      openModal,
      onSubmit,
    };
  },
};
</script>

<style>
img {
  max-width: 100%;
}
</style>
