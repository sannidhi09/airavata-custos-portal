<template>
  <TenantHome title="Group" :breadcrumb-links="breadcrumbLinks">
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
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantGroup",
  components: {TableOverlayInfo, TenantHome},
  store: store,
  computed: {
    clientId() {
      return this.$route.params.clientId;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    group() {
      return this.$store.getters["group/getGroup"]({groupId: this.groupId})
    },
    users() {
      return this.$store.getters["user/getUsers"]({groupId: this.groupId});
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: `/tenants/${this.clientId}/groups`, name: "Groups"}];

      if (this.group) {
        _breadcrumbLinks.push({to: `/tenants/${this.clientId}/groups/${this.groupId}`, name: this.group.name});
      }

      return _breadcrumbLinks;
    }
  },
  beforeMount() {
    this.$store.dispatch("group/fetchGroup", {groupId: this.groupId});
    this.$store.dispatch("user/fetchUsers", {groupId: this.groupId});
  }
}
</script>

<style scoped>

</style>