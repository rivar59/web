<template>
    <div>
        <div v-for="item in $store.state.items" :key="item.message">
            <div class="alllist" v-bind:class="{hide: item.number == item.max}">
                <div class="buyingcontainer">
                    <div>
                        <img class="basketimage" :src="item.url">
                    </div>
                        <p class="buyinginfo">Name : {{item.name}}</p>
                        <p class="buyinginfo">Price for unit: {{item.price}} €</p>
                        <p class="buyinginfo">Number of items : {{item.max -item.number}}</p>
                </div>
            </div>
        </div>
        <h1>Total : {{$store.state.total}} €</h1>
    </div>
</template>


export default {

    name: 'Basket'
}

<style>

.hide{
    display: none;
}

.basketimage{
    width:100%;
    flex: 1 0 20%;
}

.buyinginfo{
    flex: 1 0 30%;
}

.infoachat{
    display: inline-block;
    color: black;
}

.buyingcontainer{
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.alllist{
    border:solid;
}



</style>