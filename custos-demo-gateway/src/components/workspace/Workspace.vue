<template>
    <div>
        <Header/>
        <div class="p-3">
            <div class="logout">
                <b-button href="#" v-on:click="logout">Logout</b-button>
            </div>
            <div class="grouping">
                <b-card-group deck>
                    <b-card :img-src="require('../../assets/users.png')"
                            img-height="50%"
                            style="max-width: 20rem;"
                            class="mb-2"
                            body-class="bcbody"
                    >
                        <b-button href="#" variant="outline-primary" v-on:click="loadRoute($event, '/workspace/users')">
                            Manage Users
                        </b-button>
                    </b-card>
                    <b-card :img-src="require('../../assets/groups_web.png')"
                            img-height="50%"
                            style="max-width: 20rem;"
                            class="mb-2"
                            body-class="bcbody"
                    >
                        <b-button href="#" variant="outline-primary"
                                  v-on:click="loadRoute($event, '/workspace/groups')">
                            Manage Groups
                        </b-button>
                    </b-card>
                    <b-card :img-src="require('../../assets/credentials.png')"
                            img-height="50%"
                            style="max-width: 20rem;"
                            class="mb-2"
                            body-class="bcbody"
                    >
                        <b-button href="#" variant="outline-primary"
                                  v-on:click="loadRoute($event, '/workspace/secrets')">
                            Manage Secrets
                        </b-button>
                    </b-card>
                </b-card-group>
            </div>
            <div class="groupingbt">
                <b-card-group deck>
                    <b-card :img-src="require('../../assets/sharings.png')"
                            img-height="50%"
                            style="max-width: 20rem;"
                            class="mb-2"
                            body-class="bcbody"
                    >
                        <b-button href="#" variant="outline-primary"
                                  v-on:click="loadRoute($event, '/workspace/sharings')">
                            Sharing
                        </b-button>
                    </b-card>
                    <b-card :img-src="require('../../assets/bots.png')"
                            img-height="50%"
                            style="max-width: 20rem;"
                            class="mb-2"
                            body-class="bcbody"
                    >
                        <b-button href="#" variant="outline-primary" :disabled="!isAdmin"
                                  v-on:click="loadRoute($event, '/workspace/agents')">
                            Community Accounts
                        </b-button>
                    </b-card>
                    <b-card :img-src="require('../../assets/dblogs.png')"
                            img-height="50%"
                            style="max-width: 20rem;"
                            class="mb-2"
                            body-class="bcbody"
                    >
                        <b-button href="#" variant="outline-primary" :disabled="!isAdmin"
                                  v-on:click="loadRoute($event, '/workspace/logs')">
                            Logs
                        </b-button>
                    </b-card>
                </b-card-group>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "@/config";
    import Header from "@/components/workspace/Header";

    export default {
        name: "Workspace",
        components: {Header},
        data: function () {
            return {
                custosId: null,
                custosSec: null,
                isAdmin: false
            }
        },
        methods: {
            loadRoute: function (event, route) {
                this.$router.push(route)
            },
            async logout() {
                let data = {
                    client_id: this.custosId,
                    client_sec: this.custosSec
                }
                await this.$store.dispatch('identity/logout', data)
                await this.$router.push("/")
                await this.$store.dispatch('agent/reset')
                await this.$store.dispatch('group/reset')
                await this.$store.dispatch('secret/reset')
                await this.$store.dispatch('sharing/reset')
                await this.$store.dispatch('user/reset')
            }
        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.isAdmin = await this.$store.dispatch('identity/isLoggedUserHasAdminAccess')
        }
    }
</script>

<style scoped>
    .grouping {
        position: relative;
        margin-left: 30%;
        width: 40%;
        margin-top: 5%;
    }

    .groupingbt {
        position: relative;
        margin-left: 30%;
        width: 40%;
        margin-top: 5%;
    }

    .bcbody {
        background-color: lightgray;
        height: 30%;
    }

    .logout {
        margin-left: 70%;
    }

</style>