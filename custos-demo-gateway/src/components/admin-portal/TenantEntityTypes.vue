<template>
  <TenantHome title="Entity Types" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/entity-types/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Entity Type</b-button>
      </router-link>
    </template>
    <table-overlay-info :rows="5" :columns="3" :data="entityTypes">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>ID</b-th>
            <b-th>Name</b-th>
            <b-th>Description</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="entityType in entityTypes" :key="entityType.id">
            <b-td>{{ entityType.id }}</b-td>
            <b-td>{{ entityType.name }}</b-td>
            <b-td>{{ entityType.description }}</b-td>
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
  name: "TenantEntityTypes",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    entityTypes() {
      return this.$store.getters["sharing/getEntityTypes"]({clientId: this.clientId})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/entity-types`, name: "Entity Types"}];
    }
  },
  mounted() {
    this.$store.dispatch("sharing/fetchEntityTypes", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>