<template>
  <TenantHome title="Group" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <b-button variant="primary" v-b-modal="`modal-select-users-or-groups`">Add Members</b-button>
      <modal-select-users-or-groups :client-id="clientId" modal-id="modal-select-users-or-groups" title="Select Users"
                                    v-on:users="onAddNewUsers"/>
    </template>
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
            <b-td>
              <b-button variant="link" v-on:click="onRemoveUser(user)">
                <b-icon icon="trash"/>
              </b-button>
            </b-td>
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
import ModalSelectUsersOrGroups from "@/components/admin-portal/modals/modal-select-users-or-groups";

export default {
  name: "TenantGroup",
  components: {ModalSelectUsersOrGroups, TableOverlayInfo, TenantHome},
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
  methods: {
    async onAddNewUsers(newUsers) {
      await Promise.all(newUsers.map(newUser => {
        return this.$store.dispatch("group/addUserToGroup", {
          groupId: this.groupId,
          username: newUser.username,
          membershipType: "MEMBER"
        })
      }));
      this.refreshData();
    },
    async onRemoveUser({username}) {
      await this.$store.dispatch("group/removeUserFromGroup", {groupId: this.groupId, username});
      this.refreshData();
    },
    refreshData() {
      this.$store.dispatch("user/fetchUsers", {groupId: this.groupId});
      this.$store.dispatch("group/fetchGroup", {groupId: this.groupId});
    }
  },
  beforeMount() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>