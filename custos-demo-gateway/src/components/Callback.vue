<template>
  <p></p>
</template>

<script>

import store from "../new-service/store";

export default {
  name: "Callback",
  store: store,
  data: function () {
    return {
      username: "",
      password: "",
      custosId: null,
      custosSec: null,
      redirectURI: null,
      tokenEndpoint: null
    }
  },

  methods: {
    async authenticate() {
      let code = this.$route.query.code
      let params = {code: code};
      await this.$store.dispatch('auth/authenticateUsingCode', params)

    }
  },


  async mounted() {
    // this.custosId = config.value('clientId')
    // this.custosSec = config.value('clientSec')
    // this.redirectURI = config.value('redirectURI')
    // this.tokenEndpoint = "https://custos.scigap.org/apiserver/identity-management/v1.0.0/token"

    await this.authenticate();

    await this.$router.push('/');
  }
}
</script>

<style scoped>

</style>