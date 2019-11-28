<template>
  <div id="app">
    <ul ref="ull">
      <!-- 这种情况，第2、3个节点会重新生成 -->
      <!-- <li v-for="(list) in lists" :key="list">{{list.value}}</li> -->
      <!-- 这种情况，所有节点均被缓存，只是2、3节点被换了位置而已 -->
      <li v-for="(list) in lists" :key="list.id">{{list.value}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        // 用对象来测试，这个列表
        lists: {
          a: {id: 1, value: 'value1'},
          b: {id: 2, value: 'value2'},
          c: {id: 3, value: 'value3'},
        }
      }
    },
    mounted() {
      let ul = this.$refs.ull;
      let lis = ul.getElementsByTagName('li');

      // 每个节点添加一个方便辨识的私有属性
      lis[0].setAttribute('flag', '1');
      lis[1].setAttribute('flag', '2');
      lis[2].setAttribute('flag', '3');

      // 3秒之后，再查看dom，发现规律
      setTimeout(() => {
        this.lists.c = {id: 2, value: 'value2'}
        this.lists.b = {id: 3, value: 'value3'}
      }, 3000);
    }
  }
</script>