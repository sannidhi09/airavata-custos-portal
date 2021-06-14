<template>
  <div class="w-100">
    <div class="w-100 bg-light" style="display: flex;padding: 10px 40px;">
      <div style="flex: 1;">
        <div style="font-size: 1.4rem;">Tenants</div>
      </div>
      <div>
        <b-button variant="primary" v-on:click="this.createNewTenant">Create New Tenant</b-button>
      </div>
    </div>

    <NewTenant v-if="this.addTenant" :tenantId="parentId"></NewTenant>
    <ListTenants v-if="!this.addTenant" :key="this.refresh" @loginToTenant="loginToTenant"
                 @createChildTenant="createChildTenant"></ListTenants>

  </div>
</template>

<script>
import NewTenant from "@/components/admin-portal/NewTenant";
import ListTenants from "@/components/admin-portal/ListTenants";
import config from "@/config";
import svgNotFound from "../../assets/not-found-icon.svg";

export default {
  name: "tenants",
  components: {ListTenants, NewTenant},
  data: function () {
    return {
      svgNotFound: svgNotFound,
      addTenant: false,
      custosId: '',
      custosSec: '',
      refresh: false,
      parentId: null
    }
  },

  methods: {
    async createNewTenant() {
      this.addTenant = true
    },
    async viewTenants() {
      this.addTenant = false
      this.refresh = !this.refresh
      this.parentId = null
    },
    async loginToTenant(item) {
      await this.$router.push({name: 'tenantLogin', params: {tenantId: item.tenantId, tenantName: item.tenantName}})
    },

    // eslint-disable-next-line no-unused-vars
    async createChildTenant(item) {
      this.addTenant = true
      this.parentId = item.tenantId
    }
  },

  async mounted() {
    this.custosId = config.value('clientId')
    this.custosSec = config.value('clientSec')
    this.tenantModeactivated = await this.$store.dispatch('tenant/isTenantModeActivated')
    if (this.tenantModeactivated) {
      this.custosId = await this.$store.dispatch('tenant/getActivatedClientId')
      this.custosSec = await this.$store.dispatch('tenant/getActivatedClientSecret');
      await this.$router.push({name: 'workspace', params: {tenantId: this.custosId}})
    }
  }


}
</script>

<style scoped>
.left-column {
  float: left;
  width: 3%;
  padding: 0px;
  height: 100vh;
  background: #fe8c00;
  background: -webkit-linear-gradient(to bottom, #afafae, #afafae);
  background: linear-gradient(to bottom, #afafae, #afafae);
}

.right-column {
  float: left;
  width: 97%;
  padding: 0px;
  height: 100vh;
}

.upper-row {
  float: left;
  width: 100%;
  padding: 0px;
  background: #fe8c00;
  background: -webkit-linear-gradient(to right, #f83600, #fe8c00);
  background: linear-gradient(to right, #f83600, #fe8c00);
  height: 3.5%;
}

.lower-row {

}

.side-buttons {
  position: relative;
  margin-top: 3%;
}


</style>