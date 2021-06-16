<template>
  <TenantHome :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <div style="display: flex; flex-direction: row;">
        <div style="font-size: 14px; font-weight: 500;padding-right: 20px;">
          <b-icon icon="envelope"></b-icon>
          {{ email }}
          <br/>
          <b-icon icon="person"></b-icon>
          {{ username }}
        </div>
        <div>
          <b-button variant="primary" v-on:click="onClickSave">Save</b-button>
        </div>
      </div>
    </template>

    <b-overlay :show="processing">
      <div class="p-2" style="display: flex; flex-direction: row;">
        <div style="flex: 1;padding-right: 10px;">
          <div class="pt-3">
            <label class="form-label" for="first-name">First Name</label>
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
            <label class="form-label" for="last-name">Last Name</label>
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

          <!--          <div class="pt-3">-->
          <!--            <label class="form-label" for="email">Email</label>-->
          <!--            <b-form-input-->
          <!--                v-model="email"-->
          <!--                :state="inputState.email"-->
          <!--                id="email"-->
          <!--                trim-->
          <!--                size="sm">-->
          <!--            </b-form-input>-->
          <!--            <b-form-invalid-feedback>-->
          <!--            </b-form-invalid-feedback>-->
          <!--          </div>-->

          <!--          <div class="pt-3">-->
          <!--            <label class="form-label" for="username">Username</label>-->
          <!--            <b-form-input-->
          <!--                v-model="username"-->
          <!--                :state="inputState.username"-->
          <!--                id="username"-->
          <!--                trim-->
          <!--                size="sm">-->
          <!--            </b-form-input>-->
          <!--            <b-form-invalid-feedback>-->
          <!--            </b-form-invalid-feedback>-->
          <!--          </div>-->

          <div class="pt-3">
            <label class="form-label" for="realm-roles">Tenant Roles</label>
            <b-form-checkbox-group
                v-model="realmRoles"
                :options="availableTenantRoles"
                :state="inputState.realmRoles"
                id="realm-roles"
                trim
                size="sm"
                aria-describedby="scope-help-block"
                :disabled="!tenant.hasAdminPrivileges">
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
            <label class="form-label" for="client-roles">Client Roles</label>
            <b-form-checkbox-group
                v-model="clientRoles"
                :options="availableClientRoles"
                :state="inputState.clientRoles"
                id="client-roles"
                trim
                size="sm"
                aria-describedby="scope-help-block"
                :disabled="!tenant.hasAdminPrivileges">
            </b-form-checkbox-group>
            <b-form-text id="scope-help-block"></b-form-text>
            <b-form-invalid-feedback></b-form-invalid-feedback>
          </div>

        </div>

        <div style="flex: 1;padding-left: 10px;">

          <div class="pt-3">
            <label class="form-label" for="attributes">Attributes</label>
            <table-overlay-info :rows="5" :columns="2" :data="attributes" empty-label="No attributes.">
              <template #empty>
                No attributes to show.
                <b-button variant="link" size="sm" v-on:click="attributes.push({key: '', values: ''})"
                          v-if="tenant.hasAdminPrivileges">
                  Create an attribute
                </b-button>
              </template>
              <b-table-simple>
                <b-thead>
                  <b-tr>
                    <b-th></b-th>
                    <b-th>Key</b-th>
                    <b-th>Values</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(attribute, attributesIndex) in attributes" :key="attributesIndex">
                    <b-td>#{{ attributesIndex + 1 }}</b-td>
                    <b-td>
                      <label :for="`attribute-key-${attributesIndex + 1}`"
                             style="visibility: hidden; position: fixed; top: -100px;">
                        Attribute #{{ attributesIndex + 1 }} key
                      </label>
                      <b-form-input :id="`attributes-key-${attributesIndex + 1}`" v-model="attribute.key" size="sm"
                                    :disabled="!tenant.hasAdminPrivileges"/>
                    </b-td>
                    <b-td>
                      <label :for="`attribute-values-${attributesIndex + 1}`"
                             style="visibility: hidden; position: fixed; top: -100px;">
                        Attribute #{{ attributesIndex + 1 }} values
                      </label>
                      <b-form-input :id="`attributes-values-${attributesIndex + 1}`" v-model="attribute.values"
                                    size="sm" :disabled="!tenant.hasAdminPrivileges"/>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <b-button variant="link" size="sm" v-on:click="attributes.push({key: '', values: ''})"
                        v-if="tenant.hasAdminPrivileges">
                Add new attribute
              </b-button>
              <!--              <ul v-if="attributes.length > 0" class="list-inline d-inline-block mb-2">-->
              <!--                <li v-for="(attribute, attributesIndex) in attributes" :key="attributesIndex" class="list-inline-item">-->
              <!--                  <b-form-tag variant="primary" :title="`${attribute.key} = ${attribute.values}`">-->
              <!--                    <div style="display: flex; flex-direction: row;">-->
              <!--                      <label :for="`attributes-${attributesIndex}`">{{ attribute.key }} =</label>-->
              <!--                      <b-form-input :id="`attributes-${attributesIndex}`" v-model="attribute.values"/>-->
              <!--                    </div>-->
              <!--                  </b-form-tag>-->
              <!--                </li>-->
              <!--              </ul>-->
            </table-overlay-info>
          </div>

        </div>

      </div>
    </b-overlay>
  </TenantHome>
