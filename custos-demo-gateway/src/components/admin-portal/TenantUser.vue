<template>
  <TenantHome :title="title" :breadcrumb-links="breadcrumbLinks">
    <div>
      <div style="display: flex; flex-direction: row;">

        <div style="flex: 1;padding-right: 10px;">
          <div class="pt-3">
            <label for="first-name">First Name</label>
            <b-form-input
                v-model="firstName"
                :state="inputState.firstName"
                id="first-name"
                trim
                size="sm">
            </b-form-input>
            <b-form-invalid-feedback>
            </b-form-invalid-feedback>
          </div>

          <div class="pt-3">
            <label for="last-name">Last Name</label>
            <b-form-input
                v-model="lastName"
                :state="inputState.lastName"
                id="last-name"
                trim
                size="sm">
            </b-form-input>
            <b-form-invalid-feedback>
            </b-form-invalid-feedback>
          </div>

          <div class="pt-3">
            <label for="email">Email</label>
            <b-form-input
                v-model="email"
                :state="inputState.email"
                id="email"
                trim
                size="sm">
            </b-form-input>
            <b-form-invalid-feedback>
            </b-form-invalid-feedback>
          </div>

          <div class="pt-3">
            <label for="username">Username</label>
            <b-form-input
                v-model="username"
                :state="inputState.username"
                id="username"
                trim
                size="sm">
            </b-form-input>
            <b-form-invalid-feedback>
            </b-form-invalid-feedback>
          </div>
        </div>

        <div style="flex: 1;padding-left: 10px;">

          <div class="pt-3">
            <label for="realm-roles">Tenant Roles</label>
            <b-form-tags input-id="realm-roles" v-model="realmRoles"></b-form-tags>
          </div>

          <div class="pt-3">
            <label for="client-roles">Client Roles</label>
            <b-form-tags input-id="client-roles" v-model="clientRoles"></b-form-tags>
          </div>

          <div class="pt-3">
            <label for="attributes">Attributes</label>
            <b-form-tags input-id="attributes" v-model="attributes"></b-form-tags>
          </div>

        </div>

      </div>
      <div class="pt-4">
        <b-button variant="primary" size="sm">Save</b-button>
        <b-button variant="secondary" size="sm" class="ml-3">Cancel</b-button>
      </div>
    </div>
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
// import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantUser",
  components: {TenantHome},
  store: store,
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      realmRoles: [],
      clientRoles: [],
      attributes: []
    }
  },
  computed: {
    inputState() {
      return {
        username: this.username === null ? null : this.isValid.username,
        firstName: this.firstName === null ? null : this.isValid.firstName,
        lastName: this.lastName === null ? null : this.isValid.lastName,
        email: this.email === null ? null : this.isValid.email
      }
    },
    isValid() {
      return {
        username: !!this.username && this.username.length > 0,
        firstName: !!this.firstName && this.firstName.length > 0,
        lastName: !!this.lastName && this.lastName.length > 0,
        email: !!this.email && this.email.length > 0
      }
    },
    title() {
      if (this.user) {
        return `${this.user.firstName}, ${this.user.lastName}`;
      } else {
        return "";
      }
    },
    clientId() {
      return this.$route.params.clientId;
    },
    username() {
      return this.$route.params.username;
    },
    user() {
      return this.$store.getters["user/getUser"]({username: this.username})
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: `/tenants/${this.clientId}/users`, name: "Users"}];
      if (this.user) {
        _breadcrumbLinks.push({
          to: `/tenants/${this.clientId}/users/${this.username}`,
          name: this.title
        });
      }

      return _breadcrumbLinks;
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log("########## user watch")
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.email = this.user.email;
        this.realmRoles = this.user.realmRoles;
        this.clientRoles = this.user.clientRoles;
        this.attributes = this.user.attributes;
      }
    }
  },
  mounted() {
    if (this.user) {
      console.log("########## user watch")
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.realmRoles = this.user.realmRoles;
      this.clientRoles = this.user.clientRoles;
      this.attributes = this.user.attributes;
    }
  }
}
</script>

<style scoped>

</style>