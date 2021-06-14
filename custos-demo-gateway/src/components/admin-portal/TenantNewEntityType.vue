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
    },
    isFormValid() {
      let _isFormValid = true;
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        _isFormValid = _isFormValid && this.isValid[this.inputFieldsList[i]];
      }

      return _isFormValid;
    },
  },
  methods: {
    makeFormVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
  }
}
</script>

<style scoped>

</style>