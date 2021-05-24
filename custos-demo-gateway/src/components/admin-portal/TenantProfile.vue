<template>
  <TenantHome title="Profile">
    <div>
      <div style="padding: 10px; max-width: 600px;">
        <div class="pt-3" style="display: flex; flex-direction: row;">

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
          <label for="clientId">Client ID</label>
          <b-form-input
              v-model="clientId"
              id="clientId"
              size="sm"
              readonly>
          </b-form-input>
        </div>

        <div class="pt-3">
          <label for="clientSecret">Secret</label>
          <b-form-input
              v-model="clientSecret"
              id="clientSecret"
              size="sm"
              readonly>
          </b-form-input>
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
      <div>
        <b-button variant="primary" size="sm" v-on:click="onClickSave">Save Changes</b-button>
        <b-button variant="secondary" size="sm">Cancel</b-button>
      </div>
    </div>
  </TenantHome>
</template>

<script>
import store from "../../new-service/store";
import TenantHome from "@/components/admin-portal/TenantHome";

export default {
  name: "TenantProfile",
  store: store,
  components: {TenantHome},
  data() {
    return {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      // password: null,
      // confirmPassword: null,

      tenantId: null,
      tenantName: null,
      redirectUris: [null],
      scope: [],
      domain: null,
      clientUri: null,
      logoUri: null,

      comment: null,
      applicationType: null,

      // clientId: null,
      clientSecret: null
    }
  },
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    tenant() {
      return this.$store.getters["tenant/getTenant"]({clientId: this.clientId});
    },
    inputState() {
      return {
        username: this.username === null ? null : this.isValid.username,
        firstName: this.firstName === null ? null : this.isValid.firstName,
        lastName: this.lastName === null ? null : this.isValid.lastName,
        email: this.email === null ? null : this.isValid.email,
        // password: this.password === null ? null : this.isValid.password,
        // confirmPassword: this.confirmPassword === null ? null : this.isValid.confirmPassword,

        tenantName: null,
        redirectUris: [null],
        scope: null,
        domain: null,
        clientUri: null,
        logoUri: null,
        // clientId: null,
        // parentSecret: null,
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
        // clientId: false,
        // parentSecret: false,
        comment: false,
        applicationType: false
      }
    }
  },
  watch: {
    tenant() {
      this.username = this.tenant.username;
      this.firstName = this.tenant.firstName;
      this.lastName = this.tenant.lastName;
      this.email = this.tenant.email;

      this.tenantId = this.tenant.tenantId;
      this.tenantName = this.tenant.name;
      this.redirectUris = this.tenant.redirectUris;
      this.scope = this.tenant.scope.split(" ");
      this.domain = this.tenant.domain;
      this.clientUri = this.tenant.clientUri;
      this.logoUri = this.tenant.logoUri;

      this.comment = this.tenant.comment;
      this.applicationType = this.tenant.applicationType;

      // this.clientId = this.tenant.tenantId;
      this.clientSecret = this.tenant.clientSecret;
    }
  },
  methods: {
    async onClickSave() {
      await this.$store.dispatch("tenant/updateTenant", {
        clientId: this.clientId,
        tenantId: this.tenantId,

        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        // password: this.password,

        tenantName: this.tenantName,
        redirectUris: this.redirectUris,
        scope: this.scope,
        domain: this.domain,
        clientUri: this.clientUri,
        logoUri: this.logoUri,
        comment: this.comment,
        applicationType: this.applicationType
      });
    }
  }
}
</script>

<style scoped>
label {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>