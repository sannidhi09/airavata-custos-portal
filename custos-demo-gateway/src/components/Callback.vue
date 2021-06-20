<template>
  <p></p>
</template>

<script>

import store from "../new-service/store";
import {custosService} from "@/new-service/store/util/custos.util";

import config from "@/config";

const clientRolePatient = config.value('clientRolePatient');

export default {
  name: "Callback",
  store: store,
  methods: {
    async authenticate() {
      let code = this.$route.query.code
      let params = {code: code};
      await this.$store.dispatch('auth/authenticateUsingCode', params)
      await this.$store.dispatch("user/addRolesToUser", {
        clientId: custosService.clientId,
        username: this.$store.getters["auth/currentUsername"],
        realmRoles: ["Tenant Requester", clientRolePatient],
        clientLevel: false
      });
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