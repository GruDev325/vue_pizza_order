<template>
  <ul class="list-group list-group-horizontal mb-3" v-if="ingredients.length">
    <li
      class="list-group-item p-2"
      v-for="ingredient in ingredients"
      :key="ingredient.id"
    >
      {{ ingredient.name }} | ${{ ingredient.price }}
      <span
        class="badge badge-danger badge-pill"
        @click="$emit('remove-ingredient', ingredient.id)"
        >x</span
      >
    </li>
    
  </ul>
</template>

<script>
export default {
  props: {
    ingredients: Object,
  },
};
</script>

<style></style>
