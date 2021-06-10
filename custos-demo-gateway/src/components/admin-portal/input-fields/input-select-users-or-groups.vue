<template>
  <div>
    <vue-typeahead-bootstrap
        v-model="usernameSearch"
        :data="typeheadData"
        :min-matching-chars="0"
        :serializer="item => item.username ? item.username : item.name"
        @hit="selectSearchResult"
    >
      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <small v-if="!data.username" style="font-size: 10px">GROUP <br/></small>
        <span v-html="htmlText"></span>
      </template>
    </vue-typeahead-bootstrap>
  </div>
</template>

<script>
import store from "@/new-service/store";

export default {
  name: "input-select-users-or-groups",
  store: store,
  props: {
    clientId: {}
  },
  data() {
    return {
      usernameSearch: ""
    }
  },
  computed: {
    typeheadData() {
      // return this.users;
      return this.users.concat(this.groups);
    },
    // typeheadDataSerializer() {
    //   return (obj) => {
    //     console.log("typeheadDataSerializer", obj)
    //     if (obj.username) {
    //       return obj.username;
    //     } else {
    //       // return obj.name;
    //       return `<small>GROUP </small> ${obj.name}`;
    //     }
    //   };
    // },
    users() {
      const _users = this.$store.getters["user/getUsers"]({
        clientId: this.clientId,
        limit: 5,
        offset: 0,
        username: this.usernameSearch
      });

      if (_users) {
        return _users;
      } else {
        return [];
      }
    },
    groups() {
      const _groups = this.$store.getters["group/getGroups"]({
        clientId: this.clientId,
        limit: 5,
        offset: 0,
        groupId: this.groupId
      });

      if (_groups) {
        return _groups;
      } else {
        return [];
      }
    }
  },
  watch: {
    usernameSearch() {
      this.refreshList();
    }
  },
  methods: {
    selectSearchResult(user) {
      // this.usernameSearch = user.username;
      this.$emit("change", user);
      this.usernameSearch = ""
    },
    refreshList() {
      if (this.usernameSearch.length > -1) {
        this.$store.dispatch("user/fetchUsers", {
          clientId: this.clientId,
          limit: 5,
          offset: 0,
          username: this.usernameSearch
        });
        this.$store.dispatch("group/fetchGroups", {
          clientId: this.clientId,
          limit: 5,
          offset: 0,
          groupId: this.groupId
        });
      }
    }
  },
  beforeMount() {
    this.refreshList();
  }
}
</script>

<style scoped>

</style>