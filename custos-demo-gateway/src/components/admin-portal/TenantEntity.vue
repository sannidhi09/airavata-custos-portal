<template>
  <TenantHome :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <b-overlay :show="processingAddNewUsers" rounded spinner-small spinner-variant="primary" class="d-inline-block">
        <b-button variant="primary" v-b-modal="`modal-select-users-or-entities`">Share</b-button>
      </b-overlay>
      <modal-select-users-or-groups :client-id="clientId" modal-id="modal-select-users-or-entities"
                                      title="Select Users"
                                      v-on:users="onAddNewUsers"/>
    </template>
    {{entity}}
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
import ModalSelectUsersOrGroups from "./modals/modal-select-users-or-groups";

export default {
  name: "TenantEntity",
  components: {ModalSelectUsersOrGroups, TenantHome},
  store: store,
  data() {
    return {
      processingRemoveUser: {},
      processingAddNewUsers: false,
      errors: []
    };
  },
  computed: {
    title() {
      if (this.entity) {
        return this.entity.name;
      } else {
        return "";
      }
    },
    clientId() {
      return this.$route.params.clientId;
    },
    entityId() {
      return this.$route.params.entityId;
    },
    entity() {
      return this.$store.getters["entity/getEntity"]({entityId: this.entityId})
    },
    users() {
      return this.$store.getters["user/getUsers"]({entityId: this.entityId, clientId: this.clientId});
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: `/tenants/${this.clientId}/entities`, name: "Entities"}];

      if (this.entity) {
        _breadcrumbLinks.push({to: `/tenants/${this.clientId}/entities/${this.entityId}`, name: this.entity.name});
      }

      return _breadcrumbLinks;
    }
  },
  methods: {
    async onAddNewUsers(newUsers) {
      this.processingAddNewUsers = true;
      await Promise.all(newUsers.map(newUser => {
        return this.$store.dispatch("entity/addUserToEntity", {
          entityId: this.entityId,
          username: newUser.username,
          membershipType: "MEMBER"
        }).catch(error => {
          this.errors.push({
            title: `Unknown error when adding the user '${newUser.username}'`,
            source: error, variant: "danger"
          });
        });
      }));
      this.refreshData();

      this.processingAddNewUsers = false;
    },
    async onRemoveUser({username}) {
      this.processingRemoveUser = {...this.processingRemoveUser, [username]: true};
      try {
        await this.$store.dispatch("entity/removeUserFromEntity", {entityId: this.entityId, username});
      } catch (error) {
        this.errors.push({
          title: `Unknown error when removing the user '${username}'`,
          source: error, variant: "danger"
        });
      }
      this.refreshData();
      this.processingRemoveUser = {...this.processingRemoveUser, [username]: false};
    },
    refreshData() {
      this.$store.dispatch("user/fetchUsers", {entityId: this.entityId, clientId: this.clientId});
      this.$store.dispatch("entity/fetchEntity", {entityId: this.entityId});
    }
  },
  beforeMount() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>