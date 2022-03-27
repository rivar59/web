<template>

    <div class="basket" v-bind:class="{ gr: product > 10, r:product <= 10}">
        <h2 class="bText">Your basket : {{basket}} items</h2>
        <h2 class="bText" v-if="total > 0">Total price : {{total}} €</h2>
        <h2 class="bText" v-else>Your basket is empty</h2>
        <h2 class="bText">Products remaining : {{product}}</h2>
    </div>

    <div class="container">
        <div class="vente" v-for="item in items" :key="item.message">
            <div v-bind:class="{ gr: item.number > 10, r:item.number < 4, bordred : item.price <= 500, bordgreen : item.price >= 2000}">
                <img class="imagevente" :src="item.url"><br>
                <p>Name : {{item.name}}</p>
                <p>Price : {{item.price}} €</p>
                <p>Number of items : {{item.number}}</p>
                <button class="button" v-if="item.number!=0" @click="add(item)">+</button>
                <button class="button" v-if="item.number!=12" @click="removeItem(item)">-</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
        basket:0,
        total:0,
        product:80,
        items : [
          {
              name: "Canon 5D",
              number: 12,
              max: 12,
              price: 2000,
              url: "https://u.cyfrowe.pl/600x0/2/e/EOS5DMarkIVFRA_611939925.jpg"
          },
          {
              name: "Canon 2000D",
              number: 12,
              max: 12,
              price: 500,
              url: "https://i1.adis.ws/i/canon/2728C004_EOS-2000D-Black-Body-01/2728c004_eos-2000d-black-body-01?w=1500&bg=gray95"
          },
          {
              name: "Canon EOS R",
              number: 12,
              max: 12,
              price: 1500,
              url: "https://image.ceneostatic.pl/data/products/69409261/i-canon-eos-r-body.jpg"
          },
          {
              name: "Canon EF 50mm f/1.8L",
              number: 12,
              max: 12,
              price: 130,
              url: "https://image.ceneostatic.pl/data/products/37898886/i-canon-ef-50mm-f-1-8-stm-0570c002.jpg"
          },
          {
              name: "Canon EF 100mm f/2.8 Macro USM",
              number: 12,
              max: 12,
              price: 1200,
              url: "https://i1.adis.ws/i/canon/3554B005_EF_100mm_f2.8L_IS_USM_Macro_1/ef_100mm_f2-8l_is_usm_macro_1?w=420&bg=white&fmt=jpg,"
          },
          {
              name: "Canon EF 600mm f/4L IS III USM",
              number: 12,
              max: 12,
              price: 14000,
              url: "https://i1.adis.ws/i/canon/3329C005_EF-600mm-f4L-IS-III-USM_06/3329c005_ef-600mm-f4l-is-iii-usm_06?w=800&bg=gray95"
          }
      ],
      taken: [

      ]
    }
  },
  props: {
    msg: String
  },
  methods:{
    add(item){
        this.basket++;
        item.number--;
        this.total = this.total + item.price;
        this.product--;
        this.taken.add(item);
    },
    removeItem(item){
        this.basket--;
        item.number++;
        this.total = this.total - item.price;
        this.product++;
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