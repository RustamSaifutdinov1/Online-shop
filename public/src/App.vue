<template>
  <div>
    <header :class="[$style.header]">
      <div :class="[$style.header_logo]">
        MyAwesomeSop
      </div>
      <Cart />
    </header>
    <div :class="[$style.main]">
      <h1>Список товаров:</h1>
      <div :class="[$style.main_list]">
        <Item
            v-for="id in getItemsOnPage"
            :key="id"
            :id="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./components/Item.vue";
import {mapGetters,mapActions} from 'vuex';
import Cart from "./components/Cart.vue";

export default {
  components: {
    Cart,
    Item,
  },
  data(){
    return{
      items:[]
    }
  },
  methods:{
    ...mapActions('goods', [
      'requestData',
    ])
  },
  computed:{
    ...mapGetters('goods',[
        'getItemsOnPage', 'getItemsInCart',
    ])
  },
  mounted () {
    this.requestData(1)
  }
}
</script>

<style module lang="scss">
:global(*) {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: rgb(27, 39, 123);

  &_logo {
    font-size: 22px;
    color: #fff;
  }
}

.main {
  margin: auto;
  &_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>