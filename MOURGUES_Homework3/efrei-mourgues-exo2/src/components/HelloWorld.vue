<template>
  <div class="image-list">
    <div class="it">
      <img class="logo" src="https://thumbs.dreamstime.com/b/camera-photography-icon-logo-design-slr-vector-161991763.jpg" alt="logo">
    </div>
    <div class="item">
      <img class="picture" src="https://shop.panasonic.com/sites/default/files/styles/product_series_header_x2_2400_640/public/2021-11/cameras.jpg?itok=kzORlG29" alt="canon770D">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      active: false,
      pointeur: 0,
      images : [
        {url: "https://i1.adis.ws/i/canon/3011C001AA_EOS-4000D-EF-S18-55-III-BK/3011c001aa_eos-4000d-ef-s18-55-iii-bk?w=1500&bg=gray95"},
        {url: "https://m.media-amazon.com/images/I/810ofEfVQbL._AC_SL1500_.jpg"},
        {url: "https://1.img-dpreview.com/files/p/E~C0x93S1280x720T1200x675~articles/1040131653/EF-lenses-sm.jpeg"}
      ]
    }
  },
  props: {
    msg: String
  },
  methods:{
    ChangerImage(){
      document.getElementById("masuperimage").src = this.images[this.pointeur];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.picture{
  width: 100%;
}

.image-list{
  width: 100%;
}

.logo-div{
  width: 10%;
  position:center;
}
</style>
