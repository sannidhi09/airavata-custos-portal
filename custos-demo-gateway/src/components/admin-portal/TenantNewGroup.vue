<template>
  <TenantHome title="New Group">
    <div class="w-100" style="max-width: 600px;">
      <div class="pt-3">
        <label for="name">Group Name</label>
        <b-form-input
            v-model="name"
            :state="inputState.name"
            id="name"
            trim
            size="sm">
        </b-form-input>
        <b-form-invalid-feedback>
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </div>

      <div class="pt-3">
        <label for="description">Description</label>
        <b-form-input
            v-model="description"
            :state="inputState.description"
            id="description"
            trim
            size="sm">
        </b-form-input>
      </div>

      <div>
        <b-button variant="primary" size="sm" v-on:click="create">Create</b-button>
        <b-button variant="secondary" size="sm" class="ml-2">Cancel</b-button>
      </div>

    </div>
  </TenantHome>
</template>

<script>
import store from "../../new-service/store"
import TenantHome from "@/components/admin-portal/TenantHome";

export default {
  name: "TenantGroups",
  store: store,
  components: {TenantHome},
  data() {
    return {
      name: null,
      description: null
    };
  },
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    inputState() {
      return {
        name: this.name === null ? null : this.isValid.name,
        description: true
      }
    },
    isValid() {
      return {
        name: !!this.name && this.name.length > 0,
        description: true
      }
    },
  },
  methods: {
    create() {
      this.$store.dispatch("group/createGroup", {
        clientId: this.clientId,
        name: this.name,
        description: this.description,
        ownerId: this.$store.getters["auth/currentUsername"]
      });

      this.$router.push(`/tenants/${this.clientId}/groups`);
    }
  }
}
</script>

<style scoped>

</style>