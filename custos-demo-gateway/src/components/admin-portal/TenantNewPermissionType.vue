<template>
  <TenantHome title="New Permission Types" :breadcrumb-links="breadcrumbLinks">
    TBA
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";

export default {
  name: "TenantNewPermissionType",
  components: {TenantHome},
  store: store,
  computed: {
    clientId() {
      return this.$route.params.clientId;
    },
    breadcrumbLinks() {
      return [
        {to: `/tenants/${this.clientId}/permission-types`, name: "Permission Types"},
        {to: `/tenants/${this.clientId}/permission-types/new`, name: "New"}
      ];
    }
  }
}
</script>

<style scoped>

</style>