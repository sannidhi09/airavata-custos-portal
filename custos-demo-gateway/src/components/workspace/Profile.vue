<template>
    <div>
        <div class="gotoWork">
            <b-button href="#" v-on:click="goToWorkspace">Go to Workspace</b-button>
        </div>
        <div class="row">

            <div class="column">
                <div v-if="this.updatingProfile" class="d-flex justify-content-center mb-3">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                </div>
                <div class="profile">
                    <div class="profItem">
                        <p>Username</p>
                        <b-form-input
                                id="input-1"
                                v-model="currentUserName"
                                type="email"
                                disabled
                        ></b-form-input>
                    </div>
                    <div class="profItem">
                        <p>Status</p>
                        <b-form-input
                                id="input-4"
                                v-model="status"
                                required
                                disabled
                        ></b-form-input>
                    </div>

                    <div class="profItem">
                        <p>First Name</p>
                        <div>
                            <b-alert v-model="firstNameError" variant="danger" dismissible
                                     @dismissed="this.callDismissed">
                                Invalid name
                            </b-alert>
                        </div>
                        <b-form-input
                                id="input-2"
                                v-model="first_name"
                                required
                        ></b-form-input>
                    </div>

                    <div class="profItem">
                        <p>Last Name</p>
                        <div>
                            <b-alert v-model="lastnameError" variant="danger" dismissible
                                     @dismissed="this.callDismissed">
                               Invalid name
                            </b-alert>
                        </div>
                        <b-form-input
                                id="input-3"
                                v-model="last_name"
                                required
                        ></b-form-input>
                    </div>

                    <div class="profItem">
                        <p>Email</p>
                        <div>
                            <b-alert v-model="emailError" variant="danger" dismissible
                                     @dismissed="this.callDismissed">
                                Invalid email
                            </b-alert>
                        </div>
                        <b-form-input
                                id="input-3"
                                v-model="email"
                                required
                        ></b-form-input>
                    </div>
                </div>

                <div class="updateProfCls">
                    <b-button variant="outline-primary" v-on:click="updateProfile">Update Profile</b-button>
                </div>

            </div>
            <div class="column">
                <div>
                    <b-table striped hover responsive :items="roles"
                             ref="selectableTable"
                             select-mode="single"
                             caption-top>
                        <template v-slot:table-caption>My Roles</template>
                    </b-table>
                </div>
            </div>
            <div class="column">
                <div v-if="!this.operationCompleted" class="d-flex justify-content-center mb-3">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                </div>
                <b-table striped hover responsive :items="attributes"
                         ref="selectableTable"
                         select-mode="single"
                         @row-selected="onAtrSelected"
                         caption-top
                >
                    <template v-slot:table-caption>My Attributes</template>
                </b-table>
                <!--            <dev class="addAtrCls">-->
                <!--                <b-button variant="outline-primary" v-on:click="addAttribute">Add Attributes</b-button>-->
                <!--            </dev>-->

            </div>
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
            <b-modal ref="selectModel" scrollable title="Delete Attribute" cancel-title="Delete"
                     @cancel="removeAtrOKPressed">
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

        </div>
    </div>

</template>

