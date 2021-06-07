<template>
  <TenantHome :title="title" :breadcrumb-links="breadcrumbLinks">
    TBA
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
// import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantUser",
  components: {TenantHome},
  store: store,
  computed: {
    title() {
      if (this.user) {
        return `${this.user.firstName}, ${this.user.lastName}`;
      } else {
        return "";
      }
    },
    clientId() {
      return this.$route.params.clientId;
    },
    username() {
      return this.$route.params.username;
    },
    user() {
      return this.$store.getters["user/getUser"]({username: this.username})
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: `/tenants/${this.clientId}/users`, name: "Users"}];
      if (this.user) {
        _breadcrumbLinks.push({
          to: `/tenants/${this.clientId}/users/${this.username}`,
          name: this.title
        });
      }

      return _breadcrumbLinks;
    },
  },
}
</script>

<style scoped>

</style>