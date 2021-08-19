<template>
  <ul>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-3 col-lg-3 mb-3"
        v-for="size in state.sizes"
        v-bind:key="size"
      >
        <li>
          <label
            :class="size === selectedSize ? 'checked' : ''"
            @click="$emit('select-size', size)"
          >
            <img src="../assets/pizza.jpg" />
          </label>
        </li>
      </div>
    </div>
  </ul>
</template>

<script>
export default {
  name: "Search",
  props: {
    selectedSize: String,
  },
  setup() {
    const state = {
      sizes: ["Small", "Medium", "Large", "Extra large"],
      price: ["5", "10", "15", "20"],
    };
    return {
      state,
    };
  },
};
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
}

li {
  display: inline-block;
}

input[type="radio"][id^="cb"] {
  display: none;
}

label {
  border: 1px solid #fff;
  padding: 10px;
  display: block;
  position: relative;
  margin: 10px;
  cursor: pointer;
}

label:before {
  background-color: white;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  border: 1px solid grey;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}

/* label img {
  height: 100px;
  width: 100px;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
} */
label img {
  flex-grow: 1;
  width: auto;
  max-height: 250px;
  object-fit: contain;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}
.checked {
  border-color: #ddd;
}

.checked:before {
  content: "✓";
  background-color: grey;
  transform: scale(1);
}

.checked img {
  transform: scale(0.9);
  box-shadow: 0 0 5px #333;
  z-index: -1;
}
</style>
