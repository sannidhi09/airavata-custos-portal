<template>
  <TenantHome title="Entities" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/entities/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Entity</b-button>
      </router-link>
    </template>
    <table-overlay-info :rows="5" :columns="1" :data="entities">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Entity ID</b-th>
            <b-th>Name</b-th>
            <b-th>Type</b-th>
            <b-th>Description</b-th>
            <b-th>Created</b-th>
            <b-th>Last Updated</b-th>
          </b-tr>
        </b-thead>
        <template v-for="(entity, entityIndex) in entities">
          <table-overlay-body :key="entity.entityId" :entity="entity" :entityIndex="entityIndex" @refresh-data="refreshData"></table-overlay-body>
        </template>
        <table-overlay-body :entities="entities" @refresh-data="refreshData"></table-overlay-body>
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
import store from "../../store"
import TenantHome from "./TenantHome";
import TableOverlayInfo from "../overlay/table-overlay-info";
// import ModalShareEntity from "../modals/modal-share-entity";
// import ButtonOverlay from "../overlay/button-overlay";
// import ButtonCopy from "../button/button-copy";
import TableOverlayBody from "../overlay/table-overlay-body";

export default {
  name: "TenantEntities",
  store: store,
  components: {
    // ButtonCopy, ButtonOverlay, ModalShareEntity, 
    TableOverlayInfo, TenantHome, TableOverlayBody},
  data() {
    return {
      processingDelete: {},
      expandEntities: {},
      errors: []
    }
  },
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    entities() {
      return this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername})==undefined?
        this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername}):
        (this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername})).filter((entity)=>{return !entity.parentId;});
    },
    allEntities() {
      return this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername});
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/entities`, name: "Entities"}];
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"];
    }
  },
  methods: {
    childEntities(entityId){
      return this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername})==undefined?
        this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername}):
        this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername}).filter((entity)=>{return entity.parentId==entityId;});
    },
    refreshData() {
      this.$store.dispatch("entity/fetchEntities", {clientId: this.clientId, ownerId: this.currentUsername});
    },
    onClickExpand(entityId) {
      this.expandEntities = { ...this.expandEntities, [entityId]: this.expandEntities[entityId]?false:true};
    },
    async onClickDelete({entityId, name, description, type, ownerId}) {
      this.processingDelete = {...this.processingDelete, [entityId]: true};

      try {
        await this.$store.dispatch("entity/deleteEntity", {
          clientId: this.clientId,
          entityId,
          name,
          description,
          type,
          ownerId
        });
        this.refreshData();
      } catch (error) {
        this.errors.push({
          title: `Unknown error when deleting the entity '${entityId}'.`,
          source: error, variant: "danger"
        });
      }

      this.processingDelete = {...this.processingDelete, [entityId]: false};
    }
  },
  mounted() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>