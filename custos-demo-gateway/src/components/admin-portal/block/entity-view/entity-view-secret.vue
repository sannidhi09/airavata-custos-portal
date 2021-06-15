<template>
  <div>
    <div>Secret Entity. TBA</div>
    <entity-view-default :entity-id="entityId" :client-id="clientId"/>
  </div>
</template>

<script>
import store from "@/new-service/store";
import EntityViewDefault from "@/components/admin-portal/block/entity-view/entity-view-default";

export default {
  name: "entity-view-secret",
  components: {EntityViewDefault},
  store: store,
  props: {
    clientId: {},
    entityId: {}
  },
  computed: {
    entity() {
      return this.$store.getters["entity/getEntity"]({entityId: this.entityId})
    }
  }
}
</script>

<style scoped>

</style>