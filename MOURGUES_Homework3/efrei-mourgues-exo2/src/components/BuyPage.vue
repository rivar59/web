<template>

    <div class="basket" v-bind:class="{ gr: product > 10, r:product <= 10}">
        <h2 class="bText">Your basket : {{$store.state.basket}} items</h2>
        <h2 class="bText" v-if="$store.state.total > 0">Total price : {{$store.state.total}} €</h2>
        <h2 class="bText" v-else>Your basket is empty</h2>
        <h2 class="bText">Products remaining : {{$store.state.product}}</h2>
    </div>

    <div class="container">
        <div class="vente" v-for="item in $store.state.items" :key="item.message">
            <div v-bind:class="{ gr: item.number > 10, r:item.number < 4, bordred : item.price <= 500, bordgreen : item.price >= 2000}">
                <img class="imagevente" :src="item.url"><br>
                <p>Name : {{item.name}}</p>
                <p>Price : {{item.price}} €</p>
                <p>Number of items left : {{item.number}}</p>
                <p>Number of items : {{item.max - item.number}}</p>
                <button class="button" v-if="item.number!=0" @click="add(item)">+</button>
                <button class="button" v-if="item.number!=item.max" @click="removeItem(item)">-</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
    }
  },
  props: {
    msg: String
  },
  methods:{
    add(item){
        this.$store.commit("addBasketItem", item);
    },
    removeItem(item){
        this.$store.commit("removeItem", item);
    }
  }
}
</script>

<style>

.imagevente{
    width: 100%;
    height: 400px;
}

.vente {
    border: solid;
    border-color: grey;
}

.container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
    padding: 0 10px;
}

.gr{
    background-color: green;
}

.r{
    background-color: red;
}

.bordgreen{
    
    border:solid;
    border-color: green;
}

.bordred{
    border:solid;
    border-color: red;
}
</style>