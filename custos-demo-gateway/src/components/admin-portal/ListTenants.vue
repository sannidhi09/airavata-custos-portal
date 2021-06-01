<template>
  <div class="w-100">
    <div class="w-100 bg-light" style="display: flex;padding: 10px 40px;">
      <div style="flex: 1;">
        <div style="font-size: 1.4rem;">Tenants</div>
        <Breadcrumb :links="breadcrumbLinks"/>
      </div>
      <div>
        <router-link :to="`/tenants-new?parentClientId=${parentClientId}`" v-slot="{ href, route, navigate}" tag="">
          <b-button variant="primary" @click="navigate">Create New Tenant</b-button>
        </router-link>
      </div>
    </div>

    <div class="w-100">
      <div v-if="!tenants" class="w-100 text-center" style="color: #203A43;padding-top: 100px;">
        Loading ...
      </div>
      <div v-else-if="tenants.length === 0" class="w-100 text-center" style="color: #203A43;padding-top: 100px;">
        <p style="max-width: 600px;display: inline-block;">
          <img :src="svgNotFound" style="width: 70px;margin-bottom: 30px;"/><br/>
          You have no tenants. Start by clicking on Create New Tenant Button.
          Visit
          <b-link href="#">documentation</b-link>
          more information.
        </p>
      </div>
      <div v-else style="padding: 30px 100px;">
        <b-table-simple small>
          <b-thead>
            <b-tr>
              <b-th>
                <b-checkbox/>
              </b-th>
              <b-th>Tenant ID</b-th>
              <b-th>Name</b-th>
              <b-th>Domain</b-th>
              <b-th>Status</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="tenant in tenants" :key="tenant.tenantId">
              <b-td>
                <b-checkbox/>
              </b-td>
              <b-td>
                <router-link :to="getTenantLink(tenant)" v-slot="{ href, route, navigate}" tag="">
                  <b-link @click="navigate" :href="href">{{ tenant.tenantId }}</b-link>
                </router-link>
              </b-td>
              <b-td>{{ tenant.name }}</b-td>
              <b-td>{{ tenant.domain }}</b-td>
              <b-td>
                <b-form-tag v-if="tenant.status === 'ACTIVE'" no-remove variant="success">Active</b-form-tag>
                <b-form-tag v-else-if="tenant.status === 'REQUESTED'" no-remove variant="warning">Requested</b-form-tag>
                <b-form-tag v-else-if="tenant.status === 'DEACTIVATED'" no-remove variant="secondary">Deactivated
                </b-form-tag>
              </b-td>
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
      </div>
    </div>
  </div>
</template>

<script>

