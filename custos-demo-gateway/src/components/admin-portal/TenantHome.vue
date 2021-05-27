<template>
  <div class="w-100">
    <div class="w-100 bg-light" style="display: flex;padding: 10px 40px;">
      <div style="flex: 1;">
        <div style="font-size: 1.4rem;" v-if="tenant">{{ tenant.name }}</div>
      </div>
      <div>
        <router-link to="/tenants" v-slot="{ href, route, navigate}" tag="">
          <b-button variant="secondary" @click="navigate">Back</b-button>
        </router-link>
      </div>
    </div>

    <div class="w-100" v-if="tenant" style="display: flex; flex-direction: row;">
      <div style="width: 300px;">
        <ul>
          <li>
            <router-link :to="`/tenants/${clientId}/profile`" v-slot="{ href, route, navigate}" tag="">
              <b-link @click="navigate" :href="href">Profile</b-link>
            </router-link>
          </li>
          <li>
            <router-link :to="`/tenants/${clientId}/users`" v-slot="{ href, route, navigate}" tag="">
              <b-link @click="navigate" :href="href">User Management</b-link>
            </router-link>
            <ul><!---->
              <li>
                <router-link :to="`/tenants/${clientId}/users`" v-slot="{ href, route, navigate}"
                             tag="">
                  <b-link @click="navigate" :href="href">Users</b-link>
                </router-link>
              </li>
              <li>
                <router-link :to="`/tenants/${clientId}/groups`" v-slot="{ href, route, navigate}"
                             tag="">
                  <b-link @click="navigate" :href="href">Groups</b-link>
                </router-link>
              </li>
              <li>
                <router-link :to="`/tenants/${tenant.tenantId}/user-management/users`" v-slot="{ href, route, navigate}"
                             tag="">
                  <b-link @click="navigate" :href="href">Roles</b-link>
                </router-link>
              </li>
              <li>
                <router-link :to="`/tenants/${tenant.tenantId}/user-management/users`" v-slot="{ href, route, navigate}"
                             tag="">
                  <b-link @click="navigate" :href="href">Permissions</b-link>
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link :to="`/tenants/${tenant}/audits`" v-slot="{ href, route, navigate}" tag="">
              <b-link @click="navigate" :href="href">Audits</b-link>
            </router-link>
          </li>
        </ul>
      </div>
      <div style="flex: 1;">
        <div class="w-100" style="font-weight: 500;font-size: 23px;">{{ title }}</div>
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>

import store from "../../new-service/store"

export default {
  name: "TenantHome",
  store: store,
  components: {},
  props: {
    title: {}
  },
  data() {
    return {}
  },
  computed: {
    currentUsername() {
      return this.$store.getters["auth/currentUsername"]
    },
    currentUserEmail() {
      return this.$store.getters["user/getUser"]({username: this.currentUsername}).email
    },
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    tenant() {
      return this.$store.getters["tenant/getTenant"]({clientId: this.clientId});
    }
  },
  async beforeMount() {
    await this.$store.dispatch("user/fetchUsers", {username: this.currentUsername});

    this.$store.dispatch("tenant/fetchTenant", {
      clientId: this.clientId
    });
  },
  methods: {}
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