<template>
  <TenantHome title="Users" :breadcrumb-links="breadcrumbLinks">
    <table-overlay-info :rows="5" :columns="2" :data="users">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Email</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="user in users" :key="user.username">
            <b-td>{{ user.username }}</b-td>
            <b-td>{{ user.email }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <!--    <b-pagination-->
      <!--        size="sm"-->
      <!--        class="float-right"-->
      <!--        v-model="activePage"-->
      <!--        :total-rows="tenantsPagination.totalRows"-->
      <!--        :per-page="tenantsPagination.perPage"-->
      <!--        aria-controls="my-table"-->
      <!--        :value="activePage"-->
      <!--    ></b-pagination>-->
    </table-overlay-info>
  </TenantHome>
</template>

<script>
import store from "../../new-service/store"
import TenantHome from "@/components/admin-portal/TenantHome";
import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantUsers",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    users() {
      return this.$store.getters["user/getUsers"]({clientId: this.clientId})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/users`, name: "Users"}];
    },
  },
  beforeMount() {
    this.$store.dispatch("user/fetchUsers", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>