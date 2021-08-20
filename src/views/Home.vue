<template>
  <div class="container mb-3">
    <h1>Pizza</h1>
    <h4 class="mb-3">Pizza Total Price: ${{ state.totalPrice }}</h4>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="onSubmit('purchase')"
      >
        Purchase
      </button>
      <hr />
      <Modal
        v-if="!!state.showModal"
        title="Customer Info"
        @close="closeModal"
        @on-Submit="onSubmit"
      >
        <div class="form-group">
          <label for="usr">Name:</label>
          <input
            type="text"
            class="form-control"
            id="usr"
            v-model="state.customer.name"
          />
        </div>
        <div class="form-group">
          <label for="addr">Address:</label>
          <input
            type="text"
            class="form-control"
            id="addr"
            v-model="state.customer.addr"
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="state.customer.phone"
          />
        </div>
      </Modal>
    </div>
    <Pizza
      v-model:selectedSize="state.selectedSize"
      @select-size="selectSize"
    />
    <hr />
    <h2>Toppings</h2>
    <hr />
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
import { getCurrentInstance, computed, reactive, watchEffect } from "vue";
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
    const app = getCurrentInstance();
    const properties = app.appContext.config.globalProperties;
    const toast = properties.$toast;
    /*eslint-disable */
    const state = reactive({
      selectedSize: 0,
      ingredients: [],
      orders: computed(() => store.state.orders),
      ingredientsPreview: computed(() => store.state.ingredientsPreview),
      customer: computed(() => store.state.customer),
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
        state.ingredients = state.orders.length
          ? state.orders[orderId].ingredients
          : [];
        state.selectedSize = state.orders.length
          ? state.orders[orderId].selectedSize
          : 0;
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
    let counter = 0;
    const addIngredient = (ingredient) => {
      //  Topping Counts
      if (state.ingredients.length > 6) {
        toast.warning(
          `You can't choose anymore. You have already choosed 6 toppings.`,
          {
            // override the global option
            position: "bottom",
          }
        );
        return;
      }
      //  Check topping is already choosed.
      if (state.ingredients.some((i) => i.id === ingredient.id)) {
        toast.warning(`You have already choosed this topping.`, {
          // override the global option
          position: "bottom",
        });
        return;
      }

      if (
        state.ingredients.some(
          (i) =>
            (i.name === "Bacon" && ingredient.name == "Mozzarella") ||
            (i.name === "Mozzarella" && ingredient.name == "Bacon")
        )
      ) {
        toast.warning(`You can't choose  ${ingredient.name}.`, {
          // override the global option
          position: "bottom",
        });
        return;
      }

      counter += 1;
      if (counter == 2) {
        counter = 0;
        toast.info(`You earned a Olive topping as a free.`, {
          // override the global option
          position: "bottom",
        });
        state.ingredients.push({
          id: 1,
          image: image,
          name: "Olives",
          price: 1,
        });
      }
      state.ingredients.push(ingredient);
      toast.success("Order placed.", {
        position: "bottom",
      });
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

    const onSubmit = (action) => {
      if (state.customer.name) {
        state.showModal = true;
        if (action != "purchase") {
          store.commit("addCustomer", state.customer);
        }
        if (typeof orderId != "undefined") {
          store.commit("updateOrder", {
            id: orderId,
            title: state.type,
            image: image,
            selectedSize: state.selectedSize,
            ingredients: state.ingredients,
            totalPrice: state.totalPrice,
          });
        } else {
          store.commit("addOrder", {
            id: state.orders.length,
            title: state.type,
            image: image,
            selectedSize: state.selectedSize,
            ingredients: state.ingredients,
            totalPrice: state.totalPrice,
          });
        }

        router.push("/");
      } else {
        state.showModal = true;
      }
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
  mounted() {
    this.toast = this.$toast;
  },
};
</script>

<style>
img {
  max-width: 100%;
}
</style>
