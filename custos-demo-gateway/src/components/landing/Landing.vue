<template>
    <div class="landing">

        <div class="row">

            <div class="column">
                <h2>Welcome to Custos Explorer</h2>
                <p>SignUp and explore capabilities</p>
                <img src="./../../assets/custos_home.png">
            </div>
            <div class="column">
                <div class="login">
                    <div class="exlogin">
                        <p>Login with your existing organization</p>
                        <b-button variant="primary" v-on:click="this.loadAuthURL">Login with Institution</b-button>
                    </div>
                    <div class="locallogin">
                        <p>Login with Custos Explorer (Not registered ?
                            <router-link to="/register">Create Account</router-link>
                            )
                        </p>

                        <div class="logininput">
                            <b-form-input v-model="username" placeholder="Username"></b-form-input>

                        </div>
                        <div class="logininput">
                            <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
                        </div>
                        <div class="logininput">
                            <b-button variant="primary" v-on:click="this.login" :disabled="this.loginDisabled">
                                <div v-if="this.loginDisabled">
                                    <b-spinner small></b-spinner>
                                </div>
                                Login
                            </b-button>
                        </div>
                    </div>
                    <div>
                        <b-alert v-model="this.loginError" variant="danger" dismissible @dismissed="this.callDismissed">
                            Invalid Username or Password
                        </b-alert>
                    </div>


                </div>

            </div>
        </div>

    </div>
</template>

<script>

    import config from "@/config";
    import store from "@/store";

    export default {
        name: 'Landing',
        props: {
            msg: String,
            seen: Boolean,
            todos: Array
        },
        data: function () {
            return {
                username: "",
                password: "",
                custosId: null,
                custosSec: null,
                loginDisabled: false,
                redirectURI: null,
                loginError: false
            }
        },
        methods: {

            async login() {
                this.loginDisabled = true
                if (this.username != null && this.username != '' && this.password != null && this.password != '') {
                    let params = {
                        client_id: this.custosId, client_sec: this.custosSec, username: this.username,
                        password: this.password, token_endpoint: this.tokenEndpoint
                    };
                    let data = {
                        client_id: this.custosId,
                        client_sec: this.custosSec
                    }
                    await this.$store.dispatch('identity/authenticateLocally', params)
                    let resp = await this.$store.dispatch('identity/isAuthenticated', data)
                    if (resp) {
                        await this.$router.push('workspace')
                        let data = {
                            offset: 0, limit: 1, client_id: this.custosId, client_sec: this.custosSec,
                            username: this.username
                        }
                        let resp = await this.$store.dispatch('user/users', data)
                        if (Array.isArray(resp) && resp.length > 0) {
                            resp.forEach(user => {
                                let data = {
                                    client_id: this.custosId,
                                    client_sec: this.custosSec,
                                    body: {
                                        username: user.username,
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        email: user.email,
                                    }
                                }
                                this.$store.dispatch('user/updateUserProfile', data)

                            })
                        }

                    } else {
                        this.loginError = true
                    }
                } else {
                    this.loginError = true
                }
                this.loginDisabled = false
            },


            async callDismissed() {
                this.loginError = false
            },
            async loadAuthURL() {
                let params = {client_id: this.custosId, redirect_uri: this.redirectURI};
                await this.$store.dispatch('identity/fetchAuthorizationEndpoint', params)
                window.location.href = this.$store.getters['identity/getAuthorizationEndpoint']
            }
        },

        async mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
            this.redirectURI = config.value('redirectURI')
            this.tokenEndpoint = "https://custos.scigap.org/apiserver/identity-management/v1.0.0/token"
            let data = {
                client_id: this.custosId,
                client_sec: this.custosSec
            }
            if (await store.dispatch('identity/isAuthenticated', data) == true) {

                await this.$router.push('workspace')
            }

        },

        computed: {
            // ...mapGetters({
            //
            // })
        }


    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h2 {
        margin: 40px 0 0;
        font-size: xx-large;
        font-family: "Arial";;
    }

    p {
        font-size: medium;
        font-family: "Arial";
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    * {
        box-sizing: border-box;
    }

    /* Create two equal columns that floats next to each other */
    .column {
        float: left;
        width: 50%;
        padding: 10px;
        height: 300px; /* Should be removed. Only for demonstration */
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .login {
        height: 10%;
        position: relative;
        top: 50%;
        z-index: 2;
        width: 60%;
        left: 20%;
    }

    .exlogin {
        background-color: whitesmoke;
        box-sizing: border-box;
        margin-top: 20%;
    }

    .locallogin {
        background-color: whitesmoke;
        box-sizing: border-box;
        position: relative;
        margin-top: 7%;
    }

    .logininput {
        width: 60%;
        position: relative;
        left: 20%;
        margin-top: 4%;
    }

</style>
