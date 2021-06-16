<template>
  <table-overlay-info :rows="5" :columns="1" :data="entity ? [entity]: null">
    <entity-view-secret v-if="entity.type === 'SECRET'" :entity-id="entityId" :client-id="clientId"/>
    <entity-view-default v-else :entity-id="entityId" :client-id="clientId"/>
  </table-overlay-info>
</template>

<script>
import store from "@/new-service/store";
import TableOverlayInfo from "@/components/table-overlay-info";
import EntityViewDefault from "@/components/admin-portal/block/entity-view/entity-view-default";
import EntityViewSecret from "@/components/admin-portal/block/entity-view/entity-view-secret";

export default {
  name: "entity-view",
  components: {EntityViewSecret, EntityViewDefault, TableOverlayInfo},
  store: store,
  props: {
    clientId: {},
    entityId: {}
  },
  computed: {
    entity() {
      return this.$store.getters["entity/getEntity"]({entityId: this.entityId})
    }
  },
  methods: {
    refreshData() {
      this.$store.dispatch("entity/fetchEntity", {clientId: this.clientId, entityId: this.entityId});
    }
  },
  beforeMount() {
    this.refreshData();
  }
}
</script>

<style scoped>

</style>