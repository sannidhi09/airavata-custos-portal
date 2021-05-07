<template>
  <div class="w-100 text-center">
    <b-form @submit="onSubmit" class="pr-3 pl-3 text-left" style="width: 800px;display: inline-block;">
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
            <label for="password">Password</label>
            <b-form-input
                v-model="password"
                :state="inputState.password"
                id="password"
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
            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                id="fieldset-9"-->
            <!--                description="The Client Name is displayed to end-users on the Identity Provider selection page."-->
            <!--                label="Tenant Name"-->
            <!--                label-for="client-name"-->
            <!--                class="inputLabels"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                  :state="!$v.form.tab2.client_name.$invalid"-->
            <!--                  id="client-name"-->
            <!--                  name="client-name"-->
            <!--                  trim-->
            <!--                  placeholder="Name of your OAuth 2.0 client"-->
            <!--                  v-model="form.tab2.client_name">-->
            <!--              </b-form-input>-->
            <!--            </b-form-group>-->

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

            <!--            <div v-for="(redirect_uri, index) in form.tab2.redirect_uris" :key=index>-->
            <!--              <b-form-row class="align-items-center">-->
            <!--                <b-col>-->
            <!--                  <b-form-group-->
            <!--                      :invalid-feedback="invalidFeedback"-->
            <!--                      :valid-feedback="validFeedback"-->
            <!--                      id="fieldset-10"-->
            <!--                      description="Enter your callback URL. The redirect_uri parameter must exactly match a URL in this list"-->
            <!--                      label="Redirect URI"-->
            <!--                      label-for="redirect-uri"-->
            <!--                      class="inputLabels"-->
            <!--                  >-->
            <!--                    <b-input-group>-->
            <!--                      <b-form-input-->
            <!--                          :state="!$v.form.tab2.redirect_uris.$each[index].$invalid"-->
            <!--                          id="redirect-uri"-->
            <!--                          name='redirect-uri'-->
            <!--                          trim-->
            <!--                          type="url"-->
            <!--                          v-model="form.tab2.redirect_uris[index]">-->
            <!--                      </b-form-input>-->
            <!--                      <b-input-group-append>-->
            <!--                        <b-button v-if="index > 0" @click="deleteRedirectUri(index)">Delete URI-->
            <!--                        </b-button>-->
            <!--                        <b-button @click="addRedirectUri(index)">Add another URI</b-button>-->

            <!--                      </b-input-group-append>-->
            <!--                    </b-input-group>-->
            <!--                  </b-form-group>-->
            <!--                </b-col>-->
            <!--              </b-form-row>-->
            <!--            </div>-->

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

            <!--            <b-form-group label="Scope:" class="inputLabels">-->
            <!--              <b-form-checkbox-group-->
            <!--                  :options="scopeOptions"-->
            <!--                  id="scope"-->
            <!--                  name="scope"-->
            <!--                  v-model="form.tab2.scope"-->
            <!--              >-->
            <!--                <b-link href="https://www.cilogon.org/oidc#h.p_PEQXL8QUjsQm">Information on scopes</b-link>-->
            <!--              </b-form-checkbox-group>-->
            <!--            </b-form-group>-->

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

            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                description=""-->
            <!--                id="fieldset-11"-->
            <!--                label="Domain"-->
            <!--                label-for="domain"-->
            <!--                class="inputLabels"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                  :state="!$v.form.tab2.domain.$invalid"-->
            <!--                  id="domain"-->
            <!--                  placeholder="idp.htrc.indiana.edu"-->
            <!--                  trim-->
            <!--                  v-model="form.tab2.domain">-->
            <!--              </b-form-input>-->
            <!--            </b-form-group>-->

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

            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                description=""-->
            <!--                id="fieldset-1"-->
            <!--                label="Client URI"-->
            <!--                label-for="client-uri"-->
            <!--                class="inputLabels"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                  :state="!$v.form.tab2.client_uri.$invalid"-->
            <!--                  id="client-uri"-->
            <!--                  trim-->
            <!--                  v-model="form.tab2.client_uri">-->
            <!--              </b-form-input>-->
            <!--            </b-form-group>-->

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

            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                description=""-->
            <!--                id="fieldset-12"-->
            <!--                label="Logo URI"-->
            <!--                label-for="logo-uri"-->
            <!--                class="inputLabels"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                  :state="!$v.form.tab2.logo_uri.$invalid"-->
            <!--                  id="logo-uri"-->
            <!--                  trim-->
            <!--                  type="url"-->
            <!--                  v-model="form.tab2.logo_uri">-->
            <!--              </b-form-input>-->
            <!--            </b-form-group>-->

            <!--            <div class="pt-3">-->
            <!--              <label for="clientId">Parent Tenant ID</label>-->
            <!--              <b-form-input-->
            <!--                  v-model="clientId"-->
            <!--                  :state="inputState.clientId"-->
            <!--                  id="clientId"-->
            <!--                  trim-->
            <!--                  size="sm">-->
            <!--              </b-form-input>-->
            <!--              <b-form-invalid-feedback>-->
            <!--              </b-form-invalid-feedback>-->
            <!--            </div>-->

            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                description=""-->
            <!--                id="fieldset-8"-->
            <!--                label="Parent Tenant ID"-->
            <!--                label-for="client-id"-->
            <!--                class="inputLabels"-->
            <!--                :disabled="!form.tab2.parentID"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                  :state="!$v.form.tab2.parentID.$invalid"-->
            <!--                  id="parent-id"-->
            <!--                  name="parent-id"-->
            <!--                  trim-->
            <!--                  v-model="form.tab2.parentID"-->
            <!--                  :disabled="!form.tab2.parentID"-->
            <!--                  readonly-->
            <!--              >-->
            <!--              </b-form-input>-->
            <!--            </b-form-group>-->

            <!--            <div class="pt-3">-->
            <!--              <label for="parentSecret">Parent Tenant Secret</label>-->
            <!--              <b-form-input-->
            <!--                  v-model="parentSecret"-->
            <!--                  :state="inputState.parentSecret"-->
            <!--                  id="parentSecret"-->
            <!--                  trim-->
            <!--                  size="sm">-->
            <!--              </b-form-input>-->
            <!--              <b-form-invalid-feedback>-->
            <!--              </b-form-invalid-feedback>-->
            <!--            </div>-->

            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                description=""-->
            <!--                id="fieldset-8"-->
            <!--                label="Parent Tenant Secret"-->
            <!--                label-for="parent-secret"-->
            <!--                class="inputLabels"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                  :state="!$v.form.tab2.parentSecret.$invalid"-->
            <!--                  id="parent-secret"-->
            <!--                  name="parent-secret"-->
            <!--                  trim-->
            <!--                  v-model="form.tab2.parentSecret"-->
            <!--                  :disabled="!form.tab2.parentID"-->
            <!--              >-->
            <!--              </b-form-input>-->
            <!--            </b-form-group>-->


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

            <!--            <b-form-group-->
            <!--                :invalid-feedback="invalidFeedback"-->
            <!--                :valid-feedback="validFeedback"-->
            <!--                id="fieldset-13"-->
            <!--                label="Comment"-->
            <!--                label-for="comment"-->
            <!--                class="inputLabels"-->
            <!--            >-->
            <!--              <b-form-textarea-->
            <!--                  :state="!$v.form.tab2.comment.$invalid"-->
            <!--                  id="comment"-->
            <!--                  rows="3" textarea trim-->
            <!--                  placeholder="Provide description of the new tenant and any other comments here (at least 15 characters long) "-->
            <!--                  v-model="form.tab2.comment">-->
            <!--              </b-form-textarea>-->
            <!--            </b-form-group>-->

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

            <!--            <b-form-group label="Application Type">-->
            <!--              <b-form-radio-group-->
            <!--                  :options="application_typeOptions"-->
            <!--                  id="application-type"-->
            <!--                  name="application-type"-->
            <!--                  v-model="form.tab2.application_type"-->
            <!--              ></b-form-radio-group>-->
            <!--            </b-form-group>-->

          </div>
        </b-tab>
        <b-tab title="Step 3" :active="tabIndex===3" v-on:click="onTabClick(3)">
          <div style="padding: 20px;text-align: center;">
            <div>
              <strong>Client ID</strong> : {{ clientId }}
            </div>
            <div>
              <strong>Client Secret</strong> : {{ clientSecret }}
            </div>
          </div>
          <!--        <div class="content">-->
          <!--          <div v-if="(this.clientID === ''&& !this.requestingTenant)">-->
          <!--            <div class="row">-->
          <!--              <div class="col">-->
          <!--                <h1 class="h4 mb-4">Please create a new tenant to view ClientID and Client Secret</h1>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div v-if="(this.requestingTenant)">-->

          <!--            <div v-if="this.requestingTenant" class="text-center">-->
          <!--              <b-spinner variant="primary" style="width: 3rem; height: 3rem;"-->
          <!--                         label="Large Spinner"></b-spinner>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div v-if="(this.clientID !== ''&& !this.requestingTenant)">-->
          <!--            <div class="row">-->
          <!--              <div class="col">-->
          <!--                <div class="card border-default">-->
          <!--                  <div class="card-body">-->
          <!--                    <table class="table">-->
          <!--                      <tbody>-->
          <!--                      <tr>-->
          <!--                        <th scope="row">Tenant ID</th>-->
          <!--                        <td>-->
          <!--                          <div> {{ this.clientID }}</div>-->
          <!--                        </td>-->
          <!--                      </tr>-->
          <!--                      <tr>-->
          <!--                        <th scope="row">Tenant Secret</th>-->
          <!--                        <td>-->
          <!--                          <div> {{ this.clientSecret }}</div>-->
          <!--                        </td>-->
          <!--                      </tr>-->
          <!--                      <tr>-->
          <!--                        <th scope="row">Tenant Status</th>-->
          <!--                        <td>-->
          <!--                          <div> {{ this.status }}</div>-->
          <!--                        </td>-->
          <!--                      </tr>-->
          <!--                      </tbody>-->
          <!--                    </table>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </b-tab>
      </b-tabs>
      <div class="pt-3 text-center">
        <b-button-group class="mt-2">
          <b-button v-if="tabIndex > 1 && tabIndex <= 2" variant="primary" v-on:click="onClickPrev">Previous
          </b-button>
          <b-button v-if="tabIndex === 1" variant="primary" v-on:click="onClickNext">Next
          </b-button>
          <b-button v-if="tabIndex === 2" variant="primary" v-on:click="onClickNext">Create
            Tenant
          </b-button>
        </b-button-group>
      </div>
    </b-form>
  </div>
