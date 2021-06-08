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
            <b-form-checkbox-group
                v-model="realmRoles"
                :options="availableTenantRoles"
                :state="inputState.realmRoles"
                id="realm-roles"
                trim
                size="sm"
                aria-describedby="scope-help-block">
            </b-form-checkbox-group>
            <b-form-text id="scope-help-block"></b-form-text>
            <b-form-invalid-feedback></b-form-invalid-feedback>
            <!--            <b-form-tags input-id="realm-roles" v-model="realmRoles">-->
            <!--              <template v-slot="{ tags, disabled, addTag, removeTag }">-->
            <!--                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">-->
            <!--                  <li v-for="tag in tags" :key="tag" class="list-inline-item">-->
            <!--                    <b-form-tag-->
            <!--                        @remove="removeTag(tag)"-->
            <!--                        :title="tag"-->
            <!--                        :disabled="disabled"-->
            <!--                        variant="info"-->
            <!--                    >{{ tag }}-->
            <!--                    </b-form-tag>-->
            <!--                  </li>-->
            <!--                </ul>-->
            <!--                <vue-typeahead-bootstrap-->
            <!--                    :data="availableTenantRoles"-->
            <!--                    @hit="addTag" :min-matching-chars="0"-->
            <!--                >-->
            <!--                </vue-typeahead-bootstrap>-->
            <!--              </template>-->
            <!--            </b-form-tags>-->
          </div>

          <div class="pt-3">
            <label for="client-roles">Client Roles</label>
            <b-form-checkbox-group
                v-model="clientRoles"
                :options="availableClientRoles"
                :state="inputState.clientRoles"
                id="client-roles"
                trim
                size="sm"
                aria-describedby="scope-help-block">
            </b-form-checkbox-group>
            <b-form-text id="scope-help-block"></b-form-text>
            <b-form-invalid-feedback></b-form-invalid-feedback>
          </div>

          <div class="pt-3">
            <label for="attributes">Attributes</label>
            <div>
              <ul v-if="attributes.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="(attribute, attributesIndex) in attributes" :key="attributesIndex" class="list-inline-item">
                  <b-form-tag variant="primary" :title="`${attribute.key} = ${attribute.values}`">
                    {{ attribute.key }} = {{ attribute.values.join(", ") }}
                  </b-form-tag>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      <div class="pt-4">
        <b-button variant="primary" size="sm" v-on:click="onClickSave">Save</b-button>
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
      attributes: [{key: "a", values: [1, 2, 3]}, {key: "b", values: ["fhfhf"]}]
    }
  },
  computed: {
    inputState() {
      return {
        username: this.username === null ? null : this.isValid.username,
        firstName: this.firstName === null ? null : this.isValid.firstName,
        lastName: this.lastName === null ? null : this.isValid.lastName,
        email: this.email === null ? null : this.isValid.email,
        realmRoles: this.realmRoles.email,
        clientRoles: this.clientRoles.email,
        attributes: this.attributes.email
      }
    },
    isValid() {
      return {
        username: !!this.username && this.username.length > 0,
        firstName: !!this.firstName && this.firstName.length > 0,
        lastName: !!this.lastName && this.lastName.length > 0,
        email: !!this.email && this.email.length > 0,
        realmRoles: true,
        clientRoles: true,
        attributes: true
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
    availableClientRoles() {
      const _roles = this.$store.getters["tenant/getTenantRoles"]({clientId: this.clientId, clientLevel: true});
      if (_roles) {
        return _roles.map(({name}) => name);
      } else {
        return [];
      }
    },
    availableTenantRoles() {
      const _roles = this.$store.getters["tenant/getTenantRoles"]({clientId: this.clientId, clientLevel: false});
      if (_roles) {
        return _roles.map(({name}) => name);
      } else {
        return [];
      }
    }
  },
  methods: {
    onClickSave() {
      this.$store.dispatch("user/updateUser", {
        clientId: this.clientId,
        userName: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      });
    }
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
        // this.attributes = this.user.attributes;
      }
    }
  },
  mounted() {
    this.$store.dispatch("tenant/fetchTenantRoles", {clientId: this.clientId, clientLevel: true});
    this.$store.dispatch("tenant/fetchTenantRoles", {clientId: this.clientId, clientLevel: false});

    if (this.user) {
      console.log("########## user watch")
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.realmRoles = this.user.realmRoles;
      this.clientRoles = this.user.clientRoles;
      // this.attributes = this.user.attributes;
    }
  }
}
</script>

<style scoped>

</style>