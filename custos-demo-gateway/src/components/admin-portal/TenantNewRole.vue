<template>
  <TenantHome title="New Role" :breadcrumb-links="breadcrumbLinks">
    <div style="max-width: 500px;">
      <div class="pt-3">
        <label class="form-label" for="name">Name</label>
        <b-form-input
            v-model="name"
            :state="inputState.name"
            id="name"
            trim
            size="sm">
        </b-form-input>
        <b-form-invalid-feedback>
        </b-form-invalid-feedback>
      </div>

      <div class="pt-3">
        <label class="form-label" for="description">Description</label>
        <b-form-input
            v-model="description"
            :state="inputState.description"
            type="email"
            id="description"
            trim
            size="sm">
        </b-form-input>
        <b-form-invalid-feedback>
        </b-form-invalid-feedback>
      </div>

      <div class="pt-3">
        <label class="form-label" for="scope">Scope</label>
        <b-form-radio-group
            v-model="scope"
            :options="['TENANT', 'CLIENT']"
            id="scope"
            trim
            size="sm">
        </b-form-radio-group>
      </div>

      <div class="pt-3">
        <b-form-checkbox
            v-model="composite"
            id="composite"
            trim
            size="sm">
          <label class="form-label" for="composite">Composite</label>
        </b-form-checkbox>
      </div>

      <div class="pt-3">
        <b-button variant="primary" size="sm" v-on:click="onSaveClick">Save</b-button>
      </div>

    </div>

  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";

export default {
  name: "TenantNewRole",
  components: {TenantHome},
  store: store,
  data() {
    return {
      name: null,
      description: null,
      scope: "TENANT",
      composite: false,

      inputFieldsList: ["name", "description"]
    }
  },
  computed: {
    inputState() {
      return {
        name: this.name === null ? null : this.isValid.name,
        description: this.description === null ? null : this.isValid.description
      }
    },
    isValid() {
      return {
        name: !!this.name && this.name.length > 0,
        description: !!this.description && this.description.length > 0
      }
    },
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    breadcrumbLinks() {
      return [
        {to: `/tenants/${this.clientId}/roles`, name: "Roles"},
        {to: `/tenants/${this.clientId}/roles/new`, name: "New"}
      ];
    },
    isFormValid() {
      let _isFormValid = true;
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        _isFormValid = _isFormValid && this.isValid[this.inputFieldsList[i]];
      }

      return _isFormValid;
    }
  },
  methods: {
    makeFormVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
    onSaveClick() {
      this.makeFormVisited();
      if (this.isFormValid) {
        this.$store.dispatch("tenant/createTenantRole", {
          clientId: this.clientId, name: this.name, description: this.description, composite: this.composite,
          clientLevel: this.scope === "CLIENT"
        });
      }
    }
  }
}
</script>

<style scoped>

</style>