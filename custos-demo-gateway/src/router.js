import Vue from "vue";
import Router from "vue-router";
import Landing from "./components/landing/Landing.vue";
import store from './new-service/store'
import {custosService} from "@/new-service/store/util/custos.util";
// import {custosService} from "@/new-service/store/util/custos.util";

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Landing
        },
        {
            path: "/register",
            name: "account",
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/registration/CreateAccount")
        },
        {
            path: "/tenant/:tenantId/workspace",
            name: "workspace",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"workspace"*/  "./components/workspace/Workspace")
        },
        {
            path: "/tenant/:tenantId/workspace/groups",
            name: "groups",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./components/workspace/Groups")
        },
        {
            path: "/workspace/profile",
            name: "profile",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./components/workspace/Profile")
        },
        {
            path: "/tenant/:tenantId/workspace/profile",
            name: "tenantUserProfile",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"groups"*/  "./components/workspace/Profile")
        },
        {
            path: "/tenant/:tenantId/workspace/logs",
            name: "logs",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"logs"*/  "./components/workspace/Logs")
        },
        {
            path: "/tenant/:tenantId/workspace/secrets",
            name: "secrets",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"secrets"*/  "./components/workspace/Secrets")
        },
        {
            path: "/tenant/:tenantId/workspace/sharings",
            name: "sharings",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"sharings"*/  "./components/workspace/Sharing")
        },
        {
            path: "/tenant/:tenantId/workspace/users",
            name: "users",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/workspace/Users")
        },
        {
            path: "/tenant/:tenantId/workspace/agents",
            name: "agents",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/workspace/Agents")
        },
        {
            path: "/tenants/default",
            name: "tenants-default",
            beforeEnter: async (to, from, next) => {
                next(`/tenants/${custosService.clientId}`);
            }
        },
        {
            path: "/tenants/:clientId/child-tenants",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/ListTenants")
        },
        {
            path: "/tenants/:clientId/child-tenants/new",
            name: "tenants-new",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/NewTenant")
        },
        {
            path: "/tenants/:clientId",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                next(`/tenants/${to.params.clientId}/child-tenants`);
            }
            // beforeEnter: async (to, from, next) => {
            //     await _validateAuthenticationBeforeEnter(to, from, next)
            // },
            // component: () =>
            //     import(/*webpackChunkName:"account"*/  "./components/admin-portal/TenantHome")
        },
        {
            path: "/tenants/:clientId/profile",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/TenantProfile")
        },
        {
            path: "/tenants/:clientId/users",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/TenantUsers")
        },
        {
            path: "/tenants/:clientId/groups",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/TenantGroups")
        },
        {
            path: "/tenants/:clientId/groups/new",
            name: "tenants",
            beforeEnter: async (to, from, next) => {
                await _validateAuthenticationBeforeEnter(to, from, next)
            },
            component: () =>
                import(/*webpackChunkName:"account"*/  "./components/admin-portal/TenantNewGroup")
        },
        {
            path: "/callback",
            name: "callback",
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/Callback")
        },
        {
            path: "*",
            name: "notFound",
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/404")
        },
        {
            path: "/tenant/:tenantId/login",
            name: "tenantLogin",
            props: true,
            component: () =>
                import(/*webpackChunkName:"users"*/  "./components/landing/TenantLogin")
        },

    ]


})

// async function validate(next) {
//     if (await store.getters["auth/authenticated"] === true) {
//         // You can use store variable here to access globalError or commit mutation
//         console.log("Authenticationed")
//         next(true)
//     } else {
//         console.log("NOT Authenticationed")
//         next('/')
//     }
// }

async function _validateAuthenticationBeforeEnter(to, from, next) {
    await store.dispatch('auth/refreshAuthentication');
    const authenticated = store.getters['auth/authenticated'];


    console.log("store ", store)
    if (!authenticated) {
        console.log("NOT authenticated");
        // next(true);
        next('/');
    } else {
        const username = store.getters["auth/currentUsername"];
        await store.dispatch('user/fetchUsers', {username});
        await store.dispatch("tenant/fetchTenant", {clientId: custosService.clientId});

        console.log("YES authenticated");
        next(true);
    }
}

// async function _validateSuperAdminAuthenticationBeforeEnter(to, from, next) {
//     await _validateAuthenticationBeforeEnter(to, from, async (nextArg) => {
//         await store.dispatch("tenant/fetchTenant", {clientId: custosService.clientId});
//         const appTenant = store.getters["tenant/getTenant"]({clientId: custosService.clientId});
//
//         // const username = store.getters["auth/currentUsername"];
//
//         console.log("@@@@@@@@ appTenant : ", appTenant);
//         next(nextArg);
//     });
// }
