<template>
  <TenantHome :title="title" :breadcrumb-links="breadcrumbLinks">
    <div class="w-100" style="max-width: 600px;">
      <div class="w-100 text-center">
        <b-form @submit="onSubmit" class="pr-3 pl-3 text-left" style="width: 800px;display: inline-block;"
                autocomplete="off">
          <b-tabs align="center" justified>
            <b-tab title="Step 1" :active="tabIndex===1" v-on:click="onTabClick(1)">
              <div class="pt-3 text-center tab-title">Admin Account Information</div>
              <div class="pt-3">
                <label for="username">Username</label>
                <b-form-input
                    v-model="username"
                    :state="inputState.username"
                    id="username"
                    trim
                    size="sm"
                    readonly>
                </b-form-input>
                <b-form-invalid-feedback>
                  Enter at least 3 letters
                </b-form-invalid-feedback>
              </div>
              <div class="pt-3" style="display: flex; flex-direction: row;">
                <div style="flex: 1;" class="mr-2">
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
                <div style="flex: 1;" class="ml-2">
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
              </div>
              <div class="pt-3">
                <label for="email">Email</label>
                <b-form-input
                    v-model="email"
                    :state="inputState.email"
                    type="email"
                    id="email"
                    trim
                    size="sm">
                </b-form-input>
                <b-form-invalid-feedback>
                </b-form-invalid-feedback>
              </div>
              <div class="pt-3">
                <label for="new-password">Password</label>
                <b-form-input
                    v-model="password"
                    :state="inputState.password"
                    id="new-password"
                    type="password"
                    size="sm"
                    aria-describedby="password-help-block">
                </b-form-input>
                <b-form-text id="password-help-block">
                  Your password must be at least 8 characters long, and must contain letters and
                  numbers, and must at least one special character.
                </b-form-text>
                <b-form-invalid-feedback>
                </b-form-invalid-feedback>
              </div>
              <div class="pt-3">
                <label for="confirm-password">Confirm Password</label>
                <b-form-input
                    v-model="confirmPassword"
                    :state="inputState.confirmPassword"
                    id="confirm-password"
                    type="password"
                    size="sm">
                </b-form-input>
                <b-form-invalid-feedback>
                </b-form-invalid-feedback>
              </div>
            </b-tab>
            <b-tab title="Step 2" :active="tabIndex===2" v-on:click="onTabClick(2)">
              <div class="content">
                <div class="pt-3">
                  <label for="tenantName">Tenant Name</label>
                  <b-form-input
                      v-model="tenantName"
                      :state="inputState.tenantName"
                      id="tenantName"
                      trim
                      size="sm"
                      placeholder="Name of your OAuth 2.0 client"
                      aria-describedby="tenantName-help-block">
                  </b-form-input>
                  <b-form-text id="tenantName-help-block">
                    The Client Name is displayed to end-users on the Identity Provider selection page.
                  </b-form-text>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
                <div class="pt-3">
                  <label>Redirect URI</label>
                  <div class="pb-2" v-for="(redirectUri, redirectUriIndex) in redirectUris" :key=redirectUriIndex>
                    <label :for="`redirectUri-${redirectUriIndex}`"
                           style="visibility: hidden;line-height: 0px;margin: 0px;position: absolute;">
                      Redirect URI {{ redirectUriIndex }}</label>
                    <b-input-group>
                      <b-form-input
                          v-model="redirectUris[redirectUriIndex]"
                          :state="inputState.redirectUris[redirectUriIndex]"
                          :id="`redirectUri-${redirectUriIndex}`"
                          trim
                          type="url"
                          size="sm">
                      </b-form-input>
                      <b-input-group-append>
                        <b-button size="sm" v-if="redirectUris.length > 1"
                                  v-on:click="redirectUris = redirectUris.filter((r,i)=> i !== redirectUriIndex)">
                          Remove
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <b-form-invalid-feedback>
                    </b-form-invalid-feedback>
                  </div>
                  <b-button size="sm" variant="link" v-on:click="redirectUris.push('')">Add another URI</b-button>
                </div>
                <div class="pt-3">
                  <label for="scope">Scope</label>
                  <b-form-checkbox-group
                      v-model="scope"
                      :options="['openid', 'email', 'profile', 'org.cilogon.userinfo']"
                      :state="inputState.scope"
                      id="scope"
                      trim
                      size="sm"
                      aria-describedby="scope-help-block">
                  </b-form-checkbox-group>
                  <b-form-text id="scope-help-block">
                    <b-link href="https://www.cilogon.org/oidc#h.p_PEQXL8QUjsQm">Information on scopes</b-link>
                  </b-form-text>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
                <div class="pt-3">
                  <label for="domain">Domain</label>
                  <b-form-input
                      v-model="domain"
                      :state="inputState.domain"
                      id="domain"
                      trim
                      size="sm"
                      placeholder="idp.htrc.indiana.edu">
                  </b-form-input>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
                <div class="pt-3">
                  <label for="clientUri">Client URI</label>
                  <b-form-input
                      v-model="clientUri"
                      :state="inputState.clientUri"
                      id="clientUri"
                      trim
                      size="sm">
                  </b-form-input>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
                <div class="pt-3">
                  <label for="logoUri">Logo URI</label>
                  <b-form-input
                      v-model="logoUri"
                      :state="inputState.logoUri"
                      id="logoUri"
                      trim
                      size="sm">
                  </b-form-input>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
                <div class="pt-3">
                  <label for="comment">Comment</label>
                  <b-form-input
                      v-model="comment"
                      :state="inputState.comment"
                      id="comment"
                      trim
                      size="sm"
                      placeholder="Provide description of the new tenant and any other comments here (at least 15 characters long)">
                  </b-form-input>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
                <div class="pt-3">
                  <label for="applicationType">Application Type</label>
                  <b-form-radio-group
                      :options="['web']"
                      v-model="applicationType"
                      :state="inputState.applicationType"
                      id="applicationType"
                      trim
                      size="sm">
                  </b-form-radio-group>
                  <b-form-invalid-feedback>
                  </b-form-invalid-feedback>
                </div>
              </div>
            </b-tab>
            <b-tab title="Step 3" :active="tabIndex===3" v-on:click="onTabClick(3)">
              <div style="padding: 20px;text-align: center;">
                <div>
                  <strong>Client ID</strong> : {{ newClientId }}
                </div>
                <div>
                  <strong>Client Secret</strong> : {{ newClientSecret }}
                </div>
              </div>
            </b-tab>
          </b-tabs>
          <div class="pt-3 text-center">
            <b-button v-if="tabIndex > 1 && tabIndex <= 2" variant="secondary" v-on:click="onClickPrev" class="mr-3">
              Back
            </b-button>
            <b-button v-if="tabIndex === 1" variant="primary" v-on:click="onClickNext">
              Next
            </b-button>
            <b-button v-if="tabIndex === 2" variant="primary" v-on:click="onClickNext">
              Create Tenant
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </TenantHome>
</template>

