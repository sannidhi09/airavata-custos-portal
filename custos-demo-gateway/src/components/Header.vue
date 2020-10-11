<template>
    <div v-if="showHeader()">
        <div class="header p-3">
            <div class="custos-logo">
                <img src="../assets/custos-logo_custos-logo-color-v1.png" style="width: 140px;">
            </div>
            <div class="user-details" v-if="user">
                <div class="username">{{user.first_name + " "+ user.last_name}}</div>
                <div class="email">{{user.email}}</div>
            </div>

            <b-dropdown v-if="user" right class="ml-2" text="" no-caret toggle-class="user-avatar-button">
                <template slot="button-content">
                    <b-icon icon="person-fill"></b-icon>
                </template>
                <b-dropdown-item href="#" v-on:click="$router.push('/workspace/profile')">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
            </b-dropdown>

        </div>
        <div class="navigation text-left" v-if="user">
            <b-button href="#" variant="link" v-on:click="$router.push('/workspace')">
                <b-icon icon="house-door-fill"></b-icon>
            </b-button>
            <b-button v-if="this.isAdmin" href="#" variant="link" v-on:click="$router.push('/workspace/users')">
                Users
            </b-button>
            <b-button href="#" variant="link" v-on:click="$router.push('/workspace/groups')">
                Groups
            </b-button>
            <b-button v-if="this.isAdmin" href="#" variant="link" v-on:click="$router.push('/workspace/agents')">
                Service Accounts
            </b-button>
            <b-button href="#" variant="link" v-on:click="$router.push('/workspace/secrets')">
                Secrets
            </b-button>
            <b-button href="#" variant="link" v-on:click="$router.push('/workspace/sharings')">
                Sharing
            </b-button>
            <b-button v-if="this.isAdmin" href="#" variant="link" v-on:click="$router.push('/workspace/logs')">
                Logs
            </b-button>
        </div>
    </div>
</template>

<script>

    import config from "@/config";

    export default {
        name: "Header",
        data: function () {
            return {
                custosId: null,
                custosSec: null,
                isAdmin: false,
                user: null,
                currentUserName: null
            }
        },
        methods: {
            showHeader() {
                console.log("--- this.currentUserName --- ", this.currentUserName)
                return this.currentUserName !== null
            },
            async logout() {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec
                }
                await this.$store.dispatch('identity/logout', data)


                // TODO fix in https://github.com/apache/airavata-custos-portal/issues/37
                window.location.reload()

                // await this.$router.push("/")
                // await this.$store.dispatch('agent/reset')
                // await this.$store.dispatch('group/reset')
                // await this.$store.dispatch('secret/reset')
                // await this.$store.dispatch('sharing/reset')
                // await this.$store.dispatch('user/reset')
            }
        },

        async mounted() {
            try {
                this.custosId = config.value('clientId')
                this.custosSec = config.value('clientSec')
                this.isAdmin = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')

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
                    })
                }
            } catch (e) {
                console.log("ERRRRRR==== ", e)
            }
        }
    }
</script>

<style>
    .header {
        display: flex;
    }

    .header .custos-logo {
        flex: 1;
        display: flex;
    }

    .header .custos-logo-icon {
        width: 25px;
        height: 25px;
        border-radius: 8px;
        border: solid 5px #203a43;
        background-color: #ffffff;
        transform: rotate(45deg);
    }

    .header .custos-logo-text {
        font-family: Avenir;
        font-size: 18px;
        font-weight: 900;
        text-align: left;
        color: #203a43;

    }

    .header .user-details .username {
        font-family: Avenir;
        font-size: 15px;
        font-weight: 900;
        text-align: right;
        color: #afafae;
    }

    .header .user-details .email {
        font-family: Avenir;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.07;
        text-align: right;
        color: #203a43;
    }

    .header .user-avatar-button {
        border-radius: 30px;
        width: 35px;
        height: 35px;
        padding: 0px;
        line-height: 0px;
        font-size: 15px;
    }

    .navigation {
        background-color: #fff9cc;
    }

    .navigation a {
        font-family: Avenir;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        color: #203a43;
    }

    .navigation a:hover {
        color: #203a43;
    }

    .navigation a:focus {
        outline: none;
        box-shadow: none;
    }
</style>