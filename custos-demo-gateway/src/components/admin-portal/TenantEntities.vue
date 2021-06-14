<template>
  <TenantHome title="Entities" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/entities/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Entity</b-button>
      </router-link>
    </template>
    <table-overlay-info :rows="5" :columns="1" :data="entities">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Type</b-th>
            <b-th>Description</b-th>
            <b-th>Created</b-th>
            <b-th>Last Updated</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(entity, entityIndex) in entities" :key="entity.entityId">
            <b-td>
              <router-link :to="`/tenants/${clientId}/entities/${entity.entityId}`" v-slot="{href, navigate}">
                <b-link :href="href" v-on:click="navigate">{{ entity.name }}</b-link>
              </router-link>
            </b-td>
            <b-td>{{ entity.type }}</b-td>
            <b-td>{{ entity.description }}</b-td>
            <b-td>{{ entity.createdAt }}</b-td>
            <b-td>{{ entity.updatedAt }}</b-td>
            <b-td>
              <b-button variant="link" size="sm" v-b-modal="`modal-select-users-or-groups-${entityIndex}`">
                <b-icon icon="share"></b-icon>
              </b-button>
              <modal-select-users-or-groups :client-id="clientId"
                                            :modal-id="`modal-select-users-or-groups-${entityIndex}`"
                                            title="Select Users" v-on:users="onShareToUsers(entity, $event)"
                                            v-on:groups="onShareToGroups(entity, $event)"/>
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
import ModalSelectUsersOrGroups from "@/components/admin-portal/modals/modal-select-users-or-groups";

export default {
  name: "TenantEntities",
  store: store,
  components: {ModalSelectUsersOrGroups, TableOverlayInfo, TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    entities() {
      return this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/entities`, name: "Entities"}];
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"];
    }
  },
  methods: {
    refreshData() {
      this.$store.dispatch("entity/fetchEntities", {clientId: this.clientId, ownerId: this.currentUsername});
    },
    onShareToGroups({entityId}, groups) {
      // alert("onShareToGroups 2 " + JSON.stringify(arguments));
      // // return function (groups) {
      // alert("onShareToGroups")
      this.$store.dispatch("sharing/share", {
        clientId: this.clientId,
        entityId,
        permissionTypeId: "VIEWER",
        groupIds: groups.map(({groupId}) => groupId),
        usernames: []
      });
      // };
    },
    onShareToUsers({entityId}, users) {
      // alert("onShareToUsers 1 " + JSON.stringify(arguments))
      // // return function (users) {
      // alert("onShareToUsers")
      this.$store.dispatch("sharing/share", {
        clientId: this.clientId,
        entityId,
        permissionTypeId: "VIEWER",
        groupIds: [],
        usernames: users.map(({username}) => username)
      });
      // }
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>