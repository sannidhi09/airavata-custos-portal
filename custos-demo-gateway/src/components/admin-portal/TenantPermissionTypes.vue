<template>
  <TenantHome title="Permission Types" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/permission-types/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Permission Type</b-button>
      </router-link>
    </template>
    <TableOverlayInfo :rows="5" :columns="3" :data="permissionTypes">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>ID</b-th>
            <b-th>Name</b-th>
            <b-th>Description</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="permissionType in permissionTypes" :key="permissionType.id">
            <b-td>{{ permissionType.id }}</b-td>
            <b-td>{{ permissionType.name }}</b-td>
            <b-td>{{ permissionType.description }}</b-td>
            <b-td>
              <b-button variant="link" size="sm">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </TableOverlayInfo>
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantPermissionTypes",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  computed: {
    clientId() {
      return this.$route.params.clientId;
    },
    permissionTypes() {
      return this.$store.getters["sharing/getPermissionTypes"]({clientId: this.clientId})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/permission-types`, name: "Permission Types"}];
    }
  },
  mounted() {
    this.$store.dispatch("sharing/fetchPermissionTypes", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>