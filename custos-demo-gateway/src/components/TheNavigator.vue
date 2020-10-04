<template>
    <nav id ="nav">
        <router-link to="/">Landing Page</router-link>
        <router-link to="/register">User Account Creation</router-link>
        <router-link to="/workspace">Work Space</router-link>
        <router-link to="/workspace/groups">Work Space</router-link>
        <router-link to="/workspace/users">Work Space</router-link>
        <router-link to="/workspace/logs">Work Space</router-link>
        <router-link to="/workspace/secrets">Work Space</router-link>
        <router-link to="/workspace/sharings">Work Space</router-link>
        <router-link to="/callback">Work Space</router-link>
    </nav>
    
</template>

<script>
    export default {
        name: "TheNavigator"
    }
</script>

<style scoped>

</style>