import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);


const Home = { template: '<div>home</div>' };
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };



const routes = [
    { path: '/Home', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});

new Vue({
    router,
    template: App,
    render: h => h(App)
}).$mount('#app');