<script>
    import config from "@/config";

    export default {
        name: "Profile",
        data: function () {
            return {
                user: null,
                currentUserName: null,
                first_name: null,
                last_name: null,
                email: null,
                attributes: [],
                roles: [],
                status: null,
                newKey: null,
                newValue: null,
                selectedKey: null,
                selectedValue: null,
                operationCompleted: true,
                updatingProfile: false,
                emailError: false,
                firstNameError: false,
                lastnameError: false
            }
        },

        methods: {

            addAttribute: function () {
                this.$refs.atrModel.show()
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
                        users: [this.currentUserName]
                    }
                }
                let userAtr = await this.$store.dispatch('user/addUserAttributes', bd)
                if (userAtr) {
                    let atr = {key: this.newKey, value: this.newValue}
                    this.attributes.push(atr)
                }
                this.operationCompleted = true
                this.newKey = null
                this.newValue = null

            },

            async removeAtrOKPressed() {
                this.operationCompleted = false
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let bd = {
                    user_token: accessToken, body: {
                        attributes: [{
                            key: this.selectedKey,
                            values: [this.selectedValue]
                        }],
                        users: [this.currentUserName]
                    }
                }
                let userAtr = await this.$store.dispatch('user/deleteUserAttributes', bd)
                if (userAtr) {
                    let newAtr = []
                    this.attributes.forEach(atr => {

                        if (atr.key != this.selectedKey) {
                            newAtr.push(atr)
                        }
                        this.attributes = newAtr
                    })
                }
                this.operationCompleted = true
                this.selectedKey = null
                this.selectedValue = null
            },

            onAtrSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedKey = items[0].key
                    this.selectedValue = items[0].value
                    this.$refs.selectModel.show()
                }
            },

            async updateProfile() {
                this.updatingProfile = true

                // eslint-disable-next-line no-useless-escape
                let emailRegs = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                let regexPucn = /[~!" "@#$%^&*()+=;"'<>,.]/

                if (this.first_name == null || this.first_name =='' || regexPucn.test(this.first_name)  || this.first_name.length>20){
                    this.firstNameError =true
                    this.updatingProfile = false
                }

                if (this.last_name == null || this.last_name =='' || regexPucn.test(this.last_name)  || this.last_name.length >20){
                    this.lastnameError =true
                    this.updatingProfile = false
                }


                if (this.email == null ||  emailRegs.test(this.email) == false ){
                    this.emailError =true
                    this.updatingProfile = false
                }

                if (!(this.firstNameError || this.lastnameError || this.emailError)) {

                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            username: this.currentUserName,
                            first_name: this.first_name,
                            last_name: this.last_name,
                            email: this.email
                        }
                    }
                    await this.$store.dispatch('user/updateUserProfile', data)
                    this.updatingProfile = false
                }
            },
            async goToWorkspace() {
                await this.$router.push('/workspace')
            },


            async callDismissed() {
                this.emailError = false
                this.firstNameError = false
                this.lastnameError = false
            }


        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')
            let data = {
                offset: 0, limit: 1, client_id: this.custosId, client_sec: this.custosSec,
                username: this.currentUserName
            }
            let resp = await this.$store.dispatch('user/users', data)
            if (Array.isArray(resp) && resp.length > 0) {
                resp.forEach(obj => {
                    this.user = {
                        username: obj.username,
                        first_name: obj.first_name,
                        last_name: obj.last_name,
                        email: obj.email,
                        status: obj.state,
                        attributes: [],
                        roles: []
                    }

                    obj.realm_roles.forEach(role => {
                        let r = {
                            name: role
                        }
                        this.roles.push(r)
                    })
                    let attribs = obj.attributes
                    attribs.forEach(r => {
                        let newAt = {
                            key: r.key,
                            value: r.values.join(",")
                        }
                        this.attributes.push(newAt)
                    })


                    this.user = obj
                    this.first_name = obj.first_name
                    this.last_name = obj.last_name
                    this.email = obj.email
                    this.status = obj.state


                })
            }
        }
    }

</script>

<style scoped>
    .profile {
        position: relative;
        margin-left: 30%;
        width: 70%;
        border: solid;
        border-color: darkgrey;
        background-color: lightgray;
    }

    .profItem {
        position: relative;
        margin-top: 2%;
    }

    .column {
        float: left;
        width: 25%;
        padding: 10px;
        height: 300px; /* Should be removed. Only for demonstration */
        margin-left: 5%;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .userformItem {
        margin-top: 3%;
    }

    .addAtrCls {
        margin-left: 0%;
    }

    .updateProfCls {
        margin-left: 30%;
        margin-top: 5%;
    }
    .gotoWork {
        margin-left: 70%;
    }

</style>