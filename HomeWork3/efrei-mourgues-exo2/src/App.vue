<template>
  <nav>
    
  <img class="logotop" src="https://thumbs.dreamstime.com/b/camera-photography-icon-logo-design-slr-vector-161991763.jpg" alt="logo" style="position:absolute">
    <router-link class="link" to="/">Home </router-link>
    <router-link class="link" to="/BuyPage">Buy page </router-link>
    <router-link class="link" to="/basket">Basket</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: blue;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.link{
  color: red;
}

.logotop{
  width: 6%;    
  margin: 0;
  padding: 0;
  position: absolute;
  top: 8px;
  left: 0px;
}


</style>
