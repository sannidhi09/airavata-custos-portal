<template>
    <div>
        <Header/>
        <div class="p-3">
            <div class="secrettable">
                <div v-if="this.secretsLoading" class="d-flex justify-content-center mb-3">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                </div>
                <b-table striped hover responsive :items="secItems" :fields="fields" selectable
                         select-mode="single"
                         @row-selected="onRowSelected" caption-top>
                    <template v-slot:table-caption>Secrets</template>
                </b-table>
                <div class="addSec">
                    <b-button variant="outline-primary" v-on:click="addSec">Add Secret</b-button>
                </div>
            </div>
            <div>
                <b-modal ref="addSecmodel" scrollable title="Add Secret" ok-title="Add" @ok="addSecOKButtonPressed">
                    <div class="secform">
                        <div class="secFormItem">
                            <p>Type</p>
                            <b-form-select v-model="defaultMemType">
                                <option v-for="(selectOption, indexOpt) in secretTypes"
                                        :key="indexOpt"
                                        :value="selectOption"
                                >
                                    {{ selectOption }}
                                </option>
                            </b-form-select>
                        </div>
                        <div class="secformItem">
                            <p>Description</p>
                            <b-form-input v-model="selectedDescription"></b-form-input>
                        </div>
                        <div v-if="defaultMemType==='Password'" class="secformItem">
                            <p>Password</p>
                            <b-form-input v-model="selectedPassword"></b-form-input>
                        </div>
                    </div>

                </b-modal>
            </div>
            <div>
                <b-modal ref="updateSecmodel" scrollable title="View Secret" cancel-title="Delete"
                         @cancel="secDeleteButtonPressed" cancel-variant="outline-primary">
                    <div class="secform">
                        <div class="secformItem">
                            <p>Token</p>
                            <b-form-input v-model="selectedExId" disabled></b-form-input>
                        </div>
                        <div class="secFormItem">
                            <p>Type</p>
                            <b-form-input v-model="selectedExType" disabled></b-form-input>
                        </div>
                        <div class="secformItem">
                            <p>Description</p>
                            <b-form-input v-model="selectedExDescription" disabled></b-form-input>
                        </div>
                        <div class="secformItem">
                            <p>Owner Id</p>
                            <b-form-input v-model="selectedExOwnerId" disabled></b-form-input>
                        </div>
                        <div v-if="selectedExType ==='PASSWORD'" class="secformItem">
                            <p>Password</p>
                            <b-form-input v-model="selectedExPassword" disabled></b-form-input>
                        </div>
                        <div v-if="selectedExType ==='SSH'" class="secformItem">
                            <p>Publick Key</p>
                            <b-textarea v-model="selectedExPubKey" disabled></b-textarea>
                        </div>
                        <div v-if="selectedExType ==='SSH'" class="secformItem">
                            <p>Private Key</p>
                            <b-textarea v-model="selectedExPrivKey" disabled></b-textarea>
                        </div>

                    </div>

                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "@/config";
    import Header from "@/components/workspace/Header";

    export default {
        name: "Secrets",
        components: {Header},
        data: function () {
            return {
                fields: ['token', 'description', 'type', 'owner_id'],
                secItems: [],
                selectedSecret: null,
                secretTypes: ['SSH', 'Password'],
                defaultMemType: 'SSH',
                selectedDescription: null,
                selectedPassword: null,
                selectedExType: null,
                selectedExId: null,
                selectedExDescription: null,
                selectedExPassword: null,
                selectedExPubKey: null,
                selectedExPrivKey: null,
                selectedExOwnerId: null,
                currentUserName: null,
                secretsLoading: false

            }
        },
        methods: {
            async onRowSelected(items) {
                if (items != null && items.length > 0) {
                    this.selectedSecret = items

                    this.selectedExDescription = this.selectedSecret[0].description
                    this.selectedExType = this.selectedSecret[0].type
                    this.selectedExId = this.selectedSecret[0].token
                    this.selectedExOwnerId = this.selectedSecret[0].owner_id

                    if (this.selectedExType === "SSH") {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            token: this.selectedExId
                        }
                        let response = await this.$store.dispatch('secret/getSSHCredential', data)
                        this.selectedExPubKey = response.public_key
                        this.selectedExPrivKey = response.private_key
                    } else {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            token: this.selectedExId
                        }
                        let response = await this.$store.dispatch('secret/getPasswordCredential', data)
                        this.selectedExPassword = response.password
                    }
                    this.$refs.updateSecmodel.show()
                }
            },

            addSec: function () {
                this.selectedDescription = null
                this.selectedPassword = null
                this.defaultMemType = 'SSH'
                this.$refs.addSecmodel.show()
            },

            async addSecOKButtonPressed() {
                this.secretsLoading = true
                if (this.defaultMemType === 'SSH') {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            metadata: {
                                client_id: this.custosId,
                                description: this.selectedDescription,
                                owner_id: this.currentUserName
                            }
                        }
                    }
                    let response = await this.$store.dispatch('secret/addSSHCredential', data)
                    let dataEn = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity: {
                                id: response.token,
                                name: 'SSH token',
                                description: 'SSH credential created for ' + this.selectedDescription,
                                type: 'SECRET',
                                owner_id: this.currentUserName
                            }
                        }
                    }

                    await this.$store.dispatch('sharing/createEntity', dataEn)

                } else {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            metadata: {
                                client_id: this.custosId,
                                description: this.selectedDescription,
                                owner_id: this.currentUserName
                            },
                            password: this.selectedPassword
                        }
                    }
                    let response = await this.$store.dispatch('secret/addPasswordCredential', data)
                    let dataEN = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity: {
                                id: response.token,
                                name: 'Password token',
                                description: 'Password credential created for ' + this.selectedDescription,
                                type: 'SECRET',
                                owner_id: this.currentUserName
                            }
                        }
                    }
                    await this.$store.dispatch('sharing/createEntity', dataEN)
                }
                this.secItems = await this.getAllCredentials()
                this.secretsLoading = false
            },

            async secDeleteButtonPressed() {
                this.secretsLoading = true
                if (this.defaultMemType === 'SSH') {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        token: this.selectedExId
                    }
                    let response = await this.$store.dispatch('secret/deleteSSHCredential', data)
                    if (response) {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            body: {
                                client_id: this.custosId,
                                entity: {
                                    id: this.selectedExId,
                                    owner_id: this.currentUserName
                                }
                            }
                        }
                        await this.$store.dispatch('sharing/deleteEntity', data)
                    }

                } else {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        token: this.selectedExId
                    }
                    let response = await this.$store.dispatch('secret/deletePassswordCredential', data)
                    if (response) {
                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            body: {
                                client_id: this.custosId,
                                entity: {
                                    id: this.selectedExId,
                                    owner_id: this.currentUserName
                                }
                            }
                        }
                        await this.$store.dispatch('sharing/deleteEntity', data)
                    }

                }
                this.secItems = await this.getAllCredentials()
                this.secretsLoading = false
                this.secretsLoading = false
            },


            async getAllCredentials() {
                let searchEntitiesData = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        owner_id: this.currentUserName,
                        search_criteria: [
                            {
                                search_field: "ENTITY_TYPE_ID",
                                value: 'SECRET',
                                condition: "EQUAL"
                            }
                        ]
                    }
                }

                let response = await this.$store.dispatch('sharing/getEntities', searchEntitiesData)
                let accessible_token = []
                if (response != null && response.length > 0) {
                    response.forEach(a => {
                        accessible_token.push(a.id)
                    })

                }
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    accessible_tokens: accessible_token
                }
                return await this.$store.dispatch('secret/getAllCredentials', data)
            }
        },


        async mounted() {
            this.secretsLoading = true
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')

            this.secItems = await this.getAllCredentials()
            this.secretsLoading = false

            let permTypesData = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }

            let entityTypes = await this.$store.dispatch('sharing/getEntityTypes', permTypesData)

            let created = false

            entityTypes.forEach(ent => {
                if (ent.id === 'SECRET') {
                    created = true
                }
            })

            if (!created) {
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        entity_type: {
                            id: 'SECRET',
                            name: 'SECRET',
                            description: 'This is secret entity type of demo gateway'
                        }
                    }
                }
                this.entityTypes = await this.$store.dispatch('sharing/createEntityType', dat)
            }
        }
    }
</script>

<style scoped>
    .secrettable {
        width: 50%;
        margin-left: 10%;
        margin-top: 3%;
    }

    .secformItem {
        margin-top: 3%;
    }

</style>