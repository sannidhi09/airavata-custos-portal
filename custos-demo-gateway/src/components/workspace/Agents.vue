<template>
    <div>
        <Header/>
        <div class="accounttable p-3">
            <!--        <div class="enableComAcc">-->
            <!--            <b-form-checkbox v-model="checked" :disabled=isCheckedBtnDisabled v-on:change="enableAgents"-->
            <!--                             name="check-button" switch>-->
            <!--                Enable Community Accounts-->
            <!--            </b-form-checkbox>-->
            <!--        </div>-->
            <div v-if="this.loadingAgents" class="d-flex justify-content-center mb-3">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <b-table striped hover responsive :items="communityAccounts" :fields="community_fields" selectable
                     ref="selectableTable"
                     select-mode="single"
                     @row-selected="onCommunityAcSelected" caption-top>
                <template v-slot:table-caption>Community Accounts</template>
            </b-table>
            <div class="addAccItem">
                <b-button variant="outline-primary" v-on:click="this.addAccount">Add Account</b-button>
            </div>

            <b-modal ref="newAcc" scrollable title="New Account" ok-title="Ok" @ok="registerAgent">
                <div class="userform">
                    <div class="userformItem">
                        <p>Id</p>
                        <b-form-input v-model="newAccountName"></b-form-input>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="exAcc" scrollable title=" Account" ok-title="Ok" hide-footer>
                <div class="userform">
                    <div class="userformItem">
                        <p>Id</p>
                        <b-form-input v-model="exAccountId" disabled></b-form-input>
                    </div>
                    <div class="userform">
                        <p>Status</p>
                        <b-form-select v-model="selectedStatus" v-on:change="changeAccountStatus">
                            <option v-for="(selectOption, indexOpt) in statusOptions"
                                    :key="indexOpt"
                                    :value="selectOption"
                            >
                                {{ selectOption }}
                            </option>
                        </b-form-select>
                    </div>
                    <div class="userformItem">
                        <p>Attributes</p>
                        <b-table striped hover responsive :items="accSelectedAttributes" selectable select-mode="single"
                                 @row-selected="onAccAtrSelected">
                        </b-table>
                        <dev class="addAtrCls">
                            <b-button variant="outline-primary" v-on:click="addActAttribute">Add Attributes</b-button>
                        </dev>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="accAtrModel" scrollable title="Add Attribute" ok-title="Add" @ok="addAtrOkPressed">
                <div class="userform">
                    <div class="userformItem">
                        <p>Key</p>
                        <b-form-input v-model="newAcAtrKey"></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Value</p>
                        <b-form-input v-model="newAcAtrValue"></b-form-input>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="AccAtrModelSelected" scrollable title="Attribute" ok-title="Delete" @ok="deleteAtrOkPressed">
                <div class="userform">
                    <div class="userformItem">
                        <p>Key</p>
                        <b-form-input v-model="exAccountAtrKey" disabled></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Value</p>
                        <b-form-input v-model="exAccountAtrValue" disabled></b-form-input>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="enablePopOver" scrollable title="Agent Credentials" cancel-disabled>
                <div class="userform">
                    <div class="userformItem">
                        <p>Id</p>
                        <b-form-input v-model="agentId" disabled></b-form-input>
                    </div>
                    <div class="userformItem">
                        <p>Secret</p>
                        <b-form-input v-model="agentSec" disabled></b-form-input>
                    </div>
                </div>
            </b-modal>

        </div>
    </div>
</template>

