<template>
  <div>
    <header>
      <Cart/>
    </header>
    <div>
      <h1 >Список Товаров</h1>
      <div>
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
import {mapGetters} from 'vuex';
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
  },
  computed:{
    ...mapGetters('goods',[
        'getItemsOnPage', 'getItemsInCart',
    ])
  }
}
</script>

<style module>
</style>