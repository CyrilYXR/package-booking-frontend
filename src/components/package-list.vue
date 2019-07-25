<template>
  <div>
    <ol>
      <li v-for="packageData in packages" :key="packageData.id">
        {{packageData}}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  name: "package-list",
  components: {},
  created() {
    this.$store.dispatch('loadPackageList');
  },
  computed:{
    packages(){
      return this.$store.state.packages
    }
  },
  data(){
    return{
      // packages: this.$store.state.packages
    }
  },
};
</script>