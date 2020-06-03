
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import HomeApp from './components/home-app/home-app.vue'
import './style/main.scss';


 var App = new Vue({ 
    el: '#app', 
    // router, 
    // render: h => h(App),
    data: {
        message : 'hello'
    },
    components: {
        HomeApp
    }
});

Vue.component('home-app', HomeApp);

Vue.use(VueAxios, axios);

Vue.config.devtools = true;