</template>

<script>
import TenantHome from "@/components/admin-portal/TenantHome";
import store from "@/new-service/store";
import TableOverlayInfo from "@/components/table-overlay-info";
import {
  VALIDATION_REGEX_EMAIL,
  VALIDATION_REGEX_FIRST_NAME,
  VALIDATION_REGEX_LAST_NAME
} from "@/components/validation-regex";
// import TableOverlayInfo from "@/components/table-overlay-info";

export default {
  name: "TenantUser",
  components: {TableOverlayInfo, TenantHome},
  store: store,
  data() {
    return {
      processing: false,
      errors: [],

      firstName: null,
      lastName: null,
      email: null,
      realmRoles: [],
      clientRoles: [],
      attributes: null, // [{key: "a", values: ["1", "2", "3"]}, {key: "b", values: ["fhfhf"]}]

      rolesToBeDisabled: ["uma_authorization", "offline_access"],

      inputFieldsList: ["firstName", "lastName", "email", "realmRoles", "clientRoles", "attributes"]
    }
  },
  computed: {
    inputState() {
      return {
        username: this.username === null ? null : this.isValid.username,
        firstName: this.firstName === null ? null : this.isValid.firstName,
        lastName: this.lastName === null ? null : this.isValid.lastName,
        email: this.email === null ? null : this.isValid.email,
        realmRoles: null,
        clientRoles: null,
        attributes: null
      }
    },
    isValid() {
      return {
        username: !!this.username && this.username.length > 0,
        firstName: !!this.firstName && VALIDATION_REGEX_FIRST_NAME.test(this.firstName),
        lastName: !!this.lastName && VALIDATION_REGEX_LAST_NAME.test(this.lastName),
        email: !!this.email && VALIDATION_REGEX_EMAIL.test(this.email),
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
      return this.$store.getters["user/getUser"]({clientId: this.clientId, username: this.username})
    },
    tenant() {
      return this.$store.getters["tenant/getTenant"]({clientId: this.clientId});
    },
    breadcrumbLinks() {
      const _breadcrumbLinks = [];

      if (this.tenant) {
        _breadcrumbLinks.push({
          to: `/tenants/${this.clientId}/users`,
          name: "Users",
          disabled: !this.tenant.hasAdminPrivileges
        });
      }

      if (this.user) {
        // alert("this.tenant.hasAdminPrivileges " + this.tenant.hasAdminPrivileges)
        _breadcrumbLinks.push({
          to: `/tenants/${this.clientId}/users/${this.username}`,
          name: this.title,
          disabled: !this.tenant.hasAdminPrivileges
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
        return _roles.map(({name}) => {
          return {value: name, text: name, disabled: this.rolesToBeDisabled.indexOf(name) >= 0}
        });
      } else {
        return [];
      }
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
    async onClickSave() {
      this.makeFormVisited();

      if (this.isFormValid) {
        this.processing = true;

        try {
          if (this.tenant.hasAdminPrivileges) {
            await this.$store.dispatch("user/updateUser", {
              clientId: this.clientId,
              username: this.username,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              realmRoles: this.realmRoles,
              clientRoles: this.clientRoles,
              attributes: this.attributes.map(({key, values}) => {
                return {key: key, values: values.split(",").map(value => value.trim())};
              }).filter(({key}) => key.length > 0)
            });
          } else {
            await this.$store.dispatch("user/updateUser", {
              clientId: this.clientId,
              username: this.username,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email
            });
          }
        } catch (error) {
          this.errors.push({
            title: "Unknown error when updating the user profile.",
            source: error, variant: "danger"
          });
        }

        this.processing = false;
      }
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
        this.attributes = this.user.attributes.map(({key, values}) => {
          return {key: key, values: values.join(", ")};
        });
      }
    }
  }
  ,
  mounted() {
    this.$store.dispatch("user/fetchUsers", {clientId: this.clientId, username: this.username});
    this.$store.dispatch("tenant/fetchTenantRoles", {clientId: this.clientId, clientLevel: true});
    this.$store.dispatch("tenant/fetchTenantRoles", {clientId: this.clientId, clientLevel: false});

    if (this.user) {
      console.log("########## user watch")
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.realmRoles = this.user.realmRoles;
      this.clientRoles = this.user.clientRoles;
      this.attributes = this.user.attributes.map(({key, values}) => {
        return {key: key, values: values.join(", ")};
      });
    }
  }
}
</script>

<style scoped>

</style>