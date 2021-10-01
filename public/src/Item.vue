<template>
  <div>
    {{currentItem.name}}
  </div>
  <div>
    {{currentItem.price}}
  </div>
  <button @click="onBuyClick">Купить</button>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props:{
    id:String,
  },
  computed:{
    ...mapGetters('goods',[
        "getData"
    ]),
    currentItem(){
      return this.getData[this.id] ||{}
    }
  },
  methods:{
    onBuyClick(){

    },
  }
}
</script>

<style module>

</style>