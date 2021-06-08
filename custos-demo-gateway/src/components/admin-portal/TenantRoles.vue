<template>
  <TenantHome title="Roles">
    <table-overlay-info :rows="5" :columns="4" :data="roles">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Description</b-th>
            <b-th>Composite</b-th>
            <b-th>Type</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="role in roles" :key="role.tenantRoleId">
            <b-td>{{ role.name }}</b-td>
            <b-td>{{ role.description }}</b-td>
            <b-td>{{ role.composite }}</b-td>
            <b-td>TENANT</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </table-overlay-info>
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantRoles",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    roles() {
      return this.$store.getters["tenant/getTenantRoles"]({clientId: this.clientId})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/roles`, name: "Roles"}];
    }
  },
  mounted() {
    this.$store.dispatch("tenant/fetchTenantRoles", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>