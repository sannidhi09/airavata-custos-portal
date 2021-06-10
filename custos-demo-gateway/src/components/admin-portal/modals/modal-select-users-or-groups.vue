<template>
  <b-modal :id="modalId" :title="title">
    <input-select-users-or-groups :client-id="clientId" v-on:change="onSelect"/>
    <ul class="list-inline d-inline-block mb-2 p-4">
      <li v-for="user in selectedUsers" :key="user.username" class="list-inline-item">
        <b-form-tag
            :title="user.username"
            variant="info"
        >{{ user.username }}
        </b-form-tag>
      </li>
      <li v-for="group in selectedGroups" :key="group.name" class="list-inline-item">
        <b-form-tag
            :title="group.name"
            variant="info"
        >{{ group.name }}
        </b-form-tag>
      </li>
    </ul>
    <template #modal-footer="{close}">
      <b-button variant="primary" size="sm" v-on:click="onClickAdd">Add</b-button>
      <b-button variant="secondary" size="sm" @click="close">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "@/new-service/store";
import InputSelectUsersOrGroups from "@/components/admin-portal/input-fields/input-select-users-or-groups";

export default {
  name: "modal-select-users-or-groups",
  components: {InputSelectUsersOrGroups},
  store: store,
  props: {
    modalId: {},
    clientId: {},
    title: {
      default: "Select Users or Groups"
    }
  },
  data() {
    return {
      selectedUsers: [],
      selectedGroups: []
    }
  },
  computed: {},
  methods: {
    onSelect(obj) {
      if (obj.username) {
        this.selectedUsers.push(obj);
      } else if (obj.groupId) {
        this.selectedGroups.push(obj);
      }
    },
    onClickAdd() {
      this.$emit("users", this.selectedUsers);
      this.$emit("groups", this.selectedGroups);
      this.$bvModal.hide(this.modalId);
    }
  }
}
</script>

<style scoped>

</style>
