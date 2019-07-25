<template>
  <div>
    <ol>
      <!-- <li v-for="package in packagelist" :key="package.id"> -->

      <!-- </li> -->
    </ol>
  </div>
</template>
<script>
export default {
  name: "package-list",
  components: {},
  computed: {
    packagelist() {
      return this.$store.state.packagelist;
    }
  }
};
</script>