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
        <b-tbody v-for="(entity, entityIndex) in entities" :key="entity.entityId">
            <b-tr>
              <b-td>
                <b-button variant="link" size="sm" v-on:click="onClickExpand(entity.entityId)" v-b-tooltip.hover :title="expandEntities[entity.entityId]?'Colapse':'Expand'">
                  <b-icon :icon="expandEntities[entity.entityId]?'chevron-up':'chevron-down'"></b-icon>
                </b-button>
                <router-link :to="`/tenants/${clientId}/entities/${entity.entityId}`" v-slot="{href, navigate}">
                  <b-link :href="href" v-on:click="navigate">{{ entity.entityId }}</b-link>
                </router-link>
                <button-copy :value="entity.entityId"/>
              </b-td>
              <b-td>{{ entity.name }}</b-td>
              <b-td>{{ entity.type }}</b-td>
              <b-td>{{ entity.description }}</b-td>
              <b-td>{{ entity.createdAt }}</b-td>
              <b-td>{{ entity.updatedAt }}</b-td>
              <b-td>
                <router-link :to="`/tenants/${clientId}/${entity.entityId}/new`" v-slot="{href, navigate}" tag="">
                  <b-button variant="link" size="sm" v-on:click="navigate" v-b-tooltip.hover title="Create Child Entity">
                    <b-icon icon="file"></b-icon>
                  </b-button>
                </router-link>
                <b-button variant="link" size="sm" v-b-modal="`modal-select-users-or-groups-${entityIndex}`"
                          v-b-tooltip.hover title="Share">
                  <span>{{ entity.sharedCount }}</span>&nbsp;
                  <b-icon icon="share"></b-icon>
                </b-button>
                <modal-share-entity :client-id="clientId" :entity-id="entity.entityId"
                                    :modal-id="`modal-select-users-or-groups-${entityIndex}`"
                                    :title="`Share Entity '${entity.name}'`"
                                    v-on:close="refreshData"
                />

                <button-overlay :show="processingDelete[entity.entityId]">
                  <b-button variant="link" size="sm" v-on:click="onClickDelete(entity)" v-b-tooltip.hover title="Delete">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                </button-overlay>
              </b-td>
            </b-tr>
          <template v-if="expandEntities[entity.entityId]" >
            <b-tr v-for="(childEntity, childEntityIndex) in childEntities(entity.entityId)" :key="childEntity.entityId">
              <b-td>
                <router-link :to="`/tenants/${clientId}/entities/${childEntity.entityId}`" v-slot="{href, navigate}">
                  <b-link :href="href" v-on:click="navigate">{{ childEntity.entityId }}</b-link>
                </router-link>
                <button-copy :value="childEntity.entityId"/>
              </b-td>
              <b-td>{{ childEntity.name }}</b-td>
              <b-td>{{ childEntity.type }}</b-td>
              <b-td>{{ childEntity.description }}</b-td>
              <b-td>{{ childEntity.createdAt }}</b-td>
              <b-td>{{ childEntity.updatedAt }}</b-td>
              <b-td>
                <b-button variant="link" size="sm" v-b-modal="`modal-select-users-or-groups-${entityIndex}-${childEntityIndex}`"
                          v-b-tooltip.hover title="Share">
                  <span>{{ childEntity.sharedCount }}</span>&nbsp;
                  <b-icon icon="share"></b-icon>
                  <modal-share-entity :client-id="clientId" :entity-id="childEntity.entityId"
                                    :modal-id="`modal-select-users-or-groups-${entityIndex}-${childEntityIndex}`"
                                    :title="`Share Entity '${childEntity.name}'`"
                                    v-on:close="refreshData"
                  />
                  <button-overlay :show="processingDelete[childEntity.entityId]">
                    <b-button variant="link" size="sm" v-on:click="onClickDelete(childEntity)" v-b-tooltip.hover title="Delete">
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                  </button-overlay>
                </b-button>
              </b-td>
            </b-tr>
          </template>
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
import store from "../../store"
import TenantHome from "./TenantHome";
import TableOverlayInfo from "../overlay/table-overlay-info";
import ModalShareEntity from "../modals/modal-share-entity";
import ButtonOverlay from "../overlay/button-overlay";
import ButtonCopy from "../button/button-copy";

export default {
  name: "TenantEntities",
  store: store,
  components: {ButtonCopy, ButtonOverlay, ModalShareEntity, TableOverlayInfo, TenantHome},
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