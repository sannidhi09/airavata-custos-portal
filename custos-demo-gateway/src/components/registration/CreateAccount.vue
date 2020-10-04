<template>
    <div class="account">
        <div class="row">
            <div class="column">
                <div class="login">
                    <div class="locallogin">
                        <h2> Create account </h2>

                        <div class="logininput">
                            <p>Username</p>
                        </div>
                        <div class="logininput">
                            <b-form-input v-model="username" placeholder="Username"></b-form-input>
                        </div>
                        <div class="logininput">
                            <p>Password</p>
                        </div>
                        <div class="logininput">
                            <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
                        </div>
                        <div class="logininput">
                            <p>Password</p>
                        </div>
                        <div class="logininput">
                            <b-form-input type="password" v-model="confirmedPassword"
                                          placeholder="Confirm Password"></b-form-input>
                        </div>
                        <div class="logininput">
                            <p>Email</p>
                        </div>
                        <div class="logininput">
                            <b-form-input type="email" v-model="email" placeholder="Email"></b-form-input>
                        </div>
                        <div class="logininput">
                            <p>First Name</p>
                        </div>
                        <div class="logininput">
                            <b-form-input type="email" v-model="firstName" placeholder="First Name"></b-form-input>
                        </div>
                        <div class="logininput">
                            <p>Last Name</p>
                        </div>
                        <div class="logininput">
                            <b-form-input type="email" v-model="lastName" placeholder="Last Name"></b-form-input>
                        </div>
                        <div class="logininput">
                            <b-button variant="primary" v-on:click="this.registerUser" :disabled="this.isButtonDisabled">
                                <div v-if="this.isButtonDisabled">
                                    <b-spinner small></b-spinner>
                                </div>
                                Create Account</b-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
    import config from "@/config";

    export default {
        name: "CreateAccount",
        data: function () {
            return {
                username: "",
                password: "",
                confirmedPassword: null,
                email: null,
                firstName: null,
                lastName: null,
                custosId: null,
                custosSec: null,
                isButtonDisabled:false
            }
        },

        methods: {

            async registerUser() {
                this.isButtonDisabled = true
                if (this.password != null && this.confirmedPassword != null && this.password === this.confirmedPassword) {

                    if (this.username != null && this.firstName != null && this.lastName != null) {
                        let body = {
                            'client_id': this.custosId,
                            'client_sec': this.custosSec,
                            'username': this.username,
                            'first_name': this.firstName,
                            'last_name': this.lastName,
                            'password': this.password,
                            'temporary_password': false,
                            'email': this.email
                        }
                        let avilable = await this.$store.dispatch('user/checkUsernameIsValid', body)
                        if (avilable) {
                            let status = await this.$store.dispatch('user/registerUser', body)
                            if (status) {
                                await this.$router.push("/")
                            } else {
                                alert("Some error occurred")
                            }

                        } else {
                            alert("Username is not valid")
                        }
                    } else {
                        alert("fill all fields")
                    }

                } else {
                    alert("password mismatch")
                }
                this.isButtonDisabled = true
            },

        },

        mounted() {
            this.custosId = config.value('clientId')
            this.custosSec = config.value('clientSec')
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
        text-align: left;
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
        margin-top: 5%;
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
        margin-top: 2%;
    }

</style>