<template>
  <TenantHome :title="title" :breadcrumb-links="breadcrumbLinks">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/child-tenants/new`" v-slot="{ href, route, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Create New Tenant</b-button>
      </router-link>
    </template>
    <div class="w-100">
      <table-overlay-info :rows="5" :columns="5" :data="tenants">
        <b-table-simple small>
          <b-thead>
            <b-tr>
              <!--              <b-th>-->
              <!--                <b-checkbox/>-->
              <!--              </b-th>-->
              <b-th>Client ID</b-th>
              <b-th>Name</b-th>
              <b-th>Domain</b-th>
              <b-th>Status</b-th>
              <b-th>Actions</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="childTenant in tenants" :key="childTenant.tenantId">
              <!--              <b-td>-->
              <!--                <b-checkbox/>-->
              <!--              </b-td>-->
              <b-td>
                <router-link v-if="childTenant.status === 'ACTIVE'" :to="getTenantLink(childTenant)"
                             v-slot="{ href, route, navigate}" tag="">
                  <b-link @click="navigate" :href="href">
                    {{ childTenant.clientId }}
                  </b-link>
                </router-link>
                <span v-else>{{ childTenant.clientId }}</span>
              </b-td>
              <b-td>{{ childTenant.name }}</b-td>
              <b-td>{{ childTenant.domain }}</b-td>
              <b-td>
                <b-tag v-if="childTenant.status === 'ACTIVE'" no-remove variant="success">Active</b-tag>
                <b-tag v-else-if="childTenant.status === 'REQUESTED'" no-remove variant="warning">Requested
                </b-tag>
                <b-tag v-else-if="childTenant.status === 'DEACTIVATED'" no-remove variant="secondary">Deactivated
                </b-tag>
              </b-td>
              <td>
                <b-button variant="outline-primary" size="sm"
                          v-if="tenant.hasAdminPrivileges && childTenant.status !== 'ACTIVE'"
                          v-on:click="activateTenant(childTenant)">Activate
                </b-button>
                <b-button variant="outline-primary" size="sm"
                          v-if="tenant.hasAdminPrivileges && childTenant.status !== 'DEACTIVATED'"
                          v-on:click="deactivateTenant(childTenant)"
                          :class="{'ml-2':childTenant.status !== 'ACTIVE'}">
                  Deactivate
                </b-button>
              </td>
            </b-tr>

          </b-tbody>
        </b-table-simple>
        <b-pagination
            v-if="tenantsPagination"
            size="sm"
            class="float-right"
            v-model="activePage"
            :total-rows="tenantsPagination.totalRows"
            :per-page="tenantsPagination.perPage"
            aria-controls="my-table"
            :value="activePage"
        ></b-pagination>

        <template #empty>
          <div class="w-100 text-center" style="color: #203A43;padding-top: 100px;">
            <p style="max-width: 600px;display: inline-block;">
              <img :src="svgNotFound" style="width: 70px;margin-bottom: 30px;"/><br/>
              You have no tenants. Start by clicking on Create New Tenant Button.
              Visit
              <b-link href="#">documentation</b-link>
              more information.
            </p>
          </div>
        </template>
      </table-overlay-info>

    </div>
  </TenantHome>
</template>

<script>

import store from "../../new-service/store"
import svgNotFound from "../../assets/not-found-icon.svg"
import TenantHome from "@/components/admin-portal/TenantHome";
import {custosService} from "@/new-service/store/util/custos.util";
import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "ListTenants",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  data() {
    return {
      activePage: 1,
      svgNotFound: svgNotFound,
      limit: 10
    }
  },
  computed: {
    title() {
      if (this.tenant && this.tenant.type === "SUPER_TENANT") {
        return "Admin Clients";
      } else if (this.tenant && this.tenant.type === "ADMIN_TENANT") {
        return "Child Clients";
      } else {
        return "Clients";
      }
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/child-tenants`, name: this.title}];
    },
    clientId() {
      if (this.$route.params.clientId) {
        return this.$route.params.clientId;
      } else {
        return custosService.clientId;
      }
    },
    tenant() {
      return this.$store.getters["tenant/getTenant"]({clientId: this.clientId});
    },
    offset() {
      return (this.activePage - 1) * this.limit;
    },
    tenantsPagination() {
      return this.$store.getters["tenant/getTenantsPagination"](this.tenantsListParams);
    },
    tenants() {
      let activeTenants = this.$store.getters["tenant/getTenants"](this.tenantsListParams);

      // TODO remove later. A temporary fix for tenants that has issues.
      if (activeTenants) {
        activeTenants = activeTenants.filter(tenant => !!tenant);
      }

      return activeTenants;
    },
    currentUser() {
      return this.$store.getters["user/getUser"]({username: this.$store.getters["auth/currentUsername"]});
    },
    requesterEmail() {
      if (this.currentUser) {
        return this.currentUser.email;
      } else {
        return null;
      }
    },
    tenantsListParams() {
      const params = {
        parentClientId: this.clientId,
        limit: this.limit, offset: this.offset
      }

      if (this.tenant && !this.tenant.hasAdminPrivileges) {
        params.requesterEmail = this.requesterEmail;
      }

      return params;
    }
  },
  watch: {
    activePage() {
      this.$store.dispatch("tenant/fetchTenants", this.tenantsListParams);
    },
    clientId() {
      this.$store.dispatch("tenant/fetchTenants", this.tenantsListParams);
    },
    requesterEmail() {
      this.$store.dispatch("tenant/fetchTenants", this.tenantsListParams);
    }
  },
  mounted() {
    this.$store.dispatch("tenant/fetchTenants", this.tenantsListParams);
  },
  methods: {
    getTenantLink({clientId}) {
      return `/tenants/${clientId}`;
    },
    activateTenant({clientId}) {
      this.$store.dispatch("tenant/updateTenantStatus", {clientId, status: "ACTIVE"})
    },
    deactivateTenant({clientId}) {
      this.$store.dispatch("tenant/updateTenantStatus", {clientId, status: "DEACTIVATED"})
    }
  }
};
</script>

<style scoped>

</style>