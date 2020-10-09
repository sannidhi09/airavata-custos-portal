<template>
    <div>
        <div class="gotoWork">
            <b-button href="#" v-on:click="goToWorkspace">Go to Workspace</b-button>
        </div>
        <div class="grouptable">
            <div>
                <b-alert v-model="groupError" variant="danger" dismissible
                         @dismissed="callDismissed">
                    Group name not available
                </b-alert>
            </div>
            <div v-if="this.groupsLoading" class="d-flex justify-content-center mb-3">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            <b-table striped hover responsive :items="groupItems" :fields="fields" selectable
                     ref="selectableTable"
                     select-mode="single"
                     @row-selected="onRowSelected" caption-top>
                <template v-slot:table-caption>Groups</template>
            </b-table>
            <div class="addGr">
                <b-button variant="outline-primary" v-on:click="addGr">Add Group</b-button>
            </div>
        </div>

        <div>
            <b-modal ref="groupmodel" scrollable title="Group Profile" ok-title="Update">
                <div class="groupform">
                    <div class="groupformItem">
                        <p>Id</p>
                        <b-form-input v-model="selectedId" disabled></b-form-input>
                    </div>
                    <div class="groupformItem">
                        <p>Name</p>
                        <b-form-input v-model="selectedName" disabled></b-form-input>
                    </div>
                    <div class="groupformItem">
                        <p>Description</p>
                        <b-form-input v-model="selectedDescription"></b-form-input>
                    </div>
                    <div class="groupformItem">
                        <p>OwnerId</p>
                        <b-form-input v-model="selectedOwnerId" disabled></b-form-input>
                    </div>
                    <div v-if="!this.operationCompleted" class="d-flex justify-content-center mb-3">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                    <div class="groupformItem">
                        <p>Members</p>
                        <b-table striped hover responsive :items="members" selectable select-mode="single"
                                 @row-selected="onMemberShipSelected">
                        </b-table>
                    </div>

                    <div class="w-100">
                        <b-button class="addmemberbtn" variant="outline-primary"  :disabled="disableAccess" v-on:click="addMemberShip">Add Member
                        </b-button>
                    </div>
                    <div class="groupformItem">
                        <p>Child Groups</p>
                        <b-table striped hover responsive :items="childGroupMembers" :fields="memberGroupsFields"
                                 selectable select-mode="single"
                                 @row-selected="onGroupMemberShipSelected">
                        </b-table>
                    </div>
                    <div class="w-100">
                        <b-button class="addmemberbtn" variant="outline-primary"  :disabled="disableAccess"  v-on:click="addChildGroup">Add Child
                            Group
                        </b-button>
                    </div>

                </div>
                <template v-slot:modal-footer>
                    <div class="w-100">
                        <b-button
                                variant="primary"
                                size="sm"
                                class="grBtnDel"
                                v-on:click="removeGroupProfile"
                                :disabled="disableAccess"
                                @click="show=false"
                        >
                            Delete
                        </b-button>
                        <b-button
                                variant="primary"
                                size="sm"
                                class="grBtnCl"
                                v-on:click="closeGroupProfile"
                                @click="show=false"

                        >
                            Close
                        </b-button>
                        <b-button
                                variant="primary"
                                size="sm"
                                class="grBtnUp"
                                v-on:click="updateGroupProfile"
                                :disabled="disableAccess"
                                @click="show=false"

                        >
                            Update
                        </b-button>
                    </div>
                </template>
            </b-modal>
        </div>
        <div>
            <div>
                <b-modal ref="membershipModel" title="Update Membership" ok-title="Update">
                    <div class="groupform">
                        <div class="groupformItem">
                            <p>Owner Id</p>
                            <b-form-input v-model="selectedMembershipUsername" disabled></b-form-input>
                        </div>
                        <div class="groupformItem">
                            <p>Type</p>
                            <b-form-select v-model="selectedMembershipType">
                                <option v-for="(selectOption, indexOpt) in memberTypes"
                                        :key="indexOpt"
                                        :value="selectOption"
                                >
                                    {{ selectOption }}
                                </option>
                            </b-form-select>
                        </div>

                    </div>
                    <template v-slot:modal-footer>
                        <div class="w-100">
                            <b-button
                                    variant="primary"
                                    size="sm"
                                    class="memBtnDel"
                                    v-on:click="removeMembership"
                                    @click="show=false"
                            >
                                Remove Membership
                            </b-button>
                            <b-button
                                    variant="primary"
                                    size="sm"
                                    class="memBtnCl"
                                    v-on:click="closeMembershipModel"
                                    @click="show=false"

                            >
                                Close
                            </b-button>
                            <b-button
                                    variant="primary"
                                    size="sm"
                                    class="memBtnUp"
                                    v-on:click="updateMembership"
                                    @click="show=false"

                            >
                                Update
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
            <div>
                <b-modal ref="addMembershipModel" title="Add Membership" ok-title="Add" @ok="addMembershipOKPressed">
                    <div class="groupform">
                        <div v-if="selectedChildType==='User'" class="groupformItem">
                            <p>Username</p>
                            <b-form-select v-model="selectedNewUsername">
                                <option v-for="(selectOption, indexOpt) in usernames"
                                        :key="indexOpt"
                                        :value="selectOption"
                                >
                                    {{ selectOption }}
                                </option>
                            </b-form-select>
                        </div>
                        <div v-if="selectedChildType==='User'" class="groupformItem">
                            <p>Type</p>
                            <b-form-select v-model="selectedNewMemType">
                                <option v-for="(selectOption, indexOpt) in memberTypes"
                                        :key="indexOpt"
                                        :value="selectOption"
                                >
                                    {{ selectOption }}
                                </option>
                            </b-form-select>
                        </div>

                    </div>
                </b-modal>
            </div>
            <div>
                <b-modal ref="addGrModel" title="Add Group" ok-title="Add" @ok="addGroupOKPressed">
                    <div class="groupform">
                        <div class="groupformItem">
                            <p>Name</p>
                            <b-form-input v-model="selectedNewGrName"></b-form-input>
                        </div>
                        <div class="groupformItem">
                            <p>Description</p>
                            <b-form-input v-model="selectedNewGrDesc"></b-form-input>
                        </div>

                    </div>
                </b-modal>
                <b-modal ref="viewGrMembership" title="Group" cancel-title="Delete" @cancel="removeGroupMembership">
                    <div class="groupform">
                        <div class="groupformItem">
                            <p>Name</p>
                            <b-form-input v-model="selectedGrName"></b-form-input>
                        </div>
                        <div class="groupformItem">
                            <p>Id</p>
                            <b-form-input v-model="selectedGrId"></b-form-input>
                        </div>

                    </div>
                </b-modal>
                <b-modal ref="addGrMembershipModel" title="Add Group Membership" ok-title="Add"
                         @ok="addChildGroupOkPressed">
                    <div class="groupform">
                        <p>Select Group Id</p>
                        <b-form-select v-model="addingGr">
                            <option v-for="(selectOption, indexOpt) in feasibleGroupMembers"
                                    :key="indexOpt"
                                    :value="selectOption"
                            >
                                {{ selectOption.name }}
                            </option>
                        </b-form-select>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>