import store from "../../new-service/store"
import svgNotFound from "../../assets/not-found-icon.svg"
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "ListTenants",
  store: store,
  components: {Breadcrumb},
  data() {
    return {
      // currentActivePage: 3,
      activePage: 1,
      // perPage: 5,

      svgNotFound: svgNotFound,

      // TODO fix once the pagination is available.
      limit: 10,

      // offset: 0
    }
  },
  computed: {
    // parentTenantId() {
    //   console.log("======== this.$route", this.$route)
    //   if (this.$route.query.parentTenantId) {
    //     return this.$route.query.parentTenantId;
    //   } else {
    //     return 0;
    //   }
    // },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: "/tenants", name: "Tenants"}];
      if (this.parentTenant) {
        _breadcrumbLinks.push({to: `/tenants?parentClientId=${this.parentTenant}`, name: this.parentTenant.name})
      }

      return _breadcrumbLinks;
    },
    parentClientId() {
      if (this.$route.query.parentClientId) {
        return this.$route.query.parentClientId;
      } else {
        return null;
      }
    },
    parentTenant() {
      return this.$store.getters["tenant/getTenant"]({clientId: this.parentClientId});
    },
    isParentSuperTenant() {
      return !this.parentClientId;
    },
    offset() {
      return (this.activePage - 1) * this.limit;
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"]
    },
    currentUserEmail() {
      return this.$store.getters["user/getUser"]({username: this.currentUsername}).email
    },
    tenantsPagination() {
      return this.$store.getters["tenant/getTenantsPagination"]({
        // parentTenantId: this.parentTenantId,
        parentClientId: this.parentClientId,
        limit: this.limit, offset: this.offset, // status: "ACTIVE"
      })
    },
    tenants() {
      let activeTenants = this.$store.getters["tenant/getTenants"]({
        // parentTenantId: this.parentTenantId,
        parentClientId: this.parentClientId,
        limit: this.limit, offset: this.offset, // status: "ACTIVE"
      })

      // TODO remove later. A temporary fix for tenants that has issues.
      if (activeTenants) {
        activeTenants = activeTenants.filter(tenant => !!tenant);
      }

      return activeTenants;
    }
  },
  watch: {
    activePage() {
      this.$store.dispatch("tenant/fetchTenants", {
        // parentTenantId: this.parentTenantId,
        parentClientId: this.parentClientId,
        limit: this.limit, offset: this.offset, // status: "ACTIVE"
      });
    },
    parentClientId() {
      if (this.parentClientId) {
        this.$store.dispatch("tenant/fetchTenant", {clientId: this.parentClientId});
      }

      this.$store.dispatch("tenant/fetchTenants", {
        // parentTenantId: this.parentTenantId,
        parentClientId: this.parentClientId,
        limit: this.limit, offset: this.offset, // status: "ACTIVE"
      });
    }
  },
  async mounted() {
    if (this.parentClientId) {
      await this.$store.dispatch("tenant/fetchTenant", {clientId: this.parentClientId});
    }

    await this.$store.dispatch("user/fetchUsers", {username: this.currentUsername});

    this.$store.dispatch("tenant/fetchTenants", {
      // parentTenantId: this.parentTenantId,
      parentClientId: this.parentClientId,
      limit: this.limit, offset: this.offset, // status: "ACTIVE"
    });
    // this.$store.dispatch("tenant/fetchTenants", {
    //   limit: this.limit, offset: this.offset, status: "REQUESTED"
    // });
    // this.$store.dispatch("tenant/fetchTenants", {
    //   limit: this.limit, offset: this.offset, status: "DEACTIVATED"
    // });
  },
  methods: {
    getTenantLink({clientId, tenantId}) {
      console.log("###### getTenantLink : ", {clientId, tenantId});
      // return `/tenants/${clientId}`;
      if (this.isParentSuperTenant) {
        return `/tenants?parentClientId=${clientId}`;
      } else {
        return `/tenants/${clientId}`;
      }
    }
  }
};
</script>

<style scoped>
.link {
  color: #ff6600;
}

.h-tab {
  display: flex;
  max-height: 500px;
  margin-top: 20px;
  padding: 20px;
}

.h-tabs {
  flex: 8;
}

.list-button {
  border-radius: 30px;
  width: 35px;
  height: 35px;
  padding: 0px;
  line-height: 0px;
  font-size: 15px;
  background-color: #ff6600;
}

.tab-content {
  flex: 1;
  border-bottom: 3px solid black;
  padding: 8px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  font-size: 20px;
}

.tab-content-active {
  flex: 1;
  border-bottom: 3px solid #ff6600;;
  padding: 8px;
  color: #ff6600;
  font-weight: bold;
  cursor: pointer;
  font-size: 20px;
}

.table-head {
  background-color: lightgray;
}

.content {
  margin-top: 20px;
  width: 1100px;
  margin-left: 20px;
}

.heading {
  font-size: 30px;
  color: black;
  font-weight: bold;
}

.searchBoxDiv {
  margin-top: 20px;
  margin-left: 50px;
}

.searchBox {
  width: 350px;
  height: 45px;
}

.table {
  padding: 20px;
}

.btnCustom {
  color: white;
  background-color: #ff6600;
  padding: 10px 25px;
  border: 1px solid #ff6600;
  border-radius: 8px;
  margin-left: 20%;
}

.btnCustom:hover {
  color: white;
  background-color: #944203;
  padding: 10px 25px;
  border: 1px solid #944203;
  border-radius: 8px;
}

.btnCustom:focus {
  color: white;
  background-color: #944203;
  padding: 10px 25px;
  border: 1px solid #944203;
  border-radius: 8px;
}

.btnPagination {
  color: #ff6600;
  background-color: white;
  padding: 10px 25px;
  border: 1px solid #ff6600;
  border-radius: 8px;
  font-weight: bold;
}

.btnPagination:hover {
  color: white;
  background-color: #944203;
  padding: 10px 25px;
  border: 1px solid #944203;
  border-radius: 8px;
}

.btnPaginationActive {
  color: white;
  background-color: #944203;
  padding: 10px 25px;
  border: 1px solid #944203;
  border-radius: 8px;
}

.tenantLogin {
  background-color: darkolivegreen;
}

.createChildTenant {
  background-color: #ff6600;
  margin-left: 2%;
}
</style>