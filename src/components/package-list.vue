<template>
  <div>
    <ol>
      <li v-for="packageData in filterPackages" :key="packageData.id">
        {{packageData}}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  name: "package-list",
  components: {},
  mounted() {
    this.$store.dispatch('loadPackageList');
  },
  
};
</script>