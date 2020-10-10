<template>
    <div>
        <div class="w-100">
            <h2>Sharing</h2>
        </div>
        <b-container class="text-left">
            <div v-if="this.isAdminUser" class="w-100">
                Do you wanna evaluate if a specific user has a specific permission to a specific entity ?
                <b-button variant="link" v-on:click="checkPermissions">Evaluate Permissions</b-button>
            </div>
            <div>
                <div class="mt-5">
                    <strong>Permission Types</strong>
                    <b-button v-if="this.isAdminUser" variant="link" v-on:click="onNewPrTyAdd">
                        + Add Permission Type
                    </b-button>
                    <div>
                        <b-alert v-model="this.inputErrorPR" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <div v-if="this.permissionTypesLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <b-table small striped hover responsive :items="permissionTypes" :fields="fields" selectable
                             ref="selectableTable" select-mode="single" @row-selected="onPrTySelected">
                    </b-table>
                </div>
                <div class="mt-5">
                    <strong>Entity Types</strong>
                    <b-button v-if="this.isAdminUser" variant="link" v-on:click="onNewEnTyAdd">
                        + Add Entity Type
                    </b-button>
                    <div v-if="this.entityTypesLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div>
                        <b-alert v-model="this.inputErrorEnTy" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <b-table small striped hover responsive :items="entityTypes" :fields="fields" selectable
                             ref="selectableTable" select-mode="single" @row-selected="onEnTySelected" caption-top>
                    </b-table>
                </div>
                <div class="mt-5">
                    <strong>Entities</strong>
                    <b-button variant="link" v-on:click="onNewEnAdd">
                        + Add Entity
                    </b-button>
                    <div v-if="this.entitiesLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div>
                        <b-alert v-model="this.inputErrorEn" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <b-table small striped hover responsive :items="entities" :fields="entityFields" selectable
                             ref="selectableTable" select-mode="single" @row-selected="onEntitySelected">
                    </b-table>
                </div>
                <div class="mt-5">
                    <strong>Entity Sharing</strong>
                    <b-button variant="link" v-on:click="onSharingAdd">
                        + Add Entity Sharing
                    </b-button>
                    <div v-if="this.sharingsLoading" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div>
                        <b-alert v-model="this.sharingError" variant="danger" dismissible
                                 @dismissed="callDismissed">
                            Input validation error
                        </b-alert>
                    </div>
                    <b-table small striped hover responsive :items="sharings" :fields="sharingFields" selectable
                             ref="selectableTable"
                             select-mode="single"
                             @row-selected="onSharingSelected">
                    </b-table>
                </div>


            </div>
        </b-container>
        <b-modal ref="prtypemodel" scrollable title="Add Permission Type " ok-title="Add" @ok="addPrType">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Id</p>
                    <b-form-input v-model="prId"></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Name</p>
                    <b-form-input v-model="prName"></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Description</p>
                    <b-form-input v-model="prDesc"></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="entypemodel" scrollable title="Add Entity Type " ok-title="Add" @ok="addNewEnType">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Id</p>
                    <b-form-input v-model="enTyId"></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Name</p>
                    <b-form-input v-model="enTyName"></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Description</p>
                    <b-form-input v-model="enTyDesc"></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="enModel" scrollable title="Add  Entity " ok-title="Add" @ok="addNewEntity">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Name</p>
                    <b-form-input v-model="enName"></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Type</p>
                    <b-form-select v-model="selectedEntityType">
                        <option v-for="(selectOption, indexOpt) in entityTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="groupformItem">
                    <p>Description</p>
                    <b-form-input v-model="enDesc"></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="selectedPrTyModel" scrollable title="Permission Type " ok-title="Delete"
                 @ok="deletePRType">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Id</p>
                    <b-form-input v-model="selectedPrTyId" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Name</p>
                    <b-form-input v-model="selectedPrTyName" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Description</p>
                    <b-form-input v-model="selectedPrTyDesc" disabled></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="selectedEnTyModel" scrollable title="Entity Type " ok-title="Delete"
                 @ok="deleteEnType">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Id</p>
                    <b-form-input v-model="selectedEnTyId" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Name</p>
                    <b-form-input v-model="selectedEnTyName" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Description</p>
                    <b-form-input v-model="selectedEnTyDesc" disabled></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="selectedEnModel" scrollable title="Entity " ok-title="Delete" @ok="deleteEntity">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Id</p>
                    <b-form-input v-model="selectedEnId" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Name</p>
                    <b-form-input v-model="selectedEnName" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Type</p>
                    <b-form-input v-model="selectedEntityType" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Description</p>
                    <b-form-input v-model="selectedEnDesc" disabled></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="selectedShraingModel" scrollable title="Sharing " ok-title="Delete"
                 @ok="removeSharing">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Entity Id</p>
                    <b-form-input v-model="selectedShEnId" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Permission Type Id</p>
                    <b-form-input v-model="selectedShPrId" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Owner Id</p>
                    <b-form-input v-model="selectedShOwId" disabled></b-form-input>
                </div>
                <div class="groupformItem">
                    <p>Type</p>
                    <b-form-input v-model="selectedShOwType" disabled></b-form-input>
                </div>

            </div>
        </b-modal>
        <b-modal ref="sharingModel" scrollable title="Share Entities " ok-title="Add" @ok="addNewSharing">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Entity Id</p>
                    <b-form-select v-model="defaultEntityId">
                        <option v-for="(selectOption, indexOpt) in entities"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="groupformItem">
                    <p>Permission Type</p>
                    <b-form-select v-model="defaultPermissionType">
                        <option v-for="(selectOption, indexOpt) in permissionTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>

                <div class="groupformItem">
                    <p>Sharing Type</p>
                    <b-form-select v-model="defaultSharingType">
                        <option v-for="(selectOption, indexOpt) in sharingTypeIds"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div v-if="defaultSharingType == 'USERS'" class="groupformItem">
                    <p>User Id</p>
                    <b-form-select v-model="defaultOwner">
                        <option v-for="(selectOption, indexOpt) in users"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>

                <div v-if="defaultSharingType == 'GROUPS'" class="groupformItem">
                    <p>Group Name</p>
                    <b-form-select v-model="defaultGroupName">
                        <option v-for="(selectOption, indexOpt) in groups"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.name }}
                        </option>
                    </b-form-select>
                </div>
            </div>
        </b-modal>
        <b-modal ref="permissionChecker" scrollable title="Check Permissions" ok-title="Evaluate"
                 @ok="evaluatePermission">
            <div class="groupform">
                <div class="groupformItem">
                    <p>Entity Id</p>
                    <b-form-select v-model="defaultEntityId">
                        <option v-for="(selectOption, indexOpt) in entities"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>
                <div class="groupformItem">
                    <p>User</p>
                    <b-form-select v-model="defaultOwner">
                        <option v-for="(selectOption, indexOpt) in users"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption }}
                        </option>
                    </b-form-select>
                </div>
                <div class="groupformItem">
                    <p>Permission</p>
                    <b-form-select v-model="defaultPermissionType">
                        <option v-for="(selectOption, indexOpt) in permissionTypes"
                                :key="indexOpt"
                                :value="selectOption"
                        >
                            {{ selectOption.id }}
                        </option>
                    </b-form-select>
                </div>

            </div>
        </b-modal>
        <b-modal ref="evalutionResultPopup" hide-footer>
            <div v-if="this.evaluating">
                <b-button variant="primary" size="large" class="evaluater" disabled>
                    <b-spinner small type="grow"></b-spinner>
                    Evaluating...
                </b-button>
            </div>
            <div v-if="!this.evaluating">
                <div v-if="evalutionResult" class="groupform">
                    <p class="textCls"> Evalution Status: True </p>
                    <p>User has permission</p>

                </div>
                <div v-if="!evalutionResult" class="groupform">
                    <p class="textClsWrng"> Evalution Status: False </p>
                    <p>User does not have permission</p>

                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "Sharing",
        data: function () {
            return {
                fields: ['id', 'name', 'description'],
                sharingFields: ['entity_id', 'permission_type_id', 'owner_id', 'type'],
                entityFields: ['id', 'name', 'type', 'description'],
                permissionTypes: [],
                entityTypes: [],
                entities: [],

                sharings: [],
                users: [],
                groups: [],
                sharingTypeIds: ['USERS', 'GROUPS'],
                prId: null,
                prName: null,
                prDesc: null,
                enTyId: null,
                enTyName: null,
                enTyDesc: null,
                enId: null,
                enName: null,
                enDesc: null,
                defaultEntityId: null,
                defaultPermissionType: null,
                defaultOwner: null,
                selectedPrTyId: null,
                selectedPrTyName: null,
                selectedPrTyDesc: null,
                selectedEnTyId: null,
                selectedEnTyName: null,
                selectedEnTyDesc: null,
                selectedEnId: null,
                selectedEnName: null,
                selectedEnDesc: null,
                selectedPrType: null,
                selectedEnType: null,
                selectedEn: null,
                selectedSh: null,
                selectedShEnId: null,
                selectedShPrId: null,
                selectedShOwId: null,
                currentUserName: null,
                selectedEntityType: null,
                defaultSharingType: null,
                defaultGroup: null,
                selectedShOwType: null,
                evalutionResult: false,
                permissionTypesLoading: false,
                entityTypesLoading: false,
                entitiesLoading: false,
                sharingsLoading: false,
                evaluating: false,
                defaultGroupName: null,
                inputErrorPR: false,
                inputErrorEnTy: false,
                inputErrorEn: false,
                sharingError: false,


            }
        },

        methods: {
            async addPrType() {
                this.permissionTypesLoading = true
                if (this.prId == null || this.prName == null || this.prId == '' || this.prName == '') {
                    this.inputErrorPR = true
                    this.permissionTypesLoading = false
                }
                if (!this.inputErrorPR) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            permission_type: {
                                id: this.prId,
                                name: this.prName,
                                description: this.prDesc

                            }
                        }
                    }

                    this.permissionTypes = await this.$store.dispatch('sharing/createPermissionType', data)
                    this.permissionTypesLoading = false
                }
                this.prId = null
                this.prName = null
                this.prDesc = null

            },

            async deletePRType() {
                this.permissionTypesLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        permission_type: {
                            id: this.selectedPrTyId,
                            name: this.selectedPrTyName,
                            description: this.selectedPrTyDesc

                        }
                    }
                }

                this.permissionTypes = await this.$store.dispatch('sharing/deletePermissionType', data)
                this.permissionTypesLoading = false
                this.prId = null
                this.prName = null
                this.prDesc = null
            },
            async addNewEnType() {
                this.entityTypesLoading = true
                if (this.enTyId == null || this.enTyName == null || this.enTyName == '' || this.enTyId == '') {
                    this.inputErrorEnTy = true
                    this.entityTypesLoading = false
                }
                if (!this.inputErrorEnTy) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity_type: {
                                id: this.enTyId,
                                name: this.enTyName,
                                description: this.enTyDesc
                            }
                        }
                    }

                    this.entityTypes = await this.$store.dispatch('sharing/createEntityType', data)
                    this.entityTypesLoading = false

                }
                this.enTyId = null
                this.enTyName = null
                this.enTyDesc = null

            },

            async deleteEnType() {
                this.entityTypesLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        entity_type: {
                            id: this.selectedEnTyId,
                            name: this.selectedEnTyName,
                            description: this.selectedEnTyDesc

                        }
                    }
                }

                this.entityTypes = await this.$store.dispatch('sharing/deleteEntityType', data)
                this.entityTypesLoading = false
                this.prId = null
                this.prName = null
                this.prDesc = null
            },


            async addNewEntity() {
                this.entitiesLoading = true
                if (this.enName == null || this.enName == '') {
                    this.inputErrorEn = true
                    this.entitiesLoading = false
                }

                if (!this.inputErrorEn) {
                    this.enId = this.enName + "_" + this.makeid(15)
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {
                            client_id: this.custosId,
                            entity: {
                                id: this.enId,
                                name: this.enName,
                                description: this.enDesc,
                                type: this.selectedEntityType.id,
                                owner_id: this.currentUserName
                            }
                        }
                    }

                    this.entities = await this.$store.dispatch('sharing/createEntity', data)
                    this.entitiesLoading = false
                    this.sharings = await this.loadSharings()
                }
                this.enId = null
                this.enName = null
                this.enDesc = null
                this.selectedEntityType = null

            },

            async deleteEntity() {
                this.entitiesLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        entity: {
                            id: this.selectedEnId,
                            name: this.selectedEnName,
                            description: this.selectedEnDesc,
                            type: this.selectedEntityType.id,
                            owner_id: this.currentUserName
                        }
                    }
                }

                this.entities = await this.$store.dispatch('sharing/deleteEntity', data)
                this.entitiesLoading = false
                this.selectedEnId = null
                this.selectedEnName = null
                this.selectedEnDesc = null
                this.selectedEntityType = null
                this.sharings = await this.loadSharings()
            },

            async addNewSharing() {
                this.sharingsLoading = true

                if (this.defaultEntityId == null || this.defaultPermissionType == null
                    || (this.defaultGroupName == null && this.defaultOwner == null)) {
                    this.sharingError = true
                    this.sharingsLoading = false

                }

                if (!this.sharingError) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        body: {

                            client_id: this.custosId,
                            entity: {
                                id: this.defaultEntityId.id
                            },
                            permission_type: {
                                id: this.defaultPermissionType.id
                            },
                            owner_id: [this.defaultOwner],
                            cascade: true

                        }
                    }

                    if (this.defaultSharingType === 'USERS') {
                        let response = await this.$store.dispatch('sharing/shareEntityWithUsers', data)

                        if (response) {
                            this.sharings = await this.loadSharings()
                        }
                    } else {
                        console.log(this.defaultGroupName)
                        data.body.owner_id = [this.defaultGroupName.id]
                        console.log(data)
                        let response = await this.$store.dispatch('sharing/shareEntityWithGroups', data)
                        if (response) {
                            this.sharings = await this.loadSharings()
                        }
                    }
                }
                this.sharingsLoading = false
            },

            async removeSharing() {
                this.sharingsLoading = true
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {

                        client_id: this.custosId,
                        entity: {
                            id: this.selectedShEnId
                        },
                        permission_type: {
                            id: this.selectedShPrId
                        },
                        owner_id: [this.selectedShOwId],
                        cascade: true

                    }
                }

                if (this.selectedShOwType === 'USER') {
                    let response = await this.$store.dispatch('sharing/revokeEntitySharingFromUsers', data)
                    if (response) {
                        this.sharings = await this.loadSharings()
                    }
                } else {
                    let response = await this.$store.dispatch('sharing/revokeEntitySharingFromGroups', data)
                    if (response) {
                        this.sharings = await this.loadSharings()
                    }
                }
                this.sharingsLoading = false
            },

            onPrTySelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedPrType = items
                    this.selectedPrTyId = this.selectedPrType[0].id
                    this.selectedPrTyName = this.selectedPrType[0].name
                    this.selectedPrTyDesc = this.selectedPrType[0].description
                    if (this.selectedPrTyId != "OWNER") {
                        this.$refs.selectedPrTyModel.show()
                    }
                }
            },

            onEnTySelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedEnType = items
                    this.selectedEnTyId = this.selectedEnType[0].id
                    this.selectedEnTyName = this.selectedEnType[0].name
                    this.selectedEnTyDesc = this.selectedEnType[0].description
                    this.$refs.selectedEnTyModel.show()
                }
            },

            onEntitySelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedEn = items
                    this.selectedEnId = this.selectedEn[0].id
                    this.selectedEnName = this.selectedEn[0].name
                    this.selectedEnDesc = this.selectedEn[0].description
                    this.selectedEntityType = this.selectedEn[0].type
                    this.$refs.selectedEnModel.show()
                }
            },

            onSharingSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedSh = items
                    this.selectedShEnId = this.selectedSh[0].entity_id
                    this.selectedShPrId = this.selectedSh[0].permission_type_id
                    this.selectedShOwId = this.selectedSh[0].owner_id
                    this.selectedShOwType = this.selectedSh[0].type
                    this.$refs.selectedShraingModel.show()
                }
            },
            onNewPrTyAdd: function () {
                this.$refs.prtypemodel.show()
            },
            onNewEnTyAdd: function () {
                this.$refs.entypemodel.show()
            },
            onNewEnAdd: function () {
                this.$refs.enModel.show()
            },
            onSharingAdd: function () {
                this.$refs.sharingModel.show()
            },

            checkPermissions: function () {
                this.$refs.permissionChecker.show()
            },

            async loadUsers() {
                let data = {offset: 0, limit: 50, client_id: this.custosId, client_sec: this.custosSec}
                let response = await this.$store.dispatch('user/users', data)

                let usrs = [];
                if (Array.isArray(response) && response.length > 0) {
                    response.forEach(obj => {
                        usrs.push(obj.username)
                    })
                }
                return usrs
            },

            async loadGroups() {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUserName
                }
                if (this.isAdminUser) {
                    return await this.$store.dispatch('group/loadAllGroups', data)
                } else {
                    let grs = []
                    grs = await this.$store.dispatch('group/getAllGroupsOfUser', data)
                    let groups = []
                    grs.forEach(gr => {
                        gr.ownerId = gr.owner_id
                        groups.push(gr)
                    })
                    return groups
                }

            },


            async evaluatePermission() {
                this.evaluating = true
                this.$refs.evalutionResultPopup.show()
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    params: {
                        client_id: this.custosId,
                        'entity.id': this.defaultEntityId.id,
                        'permission_type.id': this.defaultPermissionType.id,
                        owner_id: this.defaultOwner
                    }
                }
                let response = await this.$store.dispatch('sharing/userHasAccess', data)
                this.evalutionResult = response
                this.evaluating = false

            },

            async loadSharings() {
                let shars = []
                for (const en of this.entities) {
                    for (const pr of this.permissionTypes) {
                        let pars = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            params: {
                                'entity.id': en.id,
                                'permission_type.id': pr.id
                            }
                        }
                        let userIds = await this.$store.dispatch('sharing/getListOfSharedUsers', pars)

                        if (userIds != null && userIds.length > 0) {
                            userIds.forEach(uId => {
                                let shItem = {
                                    entity_id: en.id,
                                    permission_type_id: pr.id,
                                    owner_id: uId,
                                    type: 'USER'
                                }
                                shars.push(shItem)
                            })
                        }

                        let groupIds = await this.$store.dispatch('sharing/getListOfSharedGroups', pars)

                        if (groupIds != null && groupIds.length > 0) {
                            groupIds.forEach(uId => {
                                let shItem = {
                                    entity_id: en.id,
                                    permission_type_id: pr.id,
                                    owner_id: uId,
                                    type: 'GROUP'
                                }
                                shars.push(shItem)
                            })
                        }
                    }
                }
                return shars
            },
            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

            makeid(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            },

            async callDismissed() {
                this.inputErrorEn = false
                this.inputErrorEnTy = false
                this.inputErrorEn = false
                this.sharingError = false
            }

        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUserName = await this.$store.dispatch('identity/getCurrentUserName')


            let permTypesData = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }

            this.permissionTypes = await this.$store.dispatch('sharing/getPermissionTypes', permTypesData)

            if (this.permissionTypes.length == 0) {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        client_id: this.custosId,
                        permission_type: {
                            id: "OWNER",
                            name: "Owner",
                            description: "This is owner permission type"
                        }
                    }
                }

                this.permissionTypes = await this.$store.dispatch('sharing/createPermissionType', data)
            }


            this.entityTypes = await this.$store.dispatch('sharing/getEntityTypes', permTypesData)

            let searchEntitiesData = {
                client_id: this.custosId,
                client_sec: this.custosSec,
                body: {
                    client_id: this.custosId,
                    owner_id: this.currentUserName,
                    search_criteria: [
                        {
                            search_field: "OWNER_ID",
                            value: this.currentUserName,
                            condition: "EQUAL"
                        }
                    ]
                }
            }

            this.entities = await this.$store.dispatch('sharing/getEntities', searchEntitiesData)

            this.sharings = await this.loadSharings()

            this.users = await this.loadUsers()
            this.groups = await this.loadGroups()

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
</style>