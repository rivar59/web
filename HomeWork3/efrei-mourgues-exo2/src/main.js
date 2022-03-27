import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            basket:0,
            total:0,
            product:81,
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
                    number: 10,
                    max: 10,
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
                    number: 20,
                    max: 20,
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
                    number: 15,
                    max: 15,
                    price: 14000,
                    url: "https://i1.adis.ws/i/canon/3329C005_EF-600mm-f4L-IS-III-USM_06/3329c005_ef-600mm-f4l-is-iii-usm_06?w=800&bg=gray95"
                }
            ]
        }
    },
    mutations: {
        addBasketItem(state, item) {
            item.number--;
            state.basket++;
            state.product--;
            state.total = state.total + item.price;
        },
        removeItem(state, item){
            item.number++;
            state.basket--;
            state.total = state.total - item.price;
            state.product++;
        }
    }
});




createApp(App).use(router).use(store).mount('#app')
