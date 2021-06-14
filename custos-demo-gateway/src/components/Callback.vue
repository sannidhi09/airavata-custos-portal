<template>
  <p></p>
</template>

<script>

import store from "../new-service/store";

export default {
  name: "Callback",
  store: store,
  methods: {
    async authenticate() {
      let code = this.$route.query.code
      let params = {code: code};
      await this.$store.dispatch('auth/authenticateUsingCode', params)

    }
  },
  async mounted() {
    await this.authenticate();
    await this.$router.push('/');
  }
}
</script>

<style scoped>

</style>