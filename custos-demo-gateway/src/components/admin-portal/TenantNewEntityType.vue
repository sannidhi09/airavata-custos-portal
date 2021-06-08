<template>
  <TenantHome title="New Entity Type" :breadcrumb-links="breadcrumbLinks">
    TBA
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";

export default {
  name: "TenantNewEntityType",
  components: {TenantHome},
  store: store,
  computed: {
    clientId() {
      return this.$route.params.clientId;
    },
    breadcrumbLinks() {
      return [
        {to: `/tenants/${this.clientId}/entity-types`, name: "Entity Types"},
        {to: `/tenants/${this.clientId}/entity-types/new`, name: "New"}
      ];
    }
  },
}
</script>

<style scoped>

</style>