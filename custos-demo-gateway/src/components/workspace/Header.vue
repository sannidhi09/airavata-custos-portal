<template>
    <div class="header p-3">
        <div class="custos-logo">
            <div class="custos-logo-icon"></div>
            <div class="custos-logo-text pl-2">Custos</div>
        </div>
        <div class="user-details">
            <div class="username">John Doe</div>
            <div class="email">johndoe@iu.com</div>
        </div>

        <b-dropdown right class="ml-2" text="">
            <b-dropdown-item href="#" disabled>Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-dropdown>

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
                isAdmin: false
            }
        },
        methods: {
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

</style>