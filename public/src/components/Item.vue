<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.name]">{{ currentItem.name }}</div>
    <div :class="[$style.price]">{{ currentItem.price }}</div>
    <Button @mySuperEvent="onBuyClick">Купить</Button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {mapActions} from "vuex";
import Button from "./Button.vue";

export default {
  components:{
    Button,
  },
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
    ...mapActions('goods',[
        "addInCart"
    ]),
    onBuyClick(){
      this.addInCart(this.id)
    },
  }
}
</script>

<style module lang="scss">
.wrapper {
  background: #eeeeee;
  margin: 10px;
  min-width: 200px;
  padding: 20px;
}

.name, .price {
  color: black;
  padding: 4px;
}
</style>