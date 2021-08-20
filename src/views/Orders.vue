<template>
  <div id="nav">
    <router-link class="disable-underline" :to="{ name: 'home' }">
      <button type="button" class="button btn btn-outline-success btn-block">
        <h1>Buy a new pizza !</h1>
      </button>
    </router-link>
    <hr />
  </div>
  <div class="container text-left">
    <div class="row" v-if="state.orders.length">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
        v-for="order in state.orders"
        v-bind:key="order.id"
      >
        <div class="card" :style="{ height: '100%' }">
          <div class="card-header">
            <h5 class="card-title">
              {{ order.title }}
            </h5>
          </div>
          <img :src="order.image" class="card-img-top" :alt="order.title" />
          <div class="card-body">
            <h6 class="card-title">Total Price: {{ order.totalPrice }}</h6>
            <h6 class="card-title">Name: {{ state.customer.name }}</h6>
            <h6 class="card-title">Phone: {{ state.customer.phone }}</h6>
          </div>
          <div class="card-footer">
            <router-link
              class="btn btn-info"
              :to="{ name: 'home_edit', params: { id: order.id } }"
              >Edit</router-link
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
      customer: computed(() => store.state.customer),
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
.button {
  position: relative;
  background-color: #4caf50;
  border: none;
  font-size: 28px;
  color: #ffffff;
  padding: 20px;
  width: 100%;
  text-align: center;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

.button:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
.disable-underline:hover {
  text-decoration: none !important;
}
</style>