</template>

<script>

    import config from "@/config";

    export default {
        name: "Groups",
        data: function () {
            return {
                fields: ['name', 'id', 'description', 'ownerId'],
                groupItems: [],
                members: [],
                childGroupMembers: [],
                feasibleGroupMembers: [],
                usernames: [],
                exGroups: [
                    '1234-edrfg-567-rfgbn', '1234-ed-5634-rfn'
                ],
                memberTypes: [
                    'ADMIN', 'MEMBER'],
                memberGroupsFields: ['name', 'id'],
                selectedId: null,
                selectedName: null,
                selectedDescription: null,
                selectedOwnerId: null,
                selectedMembershipItem: null,
                selectedMembershipUsername: null,
                selectedMembershipType: null,
                selectedNewMemType: 'Member',
                selectedNewUsername: null,
                selectedNewGrName: null,
                selectedNewGrDesc: null,
                selectedChildType: 'User',
                selectedExGr: null,
                selectedGrName: null,
                selectedGrId: null,
                selectedGr: null,
                addingGr: null,
                groupsLoading: false,
                operationCompleted: true,
                currentUser: null,
                groupError: null,
                disableAccess: false

            }
        },
        methods: {
            async onRowSelected(items) {
                if (items != null && items.length > 0) {
                    this.selectedItem = items
                    this.selectedId = this.selectedItem[0].id
                    this.selectedName = this.selectedItem[0].name
                    this.selectedDescription = this.selectedItem[0].description
                    this.selectedOwnerId = this.selectedItem[0].ownerId

                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        group_id: this.selectedId
                    }

                    let users = await this.$store.dispatch('group/getAllChildUsers', data)

                    this.members = []
                    users.profiles.forEach(user => {

                        let usr = {user_id: user.username, type: user.membership_type}
                        this.members.push(usr)
                    })

                    let response = await this.$store.dispatch('group/getAllChildGroups', data)
                    this.childGroupMembers = response.groups

                    if (!this.isAdminUser && this.selectedOwnerId != this.currentUser) {

                        let data = {
                            client_id: this.custosId,
                            client_sec: this.custosSec,
                            groupId: this.selectedId,
                            username: this.currentUser,
                            type: 'ADMIN'
                        }

                        let resp = await this.$store.dispatch('group/hasAccess', data)

                        if (!resp.status) {
                            this.disableAccess = true

                        }

                    }

                    this.$refs.groupmodel.show()
                }
            },
            onMemberShipSelected: function (items) {
                this.selectedMembershipItem = items

                this.selectedMembershipUsername = this.selectedMembershipItem[0].user_id
                this.selectedMembershipType = this.selectedMembershipItem[0].type
                if (this.selectedMembershipType !== 'OWNER') {
                    this.$refs.membershipModel.show()
                }
            },

            onGroupMemberShipSelected: function (items) {
                if (items != null && items.length > 0) {
                    this.selectedGr = items
                    this.selectedGrId = this.selectedGr[0].id
                    this.selectedGrName = this.selectedGr[0].name
                    this.$refs.viewGrMembership.show()
                }
            },

            async addChildGroup() {
                let grs = []
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    groupId: this.selectedId
                }

                let parentGroups = await this.$store.dispatch('group/getAllParentGroups', dat)
                this.groupItems.forEach(gr => {
                    let addToGroup = true
                    this.childGroupMembers.forEach(lx => {
                        if (gr.id === lx.id) {
                            addToGroup = false
                        }
                    })
                    if (gr.id === this.selectedId) {
                        addToGroup = false
                    }

                    if (parentGroups != null && parentGroups.length > 0) {
                        parentGroups.forEach(pGr => {
                            if (gr.id === pGr.id) {
                                addToGroup = false
                            }

                        })

                    }

                    if (addToGroup) {
                        grs.push(gr)
                    }
                })

                this.feasibleGroupMembers = grs
                this.$refs.addGrMembershipModel.show()
            },

            async addChildGroupOkPressed() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        child_id: this.addingGr.id,
                        parent_id: this.selectedId
                    }
                }

                let status = await this.$store.dispatch('group/addChildGroup', data)
                if (status) {
                    this.childGroupMembers.push(this.addingGr)
                }
                this.operationCompleted = true
            },

            async addMemberShip() {
                let users = []
                this.usernames.forEach(user => {
                    if (user != this.selectedOwnerId) {
                        let add = true
                        this.members.forEach(mem => {
                            if (mem.user_id === user) {
                                add = false
                            }
                        })
                        if (add) {
                            users.push(user)
                        }
                    }
                })
                this.usernames = users
                this.$refs.addMembershipModel.show()
            },

            addGr: function () {
                this.$refs.addGrModel.show()
            },

            async addGroupOKPressed() {
                this.groupsLoading = true
                let username = await this.$store.dispatch('identity/getCurrentUserName')
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUser,
                    body: {
                        groups: [{
                            name: this.selectedNewGrName,
                            description: this.selectedNewGrDesc,
                            ownerId: username,
                            realm_roles: [],
                            client_roles: [],
                            attributes: [],
                            sub_groups: []
                        }]
                    }
                }
                let response = await this.$store.dispatch('group/createGroup', data)
                console.log(response)
                if (!response) {
                    this.groupError = true
                    this.groupsLoading = false
                } else {
                    await this.loadGroups(data)
                    this.groupsLoading = false
                    this.this.selectedNewGrName = null
                    this.selectedNewGrDesc = null
                }
            },

            async loadUsers() {
                let data = {offset: 0, limit: 50, client_id: this.custosId, client_sec: this.custosSec}
                await this.$store.dispatch('user/users', data)
                let resp = await this.$store.getters['user/getUsers']
                this.usernames = []
                if (Array.isArray(resp) && resp.length > 0) {
                    resp.forEach(obj => {
                        this.usernames.push(obj.username)
                    });

                }
            },

            async addMembershipOKPressed() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, body: {
                        group_id: this.selectedId,
                        username: this.selectedNewUsername,
                        membership_type: this.selectedNewMemType
                    }
                }
                let response = await this.$store.dispatch('group/addUserToGroup', data)

                if (response.status) {
                    let obj = {user_id: this.selectedNewUsername, type: this.selectedNewMemType}
                    this.members.push(obj)
                }
                this.operationCompleted = true
            },

            async updateMembership() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, body: {
                        group_id: this.selectedId,
                        username: this.selectedMembershipUsername,
                        type: this.selectedMembershipType
                    }
                }
                let response = await this.$store.dispatch('group/changeGroupMembership', data)

                if (response.status) {
                    let obj = {user_id: this.selectedMembershipUsername, type: this.selectedMembershipType}
                    let newMems = []
                    this.members.forEach(mem => {
                        if (mem.user_id !== this.selectedMembershipUsername) {
                            newMems.push(mem)
                        }
                    })

                    newMems.push(obj)
                    this.members = newMems
                }
                this.operationCompleted = true
                this.$refs.membershipModel.hide()
            },

            async removeMembership() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, body: {
                        group_id: this.selectedId,
                        username: this.selectedMembershipUsername
                    }
                }
                let response = await this.$store.dispatch('group/removeUserFromGroup', data)

                if (response.status) {
                    let newMems = []
                    this.members.forEach(mem => {
                        if (mem.user_id !== this.selectedMembershipUsername) {
                            newMems.push(mem)
                        }
                    })
                    this.members = newMems
                }
                this.operationCompleted = true
                this.$refs.membershipModel.hide()
            },


            async updateGroupProfile() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, group_id: this.selectedId, body: {
                        group: {
                            name: this.selectedName,
                            ownerId: this.selectedOwnerId,
                            description: this.selectedDescription,
                            realm_roles: [],
                            client_roles: [],
                            attributes: [],
                            sub_groups: []
                        }
                    }
                }
                await this.$store.dispatch('group/updateGroup', data)
                this.$refs.groupmodel.hide()
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUser
                }
                await this.loadGroups(dat)
                this.operationCompleted = true
            },


            async removeGroupProfile() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId, client_sec: this.custosSec, group_id: this.selectedId, body: {
                        group: {
                            name: this.selectedName,
                            ownerId: this.selectedOwnerId,
                            description: this.selectedDescription,
                            realm_roles: [],
                            client_roles: [],
                            attributes: [],
                            sub_groups: []
                        }
                    }
                }
                await this.$store.dispatch('group/deleteGroup', data)
                this.$refs.groupmodel.hide()
                let dat = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    username: this.currentUser
                }
                await this.loadGroups(dat)
                this.operationCompleted = true
            },


            async closeGroupProfile() {
                this.$refs.groupmodel.hide()
            },

            async closeMembershipModel() {
                this.$refs.membershipModel.hide()
            },

            async removeGroupMembership() {
                this.operationCompleted = false
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec,
                    body: {
                        child_id: this.selectedGrId,
                        parent_id: this.selectedId
                    }
                }

                let status = await this.$store.dispatch('group/removeChildGroup', data)
                if (status) {
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec,
                        group_id: this.selectedId
                    }

                    let response = await this.$store.dispatch('group/getAllChildGroups', data)
                    this.childGroupMembers = response.groups
                }
                this.operationCompleted = true
            },


            async loadGroups(data) {
                if (this.isAdminUser) {
                    this.groupItems = await this.$store.dispatch('group/loadAllGroups', data)
                } else {
                    let grs = []
                    grs = await this.$store.dispatch('group/getAllGroupsOfUser', data)
                    let groups = []
                    grs.forEach(gr => {
                        gr.ownerId = gr.owner_id
                        groups.push(gr)
                    })
                    this.groupItems = groups
                }
            },

            async goToWorkspace() {
                await this.$router.push('/workspace')
            },

            async callDismissed() {
                this.groupError = false
            },


        },
        async mounted() {
            this.groupsLoading = true
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdminUser = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
            this.currentUser = await this.$store.dispatch('identity/getCurrentUserName')
            let data = {
                client_id: this.custosId,
                client_sec: this.custosSec,
                username: this.currentUser
            }
            await this.loadGroups(data)
            this.groupsLoading = false
            this.loadUsers()
        }
    }
</script>

<style scoped>
    .grouptable {
        width: 50%;
        margin-left: 10%;
        margin-top: 3%;
    }

    .groupformItem {
        margin-top: 3%;
    }

    .grBtnDel {
        margin-left: 30%;
        position: relative;
        background-color: red;
    }

    .grBtnCl {
        margin-left: 10%;
        position: relative;
        background-color: darkgrey;
    }

    .grBtnUp {
        margin-left: 10%;
        position: relative;
    }

    .addmemberbtn {
        position: relative;
        margin-left: 50%;
    }

    .removememberbtn {
        position: relative;
        margin-left: 20%;

    }

    .memBtnDel {
        margin-left: 10%;
        position: relative;
        background-color: red;
    }

    .memBtnCl {
        margin-left: 10%;
        position: relative;
        background-color: darkgrey;
    }

    .memBtnUp {
        margin-left: 10%;
        position: relative;
    }

    .addGr {
        margin-right: 0;
        position: relative;
    }

    .gotoWork {
        margin-left: 70%;
    }
</style>