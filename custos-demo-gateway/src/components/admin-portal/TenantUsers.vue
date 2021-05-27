<template>
  <TenantHome title="Users">
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
  </TenantHome>
</template>

<script>
import store from "../../new-service/store"
import TenantHome from "@/components/admin-portal/TenantHome";

export default {
  name: "TenantUsers",
  store: store,
  components: {TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    users() {
      return this.$store.getters["user/getUsers"]({clientId: this.clientId})
    }
  },
  beforeMount() {
    this.$store.dispatch("user/fetchUsers", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>