<template>
  <div>
    <header  >

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
import Item from "./Item.vue";
import {mapGetters} from 'vuex';

export default {
  components: {
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
        'getItemsOnPage',
    ])
  }
}
</script>

<style module>
</style>