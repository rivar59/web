<template>
  <div class="helloWorld">
    <h1>Shopping List App</h1>
    <button @click="toogle()" v-if="!active">Add Item</button><br>
    <button @click="toogle()" v-if="active">Cancel</button><br>
    <span v-if="active">
     <input type="text" id="fname" name="fname"><br>
     <input type="checkbox" id="scales" name="scales">
     <label for="scales">High priority</label><br>
     <button @click="enter()" v-if="active">Save Item</button><br><br>
    
    </span>



    <div v-for="item in list" :key="item.message" id="tab">
    <div class="item" @click="bar(item)" v-bind:class="{ priority: item.is_high, drop: item.is_drop }">{{ item.message }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      active: false,
      list : [
        {message: "20 cups", is_drop: false, is_high: true},
        {message: "2 boards games", is_drop: false, is_high: false},
        {message: "10 party hats", is_drop: false, is_high: false}
      ]
    }
  },
  props: {
    msgTO: {
      type: String,
      default: 'Alexandre'
    }
  },
  methods:{
    toogle(){
      this.active = !this.active
    },
    enter(){
      var inp = document.getElementById("fname").value;
      console.log(inp);
      if (inp == "")
        return;
      
      this.list.unshift({ message: inp , is_drop: false, is_high: document.getElementById('scales').checked});
      
    },
    bar(item){
      item.is_drop = !item.is_drop;
    }
  },
  setInterval(function(){ 
        self.mainImageSrc = self.images[Math.floor(Math.random()*self.images.length)].image;
    }, 5000);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.helloWorld .greeting{
color: blue;
}
.helloWorld .greetingTo{
color: red;
}

.drop{
  text-decoration: line-through;
}

.priority{
  color: red;
}


</style>
