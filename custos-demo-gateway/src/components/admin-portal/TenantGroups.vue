<template>
  <TenantHome title="Groups" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/groups/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Group</b-button>
      </router-link>
    </template>
    <table-overlay-info :rows="5" :columns="1" :data="groups">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Description</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="group in groups" :key="group.groupId">
            <b-td>
              <router-link :to="`/tenants/${clientId}/groups/${group.groupId}`" v-slot="{href, navigate}">
                <b-link :href="href" v-on:click="navigate">{{ group.name }}</b-link>
              </router-link>
            </b-td>
            <b-td>{{ group.description }}</b-td>
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
  name: "TenantGroups",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    groups() {
      return this.$store.getters["group/getGroups"]({clientId: this.clientId})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/groups`, name: "Groups"}];
    }
  },
  mounted() {
    this.$store.dispatch("group/fetchGroups", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>