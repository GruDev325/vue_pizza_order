<template>
  <div class="container mb-3">
    <h1>Pizza</h1>
    <h4 class="mb-3">Pizza Total Price: ${{ state.totalPrice }}</h4>
    <div class="mb-3">
      <button type="button" class="btn btn-primary" @click="save">
        Purchase
      </button>
    </div>
    <Search v-model:selectedSize="state.selectedSize" @select-size="selectSize" />
    <Ingredients
      v-bind:ingredients="state.ingredients"
      @remove-ingredient="removeIngredient"
      @get-recipes="getRecipes"
    />
    <IngredientsPreview
      :ingredients-preview="state.ingredientsPreview"
      @add-ingredient="addIngredient"
    />
    <Recipes :recipes="state.recipes" @preview-recipe="previewRecipe" />
    <Modal v-if="!!state.recipe" :title="state.recipe?.title" @close="closeRecipe">
      <RecipeContent :orderId="String(state.recipe?.id)" :apiKey="state.apiKey" />
    </Modal>
  </div>
</template>

<script>
/*eslint-disable */

import Search from "@/components/Search.vue";
import Ingredients from "@/components/Ingredients";
import IngredientsPreview from "@/components/IngredientsPreview";
import Modal from "@/components/Modal";
import Recipes from "@/components/Recipes";
import RecipeContent from "@/components/RecipeContent";
import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router'


export default {
  name: "Home",
  components: {
    Search,
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
      selectedSize: "",
      ingredients: [],
      ingredientsPreview: computed(() => store.state.ingredientsPreview),
      recipes: [],
      recipe: null,
      totalPrice: 0,
    });

    if (typeof orderId != "undefined") {
      if (orderId >= store.state.orders.length) {
        router.push("/home");
      } else {
        state.ingredients = computed(() => store.state.orders[orderId].ingredients ? store.state.orders[orderId].ingredients : [])
      }
    }

    // let timer = '';
    watchEffect(() => {
      // getIngredients();
      if (state.selectedSize) {
        console.log('[[[[[[[[[[]]]]]]]]]]')
      };
      // else state.ingredientsPreview = [];
      state.totalPrice = 0;
      if (state.ingredients.length > 0) {
        state.ingredients.map((item) => {
          state.totalPrice += item.price;
        });
        console.log(state.totalPrice);
      }
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
      state.ingredients = state.ingredients.filter((i) => i.id !== ingredientId);
    };

    const clearSearch = () => {
      state.search = "";
      state.ingredientsPreview = [];
    };

    const previewRecipe = (recipe) => {
      state.recipe = recipe;
    };

    const closeRecipe = () => {
      state.recipe = null;
    };

    const save = () => {
      // state.orders.      
      store.commit('addOrder', {
        id: 1,
        title: 'asdfadf',
        totalPrice: state.totalPrice,
      })
      router.push("/");
    };

    return {
      state,
      addIngredient,
      removeIngredient,
      clearSearch,
      selectSize,
      previewRecipe,
      closeRecipe,
      save,
    };
  },
};
</script>

<style>
img {
  max-width: 100%;
}
</style>
