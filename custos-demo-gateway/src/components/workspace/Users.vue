<template>
    <div>
        <div class="w-100">
            <h2>Manage Users</h2>
        </div>
        <form class="userSearchBar mb-5" v-on:submit.prevent="searchResult">
            <b-input-group>
                <b-form-input size="sm" v-model="searchUsername" placeholder="Search"></b-form-input>
                <b-input-group-append>
                    <b-button size="sm" type="submit">
                        <b-icon icon="search"></b-icon>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </form>
        <div v-if="this.userloading" class="d-flex justify-content-center w-100">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div class="usertable w-100">

            <b-table striped hover responsive :items="items" :fields="fields" selectable small
                     ref="selectableTable"
                     select-mode="single"
                     :per-page="perPage"
                     :current-page="currentPage"
                     @row-selected="onRowSelected" caption-top>

                <template v-slot:cell(status)="data">
                    <b-badge v-if="data.value == 'ACTIVE'" variant="success">Active</b-badge>
                    <b-badge v-if="data.value == 'INACTIVE'" variant="danger">Inactive</b-badge>
                    <b-badge v-if="data.value == 'PENDING'" variant="warning">Pending</b-badge>
                </template>

            </b-table>

            <div>
                <b-pagination
                        size="sm"
                        class="float-right"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                ></b-pagination>
            </div>
        </div>

        <div>
            <b-modal ref="usermodel" scrollable title="User Profile" ok-title="Update" @ok="this.updateUserProfile">
                <div class="userform">
                    <div class="userformItem">
                        <p>Username</p>
                        <b-form-input v-model="selectedUsername" disabled></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>First Name</p>
                        <b-form-input v-model="selectedFirstName"></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Last Name</p>
                        <b-form-input v-model="selectedLastName"></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Email</p>
                        <b-form-input v-model="selectedEmail"></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Status</p>
                        <b-form-select v-model="selectedStatus">
                            <option v-for="(selectOption, indexOpt) in statusOptions"
                                    :key="indexOpt"
                                    :value="selectOption"
                            >
                                {{ selectOption }}
                            </option>
                        </b-form-select>
                    </div>
                    <div v-if="!this.operationCompleted" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div class="userformItem">
                        <p>Attributes</p>
                        <b-table striped hover responsive :items="selectedAttributes" selectable
                                 select-mode="single"
                                 @row-selected="onAtrSelected">
                        </b-table>
                        <dev class="addAtrCls">
                            <b-button variant="outline-primary" v-on:click="addAttribute">Add Attributes</b-button>
                        </dev>
                    </div>
                    <div class="userformItem">
                        <p>Roles</p>
                        <b-table striped hover responsive :items="selectedRoles" selectable select-mode="single"
                                 @row-selected="onRoleSelected">
                        </b-table>
                        <dev class="addAtrCls">
                            <b-button variant="outline-primary" v-on:click="addRole"
                                      :disabled="this.isAdminUser==false">Add Role
                            </b-button>
                        </dev>
                    </div>

                </div>
            </b-modal>
            <b-modal ref="atrModel" scrollable title="Add Attribute" ok-title="Add" @ok="addAtrOkPressed">
                <div class="userform">
                    <div class="userformItem">
                        <p>Key</p>
                        <b-form-input v-model="newKey"></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Value</p>
                        <b-form-input v-model="newValue"></b-form-input>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="atrModelSelected" scrollable title="Attribute" ok-title="Delete"
                     @ok="addAtrDeletePressed">
                <div class="userform">
                    <div class="userformItem">
                        <p>Key</p>
                        <b-form-input v-model="selectedKey" disabled></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Value</p>
                        <b-form-input v-model="selectedValue" disabled></b-form-input>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="roleModel" scrollable title="Add  Role" ok-title="Add" @ok="addRoleOkPressed">
                <div class="userform">
                    <div class="userformItem">
                        <p>Scope</p>
                        <b-form-select v-model="selectedScope">
                            <option v-for="(selectOption, indexOpt) in scopes"
                                    :key="indexOpt"
                                    :value="selectOption"
                            >
                                {{ selectOption }}
                            </option>
                        </b-form-select>
                    </div>
                    <div class="userformItem">
                        <p>Role</p>
                        <div v-if="selectedScope==='TENANT'">
                            <b-form-select v-model="selectedRole">
                                <option v-for="(selectOption, indexOpt) in tenantroles"
                                        :key="indexOpt"
                                        :value="selectOption"
                                >
                                    {{ selectOption }}
                                </option>
                            </b-form-select>
                        </div>
                        <div v-if="selectedScope==='CLIENT'">
                            <b-form-select v-model="selectedRole">
                                <option v-for="(selectOption, indexOpt) in clientroles"
                                        :key="indexOpt"
                                        :value="selectOption"
                                >
                                    {{ selectOption }}
                                </option>
                            </b-form-select>
                        </div>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="roleModelSelected" scrollable title="Role" ok-title="Delete" @ok="deleteRoleOkPressed">
                <div class="userform">
                    <div class="userformItem">
                        <p>Role</p>
                        <b-form-input v-model="rowSelectedRole" disabled></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Scope</p>
                        <b-form-input v-model="rowSelectedScope" disabled></b-form-input>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Users",
        data: function () {
            return {
                fields: ['username', 'first_name', 'last_name', 'email', 'status'],
                community_fields: ['id'],
                items: [],
                communityAccounts: [{
                    id: 'asdfcvrfg',
                    attributes: [{key: "work", vaule: 8123456789}, {key: "phone", vaule: 8123456789}],
                    roles: [{name: 'agentAdmin', scope: 'TENANT'}]
                },
                    {
                        id: 'zxsdcfvtghy',
                        attributes: [{key: "work", vaule: 8123456789}, {key: "phone", vaule: 8123456789}],
                        roles: [{name: 'user', scope: 'TENANT'}]
                    }

                ],
                statusOptions: ['ACTIVE', 'DISABLE'],
                scopes: ['TENANT', 'CLIENT'],
                tenantroles: [],
                clientroles: [],
                selectedItem: null,
                searchUsername: null,
                selectedUsername: null,
                selectedFirstName: null,
                selectedLastName: null,
                selectedEmail: null,
                selectedStatus: null,
                selectedAttributes: [],
                selectedRoles: [],
                selectedKey: null,
                selectedValue: null,
                newKey: null,
                newValue: null,
                selectedAtr: null,
                selectedRoleItem: null,
                selectedRole: null,
                selectedScope: null,
                rowSelectedRole: null,
                rowSelectedScope: null,
                newScope: null,
                newRole: null,
                checked: false,
                newAccountName: null,
                exAccountId: null,
                exAccount: null,
                accSelectedAttributes: [],
                accSelectedRoles: [],
                exAccountAtr: null,
                exAccountRole: null,
                exAccountAtrKey: null,
                exAccountAtrValue: null,
                exAccountRoleKey: null,
                exAccountRoleValue: null,
                custosId: null,
                custosSec: null,
                isAdminUser: false,
                perPage: 5,
                currentPage: 0,
                userloading: true,
                operationCompleted: true,
                searchUsers: true,
                currentUserName: null

            }
        },
        methods: {
            onRowSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedItem = items
                    this.selectedUsername = this.selectedItem[0].username
                    this.selectedFirstName = this.selectedItem[0].first_name
                    this.selectedLastName = this.selectedItem[0].last_name
                    this.selectedEmail = this.selectedItem[0].email
                    this.selectedStatus = this.selectedItem[0].status
                    this.selectedAttributes = this.selectedItem[0].attributes
                    this.selectedRoles = this.selectedItem[0].roles
                    if ((this.selectedUsername === this.currentUserName || this.isAdminUser) && this.selectedUsername != 'admin') {
                        this.$refs.usermodel.show()
                    }
                }

            },
            clearSelected: function () {
                this.$refs.selectableTable.clearSelected()
            },
            async searchResult() {
                this.searchUsers = false
                if (this.searchUsername == null || this.searchUsername == "") {
                    await this.loadUsers()
                } else {
                    let data = {
                        offset: 0, limit: 1, client_id: this.custosId, client_sec: this.custosSec,
                        username: this.searchUsername
                    }
                    await this.$store.dispatch('user/users', data)
                    let resp = await this.$store.getters['user/getUsers']
                    this.items = []
                    if (Array.isArray(resp) && resp.length > 0) {
                        resp.forEach(obj => {
                            let user = {
                                username: obj.username,
                                first_name: obj.first_name,
                                last_name: obj.last_name,
                                email: obj.email,
                                status: obj.state,
                                attributes: [],
                                roles: []
                            }
                            let rr = obj.realm_roles
                            let cr = obj.client_roles

                            let attribs = obj.attributes

                            attribs.forEach(r => {
                                let newAt = {
                                    key: r.key,
                                    value: r.values.join(",")
                                }
                                user.attributes.push(newAt)
                            })


                            rr.forEach(r => {
                                let rel_role = {
                                    name: r,
                                    scope: 'TENANT'
                                }
                                user.roles.push(rel_role)
                            })

                            cr.forEach(r => {
                                let cl_role = {
                                    name: r,
                                    scope: 'CLIENT'
                                }
                                user.roles.push(cl_role)
                            })

                            this.items.push(user)

                        });
                    }
                }
                this.searchUsers = true
            },
            async addAttribute() {
                this.$refs.atrModel.show()
            },
            onAtrSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedAtr = items
                    this.selectedKey = this.selectedAtr[0].key
                    this.selectedValue = this.selectedAtr[0].value
                    this.$refs.atrModelSelected.show()
                }
            },
            addRole: function () {
                this.$refs.roleModel.show()
            },
            onRoleSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedRoleItem = items
                    if (this.isAdminUser) {
                        this.rowSelectedScope = this.selectedRoleItem[0].scope
                        this.rowSelectedRole = this.selectedRoleItem[0].name
                        this.$refs.roleModelSelected.show()
                    }
                }
            },

            async addAtrOkPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: this.newKey,
                            values: [this.newValue]
                        }],
                        users: [this.selectedUsername]
                    }
                }
                let userAtr = await this.$store.dispatch('user/addUserAttributes', bd)
                if (userAtr) {
                    let atr = {key: this.newKey, value: this.newValue}
                    this.selectedAttributes.push(atr)
                }
                this.operationCompleted = true
                this.newKey = null
                this.newValue = null
                this.loadUsers()
            },
            async addAtrDeletePressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: this.selectedKey,
                            values: [this.selectedValue]
                        }],
                        users: [this.selectedUsername]
                    }
                }
                let userAtr = await this.$store.dispatch('user/deleteUserAttributes', bd)
                if (userAtr) {
                    let newAtr = []
                    this.selectedAttributes.forEach(atr => {

                        if (atr.key != this.selectedKey) {
                            newAtr.push(atr)
                        }
                        this.selectedAttributes = newAtr
                    })
                }
                this.operationCompleted = true
                this.selectedKey = null
                this.selectedValue = null
                this.loadUsers()
            },
            async addRoleOkPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken,
                    body: {
                        roles: [this.selectedRole],
                        usernames: [this.selectedUsername],
                        client_level: (this.selectedScope === 'CLIENT')
                    }
                }
                let userAtr = await this.$store.dispatch('user/addRoleToUser', bd)
                if (userAtr) {
                    if (this.selectedScope === 'CLIENT') {
                        let role = {name: this.selectedRole, scope: "CLIENT"}
                        this.selectedRoles.push(role)
                    } else {
                        let role = {name: this.selectedRole, scope: "TENANT"}
                        this.selectedRoles.push(role)
                    }

                }
                this.operationCompleted = true
                this.selectedRole = null
                this.selectedScope = null
                this.loadUsers()
            },
            async deleteRoleOkPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {};
                if (this.rowSelectedScope === 'TENANT') {
                    bd = {
                        user_token: accessToken,
                        body: {
                            roles: [this.rowSelectedRole],
                            username: this.selectedUsername
                        }
                    }
                } else {
                    bd = {
                        user_token: accessToken,
                        body: {
                            client_roles: [this.rowSelectedRole],
                            username: this.selectedUsername
                        }
                    }
                }

                let deleted = await this.$store.dispatch('user/deleteRoleFromUser', bd)
                if (deleted) {

                    let newRoles = []
                    this.selectedRoles.forEach(atr => {

                        if (atr.name != this.rowSelectedRole) {
                            newRoles.push(atr)
                        }
                        this.selectedRoles = newRoles
                    })
                }
                this.operationCompleted = true
                this.loadUsers()
            },

            async loadUsers() {
                let data = {offset: 0, limit: 5, client_id: this.custosId, client_sec: this.custosSec}
                let resp = await this.$store.dispatch('user/users', data)
                this.userloading = false
                this.items = []
                let newUsersCount = this.parseUsers(this.items, resp)
                if (newUsersCount == 5) {
                    let offset = 5
                    while (newUsersCount >= 5) {
                        newUsersCount = await this.loadUsersR(offset, this.items)
                        offset = offset + 5
                    }
                }
            },

            async loadUsersR(offset, items) {
                let data = {offset: offset, limit: 5, client_id: this.custosId, client_sec: this.custosSec}
                let resp = await this.$store.dispatch('user/users', data)
                return this.parseUsers(items, resp)
            },

            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

            parseUsers(items, resp) {
                if (Array.isArray(resp) && resp.length > 0) {
                    resp.forEach(obj => {
                        let user = {
                            username: obj.username,
                            first_name: obj.first_name,
                            last_name: obj.last_name,
                            email: obj.email,
                            status: obj.state,
                            attributes: [],
                            roles: []
                        }
                        let rr = obj.realm_roles
                        let cr = obj.client_roles

                        let attribs = obj.attributes

                        attribs.forEach(r => {
                            let newAt = {
                                key: r.key,
                                value: r.values.join(",")
                            }
                            user.attributes.push(newAt)
                        })

                        rr.forEach(r => {
                            let rel_role = {
                                name: r,
                                scope: 'TENANT'
                            }
                            user.roles.push(rel_role)
                        })

                        cr.forEach(r => {
                            let cl_role = {
                                name: r,
                                scope: 'CLIENT'
                            }
                            user.roles.push(cl_role)
                        })

                        items.push(user)

                    });

                }
                return resp.length
            },

            async updateUserProfile() {
                this.operationCompleted = false
                let params = {client_id: this.custosId, client_sec: this.custosSec, username: this.selectedUsername}
                if (this.selectedStatus === 'ACTIVE') {
                    await this.$store.dispatch('user/enableUser', params)

                } else {
                    await this.$store.dispatch('user/disableUser', params)
                }

                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        username: this.selectedUsername,
                        first_name: this.selectedFirstName,
                        last_name: this.selectedLastName,
                        email: this.selectedEmail
                    }
                }
                await this.$store.dispatch('user/updateUserProfile', data)
                this.operationCompleted = true
                this.loadUsers()

            },
        }
        ,

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')
            await this.loadUsers()

            let params = {client_id: this.custosId, client_sec: this.custosSec}
            this.tenantroles = await this.$store.dispatch('user/getTenantLevelRoles', params)
            this.clientroles = await this.$store.dispatch('user/getClientLevelRoles', params)
        }
        ,
        computed: {
            rows() {
                return this.items.length
            }
        }
    }

</script>

<style scoped>

    h2 {
        font-family: Avenir;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        color: #203a43;
    }

    .userSearchBar {
        border-radius: 5px;
        border: solid 1px #afafae;
        width: 300px;
        float: right;
    }

    .userSearchBar .form-control {
        border: none;
    }

    .userSearchBar input.form-control:focus {
        outline: none;
        box-shadow: none;
    }

    .userSearchBar button {
        background: none;
        color: black;
        border: none;
    }
</style>