<script>
    import config from "@/config";
    import Header from "@/components/workspace/Header";

    export default {
        name: "Agents",
        components: {Header},
        data: function () {
            return {
                community_fields: ["id", "status"],
                communityAccounts: [],
                statusOptions: ['ACTIVE', 'DISABLED'],
                scopes: ['TENANT', 'CLIENT'],
                checked: true,
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
                tenantroles: [],
                clientroles: [],
                newAcAtrKey: null,
                newAcAtrValue: null,
                agentId: null,
                agentSec: null,
                selectedStatus: null,
                loadingAgents: false


            }
        },

        methods: {
            async onCommunityAcSelected(items) {
                if (items != null && items.length > 0) {
                    this.exAccount = items
                    this.exAccountId = this.exAccount[0].id
                    let act = await this.$store.getters['identity/getAccessToken']
                    let dt = {
                        user_token: act,
                        agent_id: this.exAccountId
                    }
                    let agent = await this.$store.dispatch('agent/getAgent', dt)
                    let atrs = []
                    agent.attributes.forEach(at => {
                        atrs.push({key: at.key, value: at.values.join("")})
                    })
                    this.accSelectedAttributes = atrs
                    this.selectedStatus = this.exAccount[0].status
                    this.$refs.exAcc.show()
                }
            },
            addAccount: function () {
                this.newAccountName = null
                this.$refs.newAcc.show()
            },

            onAccAtrSelected: function (items) {
                this.exAccountAtr = items
                this.exAccountAtrKey = this.exAccountAtr[0].key
                this.exAccountAtrValue = this.exAccountAtr[0].value
                this.$refs.AccAtrModelSelected.show()
            },

            onAccRoleSelected: function (items) {
                this.exAccountRole = items
                this.exAccountRoleKey = this.exAccountRole[0].name
                this.exAccountRoleValue = this.exAccountRole[0].scope
                this.$refs.accRoleModelSelected.show()
            },

            addActAttribute: function () {
                this.$refs.accAtrModel.show()
            },
            addActRole: function () {
                this.$refs.accRoleModel.show()
            },
            async enableAgents() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                }
                await this.$store.dispatch('agent/enableAgents', data)
            },

            async registerAgent() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    body: {
                        id: this.newAccountName
                    }
                }
                let response = await this.$store.dispatch('agent/registerAgent', data)
                let agents = await this.$store.getters['agent/getAgents']
                this.communityAccounts = agents
                this.agentId = response.id
                this.agentSec = response.secret
                this.$refs.enablePopOver.show()
            },

            async addAtrOkPressed() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    body: {
                        agents: [this.exAccountId],
                        attributes: [{
                            key: this.newAcAtrKey,
                            values: [this.newAcAtrValue]
                        }]
                    }
                }
                let atr = {key: this.newAcAtrKey, value: this.newAcAtrValue}
                this.accSelectedAttributes.push(atr)
                await this.$store.dispatch('agent/addAttributeToAgent', data)
                this.newAcAtrKey = null
                this.newAcAtrValue = null
            },

            async deleteAtrOkPressed() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    body: {
                        agents: [this.exAccountId],
                        attributes: [{
                            key: this.exAccountAtrKey,
                            values: [this.exAccountAtrValue]
                        }]
                    }
                }

                let acSelAtrs = []
                this.accSelectedAttributes.forEach(atr => {
                    if (atr.key != this.exAccountAtrKey) {
                        acSelAtrs.push(atr)
                    }
                })
                this.accSelectedAttributes = acSelAtrs
                await this.$store.dispatch('agent/deleteAttributeFromAgent', data)
                this.exAccountAtrKey = null
                this.exAccountAtrValue = null
            },
            async changeAccountStatus() {
                let accessToken = await this.$store.getters['identity/getAccessToken']
                let data = {
                    user_token: accessToken,
                    agent_id: this.exAccountId
                }
                if (this.selectedStatus == 'ACTIVE') {
                    await this.$store.dispatch('agent/activateAgent', data)
                } else {
                    await this.$store.dispatch('agent/deactivateAgent', data)
                }
            }

        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')

            let accessToken = await this.$store.getters['identity/getAccessToken']
            let data = {
                user_token: accessToken
            }
            this.loadingAgents = true
            await this.enableAgents()
            this.communityAccounts = await this.$store.dispatch('agent/get_all_agents', data)
            this.loadingAgents = false
        }
    }
</script>

<style scoped>
    .enableComAcc {
        width: 70%;
    }

    .addAccItem {
        margin-left: 70%;
    }

    .accounttable {
        width: 30%;
        margin-left: 30%;
        margin-top: 3%;
    }
</style>