<script>
import store from "../../new-service/store";
import {custosService} from "@/new-service/store/util/custos.util";
import TenantHome from "@/components/admin-portal/TenantHome";

export default {
  components: {TenantHome},
  store: store,
  props: {
    requesterEmail: String,
    tenantId: String
  },
  computed: {
    tenantsTitle() {
      if (this.tenant && this.tenant.type === "SUPER_TENANT") {
        return "Admin Clients";
      } else if (this.tenant && this.tenant.type === "ADMIN_TENANT") {
        return "Child Clients";
      } else {
        return "Clients";
      }
    },
    title() {
      if (this.tenant && this.tenant.type === "SUPER_TENANT") {
        return "New Admin Client";
      } else if (this.tenant && this.tenant.type === "ADMIN_TENANT") {
        return "New Child Client";
      } else {
        return "New Client";
      }
    },
    clientId() {
      if (this.$route.params.clientId) {
        return this.$route.params.clientId;
      } else {
        return custosService.clientId;
      }
    },
    tenant() {
      return this.$store.getters["tenant/getTenant"]({clientId: this.clientId});
    },
    clientSecret() {
      if (this.tenant) {
        return this.tenant.clientSecret;
      } else {
        return null;
      }
    },
    state() {
      return this.name.length >= 4 ? true : false
    },
    invalidFeedback() {
      return ''
    },
    validFeedback() {
      return ''
    },
    inputState() {
      return {
        username: this.username === null ? null : this.isValid.username,
        firstName: this.firstName === null ? null : this.isValid.firstName,
        lastName: this.lastName === null ? null : this.isValid.lastName,
        email: this.email === null ? null : this.isValid.email,
        password: this.password === null ? null : this.isValid.password,
        confirmPassword: this.confirmPassword === null ? null : this.isValid.confirmPassword,

        tenantName: null,
        redirectUris: [null],
        scope: null,
        domain: null,
        clientUri: null,
        logoUri: null,
        comment: null,
        applicationType: null
      }
    },
    isValid() {
      return {
        username: !!this.username && this.username.length > 0,
        firstName: !!this.firstName && this.firstName.length > 0,
        lastName: !!this.lastName && this.lastName.length > 0,
        email: !!this.email && this.email.length > 0,
        password: !!this.password && /[a-z]/.test(this.password) && // checks for a-z
            /[0-9]/.test(this.password) && // checks for 0-9
            /\W|_/.test(this.password) && // checks for special char
            this.password.length >= 8,
        confirmPassword: !!this.confirmPassword && this.confirmPassword === this.password,

        tenantName: false,
        redirectUris: [false],
        scope: false,
        domain: false,
        clientUri: false,
        logoUri: false,
        comment: false,
        applicationType: false
      }
    },
    isTabValid() {
      let _isTabValid = true;
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        _isTabValid = _isTabValid && this.isValid[this.inputFieldsList[i]];
      }

      return _isTabValid;
    },
    inputFieldsList() {
      if (this.tabIndex === 1) {
        return ["username", "firstName", "lastName", "email", "password", "confirmPassword"];
      } else {
        return []
      }
    },
    breadcrumbLinks() {
      return [
        {to: `/tenants/${this.clientId}/child-tenants`, name: this.tenantsTitle},
        {to: `/tenants/${this.clientId}/child-tenants/new`, name: "New"}
      ];
    }
  },
  data() {
    return {
      tabIndex: 1,
      isSubmitted: false,

      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,

      tenantName: null,
      redirectUris: [null],
      scope: ['openid', 'email', 'profile', 'org.cilogon.userinfo'],
      domain: null,
      clientUri: null,
      logoUri: null,
      comment: null,
      applicationType: "web",

      newClientId: null,
      newClientSecret: null
    }
  },
  methods: {
    makeTabVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
    onTabClick(tabIndex) {
      this.tabIndex = tabIndex;
    },
    onSubmit() {
      this.onClickNext()
    },
    async onClickNext() {
      this.makeTabVisited();

      if (this.isTabValid) {
        if (this.tabIndex === 2) {
          const {clientId, clientSecret} = await this.$store.dispatch("tenant/createTenant", {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,

            tenantName: this.tenantName,
            redirectUris: this.redirectUris,
            scope: this.scope,
            domain: this.domain,
            clientUri: this.clientUri,
            logoUri: this.logoUri,
            comment: this.comment,
            applicationType: this.applicationType,

            parentClientId: this.clientId,
            parentClientSecret: this.clientSecret
          });

          this.newClientId = clientId;
          this.newClientSecret = clientSecret;
        }

        this.tabIndex++;
      }

    },
    onClickPrev() {
      this.tabIndex--;
    },
    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  async mounted() {
    const username = await this.$store.getters["auth/currentUsername"];
    const user = await this.$store.getters["user/getUser"]({username});
    if (user) {
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    }

    await this.$store.dispatch("tenant/fetchTenantSecret", {clientId: this.clientId});
  }
}
</script>

<style scoped>
label {
  font-size: 0.9rem;
  font-weight: 500;
}

.tab-title {
  font-weight: 800;
}
</style>