</template>

<script>
// import {email, required, minLength} from "vuelidate/lib/validators";
// import config from "@/config";
import store from "../../new-service/store";

export default {
  store: store,
  props: {
    requesterEmail: String,
    tenantId: String
  },
  computed: {
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
      scope: [],
      domain: null,
      clientUri: null,
      logoUri: null,
      // clientId: null,
      // parentSecret: null,
      comment: null,
      applicationType: null,

      clientId: null,
      clientSecret: null

      // custosId: "",
      // custosSec: "",
      // currentUserName: "",
      // user: "",
      // requestingTenant: false,
      // form: {
      //   tab1: {
      //     requester_email: "",
      //     admin_username: "",
      //     admin_first_name: "",
      //     admin_last_name: "",
      //     admin_email: "",
      //     admin_password: "",
      //     confirm_admin_password: "",
      //   },
      //   tab2: {
      //     client_name: "",
      //     redirect_uris: [""],
      //     scope: "openid email profile org.cilogon.userinfo".split(" "),
      //     domain: "",
      //     client_uri: "",
      //     logo_uri: "",
      //     application_type: "web",
      //     comment: "",
      //     parentID: "",
      //     parentSecret: "",
      //   },
      //   primary_contact: "",
      //   secondary_contact: "",
      //
      //
      // },
      // scopeOptions: [
      //   {text: "openId", value: "openid", disabled: "true"},
      //   {text: "email", value: "email", disabled: "true"},
      //   {text: "profile", value: "profile", disabled: "true"},
      //   {text: "org.cilogon.userinfo", value: "org.cilogon.userinfo", disabled: "true"},
      // ],
      // application_typeOptions: [
      //   {text: "web", value: "web"},
      // ],
      // clientID: 'testing-client',
      // clientSecret: 'testing-secret',
      // status: 'REQUESTED'
    }
  },
  // validations: {
  //   form: {
  //     tab1: {
  //       requester_email: {email},
  //       admin_username: {required},
  //       admin_first_name: {required},
  //       admin_last_name: {required},
  //       admin_email: {required},
  //       admin_password: {
  //         required,
  //         strongPassword(admin_password) {
  //           return (
  //               /[a-z]/.test(admin_password) && // checks for a-z
  //               /[0-9]/.test(admin_password) && // checks for 0-9
  //               /\W|_/.test(admin_password) && // checks for special char
  //               admin_password.length >= 8
  //           );
  //         }
  //       },
  //       confirm_admin_password: {
  //         required,
  //         strongPassword(confirm_admin_password) {
  //           return (
  //               // /[a-z]/.test(admin_password) && // checks for a-z
  //               // /[0-9]/.test(admin_password) && // checks for 0-9
  //               // /\W|_/.test(admin_password) && // checks for special char
  //               // admin_password.length >= 8
  //               confirm_admin_password == this.form.tab1.admin_password
  //           );
  //         }
  //       },
  //     },
  //
  //     tab2: {
  //       client_name: {required},
  //       scope: {required},
  //       domain: {
  //         required,
  //         validDomain(domain) {
  //           return (
  //               /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,}\.?((xn--)?([a-z0-9\-.]{1,61}|[a-z0-9-]{1,30})\.?[a-z]{2,})$/.test(domain)
  //           )
  //         }
  //       },
  //       client_uri: {
  //         required,
  //         validURL(client_uri) {
  //           return (
  //               /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(client_uri)
  //           )
  //         }
  //
  //       },
  //       logo_uri: {
  //         required,
  //         validURL(logo_uri) {
  //           return (
  //               /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(logo_uri)
  //           )
  //         }
  //       },
  //       application_type: {required},
  //       redirect_uris: {
  //         $each: {
  //           required,
  //           validURL(url) {
  //             return (
  //                 /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url)
  //             )
  //           }
  //         }
  //       },
  //       comment: {required, minLength: minLength(15)},
  //       parentID: {},
  //       parentSecret: {
  //         validate(parentSecret) {
  //           if (this.form.tab2.parentID) {
  //             return (
  //                 parentSecret
  //             )
  //           } else {
  //             return (
  //                 true
  //             )
  //           }
  //         }
  //       }
  //
  //     },
  //     primary_contact: {required},
  //     secondary_contact: {},
  //
  //
  //   }
  // },
  methods: {
    // getInputFieldList(tabIndex) {
    //   if (tabIndex === 0) {
    //     return ["username", "firstName", "lastName", "email", "password", "confirmPassword"]
    //   }
    // },
    makeTabVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
    // isTabValid() {
    //   let _isTabValid = true;
    //   for (let i = 0; i < this.inputFieldsList.length; i++) {
    //     if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
    //     _isTabValid = _isTabValid && this.isValid[this.inputFieldsList[i]];
    //   }
    //
    //   return _isTabValid
    // },
    // isSubmitDisabled() {
    //   if (!this.isSubmitted)
    //     return this.$v.form.$invalid;
    //   return this.isSubmitted;
    // },
    // linkClass(idx) {
    //   if (this.tabIndex === idx) {
    //     return ['bg-primary', 'text-light']
    //   } else {
    //     return ['bg-light', 'text-info']
    //   }
    // },
    onTabClick(tabIndex) {
      this.tabIndex = tabIndex;
    },
    async onSubmit() {
      // event.preventDefault();
      // this.isSubmitted = true;
      // this.requestingTenant = true
      // this.tabIndex++;
      //
      // if (!this.$v.form.tab1.$invalid && !this.$v.form.tab2.$invalid) {
      //   let requester_email = this.$v.form.tab1.admin_email.$model;
      //   let admin_username = this.$v.form.tab1.admin_username.$model;
      //   let admin_first_name = this.$v.form.tab1.admin_first_name.$model;
      //   let admin_last_name = this.$v.form.tab1.admin_last_name.$model;
      //   let admin_email = this.$v.form.tab1.admin_email.$model;
      //   let admin_password = this.$v.form.tab1.admin_password.$model;
      //   let client_name = this.$v.form.tab2.client_name.$model;
      //   let redirect_uris = this.$v.form.tab2.redirect_uris.$model;
      //   let scope = this.$v.form.tab2.scope.$model;
      //   let domain = this.$v.form.tab2.domain.$model;
      //   let client_uri = this.$v.form.tab2.client_uri.$model;
      //   let logo_uri = this.$v.form.tab2.logo_uri.$model;
      //   let comment = this.$v.form.tab2.comment.$model;
      //   let application_type = this.$v.form.tab2.application_type.$model;
      //   let scopeString = '';
      //   for (var i = 0; i < scope.length; i++) {
      //     scopeString += scope[i] + " "
      //   }
      //   scopeString = scopeString.trim()
      //   let contacts = [];
      //   contacts.push(requester_email);
      //
      //   let body = {
      //     "client_name": client_name,
      //     "requester_email": requester_email,
      //     "admin_username": admin_username,
      //     "admin_first_name": admin_first_name,
      //     "admin_last_name": admin_last_name,
      //     "admin_email": admin_email,
      //     "contacts": contacts,
      //     "redirect_uris": redirect_uris,
      //     "scope": scopeString,
      //     "domain": domain,
      //     "admin_password": admin_password,
      //     "client_uri": client_uri,
      //     "logo_uri": logo_uri,
      //     "application_type": application_type,
      //     "comment": comment
      //   }
      //
      //
      //   if (this.$v.form.tab2.parentID.$model && this.$v.form.tab2.parentSecret.$model) {
      //     let data = {
      //       client_id: this.$v.form.tab2.parentID.$model,
      //       client_sec: this.$v.form.tab2.parentSecret.$model,
      //       body: body
      //     }
      //
      //     let response = await this.$store.dispatch('tenant/createChildTenant', data)
      //     this.clientID = response.client_id
      //     this.clientSecret = response.client_secret
      //     if (response.is_activated) {
      //       this.status = "ACTIVE"
      //     }
      //
      //
      //   } else {
      //     let data = {
      //       body: body
      //     }
      //     let response = await this.$store.dispatch('tenant/createAdminTenant', data)
      //     this.clientID = response.client_id
      //     this.clientSecret = response.client_secret
      //     if (response.is_activated) {
      //       this.status = "ACTIVE"
      //     }
      //
      //   }
      //
      //
      //   this.requestingTenant = false
      // }
    },
    // addRedirectUri: function () {
    //   this.form.tab2.redirect_uris.push("");
    // },
    // deleteRedirectUri: function (index) {
    //   if (index > 0) {
    //     this.form.tab2.redirect_uris.splice(index, 1);
    //   }
    // },

    async onClickNext() {
      this.makeTabVisited();

      if (this.isTabValid) {
        if (this.tabIndex === 2) {
          const {clientId, clientSecret} = await this.$store.dispatch("tenant/createChildTenant", {
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
            applicationType: this.applicationType
          });

          this.clientId = clientId;
          this.clientSecret = clientSecret;
        }

        this.tabIndex++;
      }

    },
    onClickPrev() {
      this.tabIndex--;
    },

    // eslint-disable-next-line no-unused-vars
    enableNextButton(tabIndex) {
      if (tabIndex === 1) {
        return !this.isValid.username || !this.isValid.firstName || !this.isValid.lastName ||
            !this.isValid.email || !this.isValid.password || !this.isValid.confirmPassword
      }
      if (tabIndex === 2) {
        // TODO
      }
    },

    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


  },

  async mounted() {
    const username = await this.$store.getters["auth/currentUsername"]
    await this.$store.dispatch('user/fetchUsers', {username})
    const user = await this.$store.getters["user/getUser"]({username})
    if (user) {
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    }
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

/*.btn:hover {*/
/*  color: white;*/
/*  background-color: #944203;*/
/*  padding: 10px 25px;*/
/*  border: 1px solid #944203;*/
/*  border-radius: 8px;*/
/*}*/

/*.btn:focus {*/
/*  color: white;*/
/*  background-color: #944203;*/
/*  padding: 10px 25px;*/
/*  border: 1px solid #944203;*/
/*  border-radius: 8px;*/
/*}*/

/*.link {*/
/*  color: #ff6600;*/
/*}*/

/*.h-tab {*/
/*  display: flex;*/
/*  max-height: 500px;*/
/*  margin-top: 20px;*/
/*  padding: 20px;*/
/*}*/

/*.h-tabs {*/
/*  flex: 8;*/
/*}*/

/*.tab-content {*/
/*  flex: 1;*/
/*  border-bottom: 3px solid black;*/
/*  padding: 8px;*/
/*  color: black;*/
/*  font-weight: bold;*/
/*  cursor: pointer;*/
/*  font-size: 20px;*/
/*}*/

/*.tab-content-active {*/
/*  flex: 1;*/
/*  border-bottom: 3px solid #ff6600;;*/
/*  padding: 8px;*/
/*  color: #ff6600;*/
/*  font-weight: bold;*/
/*  cursor: pointer;*/
/*  font-size: 20px;*/
/*}*/

/*.content {*/
/*  margin-top: 20px;*/
/*  width: 1000px;*/
/*  margin-left: 35px;*/
/*}*/

/*.heading {*/
/*  font-size: 30px;*/
/*  color: black;*/
/*  font-weight: bold;*/
/*}*/

/*.card {*/
/*  padding: 25px;*/
/*}*/

/*.btnCustom {*/
/*  color: white;*/
/*  background-color: #ff6600;*/
/*  padding: 10px 25px;*/
/*  border: 1px solid #ff6600;*/
/*  border-radius: 8px;*/
/*}*/

/*.btnCustom:hover {*/
/*  color: white;*/
/*  background-color: #944203;*/
/*  padding: 10px 25px;*/
/*  border: 1px solid #944203;*/
/*  border-radius: 8px;*/
/*}*/

/*.btnCustom:focus {*/
/*  color: white;*/
/*  background-color: #944203;*/
/*  padding: 10px 25px;*/
/*  border: 1px solid #944203;*/
/*  border-radius: 8px;*/
/*}*/

/*.inputLabels {*/
/*  color: black;*/
/*  font-weight: bold;*/
/*}*/
</style>