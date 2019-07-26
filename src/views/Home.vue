<template>
  <div class="home">
    <div>
      <a-row>
        <a-col :span="14">菜鸟驿站</a-col>
        <a-col :span="2">
          <a-button @click="loadAllPackages()">All</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="filterByStatus(1)">已预约</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="filterByStatus(2)">已取件</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="filterByStatus(0)">未预约</a-button>
        </a-col>
        <a-col :span="2">
          <a-button>+添加</a-button> 
        </a-col>
      </a-row>
    </div>
    <div>
      <table>
      <tr>
        <td>运单号</td>
        <td>收件人</td>
        <td>电话</td>
        <td>状态</td>
        <td>预约时间</td>
        <td>操作</td>
      </tr>
      <tr v-for="packageData in packages" :key="packageData.id">
        <td>{{packageData.id}}</td>
        <td>{{packageData.name}}</td>
        <td>{{packageData.phone}}</td>
        <td>{{packageData.status}}</td>
        <td>{{packageData.reserveTime}}</td>
      </tr>  
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  created() {
    this.$store.dispatch('loadPackageList');
  },
  computed:{
    packages(){
      return this.$store.state.packages
    }
  },
  methods:{
    loadAllPackages(){
      this.$store.dispatch('loadPackageList');
    },
    filterByStatus(status) {
      this.$store.dispatch('filterByStatus', status)
    }
  }
}
</script>
