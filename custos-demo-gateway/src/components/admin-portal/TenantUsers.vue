<template>
  <TenantHome title="Users" :breadcrumb-links="breadcrumbLinks">
    <table-overlay-info :rows="5" :columns="6" :data="users">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Email</b-th>
            <b-th>Client Roles</b-th>
            <b-th>Tenant Roles</b-th>
            <b-th>Status</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="user in users" :key="user.username">
            <b-td>
              <router-link :to="`/tenants/${clientId}/users/${user.username}`" v-slot="{href, navigate}">
                <b-link :href="href" v-on:click="navigate">{{ user.username }}</b-link>
              </router-link>
            </b-td>
            <b-td>{{ user.email }}</b-td>
            <b-td>
              {{ user.clientRoles.join(", ") }}
              <!--              <b-form-tags v-model="user.clientRoles" separator=" " no-tag-remove no-outer-focus-->
              <!--                           ignore-input-focus-selector=""></b-form-tags>-->
            </b-td>
            <b-td>
              {{ user.realmRoles.join(", ") }}
              <!--              <b-button variant="link-secondary" size="sm" v-for="role in user.realmRoles" :key="role" href="#">-->
              <!--                {{ role }}-->
              <!--              </b-button>-->
            </b-td>
            <b-td>
              <b-tag v-if="user.status === 'ACTIVE'" no-remove variant="success">Enabled</b-tag>
              <b-tag v-else-if="user.status === 'PENDING_CONFIRMATION'" no-remove variant="warning">Disabled</b-tag>
            </b-td>
            <b-td>
              <b-button variant="outline-primary" size="sm" v-if="user.status === 'PENDING_CONFIRMATION'"
                        v-on:click="enableUser(user)">
                Enable
              </b-button>
              <b-button variant="outline-primary" size="sm" v-if="user.status === 'ACTIVE'"
                        v-on:click="disableUser(user)">
                Disable
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
  methods: {
    enableUser({username}) {
      this.$store.dispatch("user/enableUser", {username});
    },
    disableUser({username}) {
      this.$store.dispatch("user/disableUser", {username});
    }
  },
  beforeMount() {
    this.$store.dispatch("user/fetchUsers", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>