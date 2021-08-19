<template>
  <div id="nav">
    <router-link :to="{ name: 'home' }">Buy a new pizza !</router-link>
  </div>
  <div class="container text-left">
    <div class="row" v-if="state.orders.length">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
        v-for="order in state.orders"
        v-bind:key="order.id"
      >
        <div class="card" :style="{ height: '100%' }">
          <img :src="order.image" class="card-img-top" :alt="order.title" />
          <div class="card-body">
            <h5 class="card-title">
              {{ order.title }} | Total Price: {{ order.totalPrice }}
            </h5>
          </div>
          <div class="card-body">
            <!-- <button
              type="button"
              class="btn btn-link"
              @click="$emit('edit-order', order)"
            >
              Edit
            </button> -->
            <router-link
              class="btn btn-link"
              :to="{ name: 'home_edit', params: { id: order.id } }"
              >Edit</router-link
            >
            <router-link
              class="btn btn-link"
              :to="{ name: 'home_edit', params: { id: order.id } }"
              >Open</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */

import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "Orders",
  components: {},
  setup() {
    const store = useStore();
    const state = reactive({
      orders: computed(() => store.state.orders),
    });
    
    console.log(state.orders);
    // let timer = '';
    watchEffect(() => {});

    return {
      state,
    };
  },
};
</script>


<style lang="scss">
.card {
  align-content: space-between;

  .card-body {
    align-content: flex-end;
    flex: inherit;
  }

  img {
    flex-grow: 1;
    width: auto;
    max-height: 250px;
    object-fit: contain;
  }
}
</style>
