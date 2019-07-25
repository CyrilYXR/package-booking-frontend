<template>
  <div class="home">
    <div>
      <a-row>
        <a-col :span="9">菜鸟驿站</a-col>
        <a-col :span="1">
          <a-button>All</a-button>
        </a-col>
        <a-col :span="1">
          <a-button>已预约</a-button>
        </a-col>
        <a-col :span="1">
          <a-button>已取件</a-button>
        </a-col>
        <a-col :span="1">
          <a-button>未预约</a-button>
        </a-col>
        <a-col :span="1">
          <a-button>+添加</a-button>
        </a-col>
      </a-row>
    </div>
    <div>
      <packagelist></packagelist>
    </div>
  </div>
</template>

<script>
import packagelist from '../components/package-list.vue'
export default {
  name: "home",
  components: {
    packagelist
  },
  methods: {
    
  }
};
</script>
