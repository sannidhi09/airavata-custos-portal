<template>
  <TenantHome title="Groups">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/groups/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" size="sm" @click="navigate">Create New Group</b-button>
      </router-link>
    </template>
    <b-table-simple>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="group in groups" :key="group.groupId">
          <b-td>{{ group.name }}</b-td>
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
  name: "TenantGroups",
  store: store,
  components: {TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    groups() {
      return this.$store.getters["group/getGroups"]({clientId: this.clientId})
    }
  },
  mounted() {
    this.$store.dispatch("group/fetchGroups", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>