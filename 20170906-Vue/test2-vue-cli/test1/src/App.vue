<template>
    <div id="app">
        <img src="./assets/logo.png">

        <ul>
            <li>
                <router-link to="/home">Go to home</router-link>
            </li>
            <li>
                <router-link to="/foo">Go to Foo</router-link>
            </li>
            <li>
                <router-link to="/bar">Go to Bar</router-link>
            </li>
        </ul>

        <router-view></router-view>

    </div>
</template>

<script>


    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
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
</style>
