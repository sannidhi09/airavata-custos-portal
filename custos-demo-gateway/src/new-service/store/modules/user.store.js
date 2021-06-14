import {custosService} from "../util/custos.util";

const getDefaultState = () => {
    return {
        userMap: {},
        userListMap: {}
    }
}

const state = getDefaultState()

const actions = {
    async fetchUsers({commit}, {username = null, offset = 0, limit = 10, groupId = null, tenantId = null, clientId = null}) {
        const params = {username, offset, limit, groupId, tenantId, clientId};
        const queryString = JSON.stringify(params);
        const users = await custosService.users.findUsers(params);

        const usernames = users.map((
            {id, username, first_name, last_name, email, realm_roles, client_roles, attributes, membership_type, state}
        ) => {
            commit("SET_USER", {
                id,
                username,
                firstName: first_name,
                lastName: last_name,
                email,
                realmRoles: realm_roles,
                clientRoles: client_roles,
                attributes,
                membershipType: membership_type,
                status: state
            });

            return username;
        });

        commit("SET_USER_LIST", {queryString, usernames})
    },
    async enableUser({commit}, {username}) {
        await custosService.users.enableUser({username});
        commit("SET_USER_STATUS", {username, status: "ACTIVE"});
    },
    async disableUser({commit}, {username}) {
        await custosService.users.disableUser({username});
        commit("SET_USER_STATUS", {username, status: "CONFIRMED"});
    },
    async updateUser({commit}, {clientId, username, firstName, lastName, email, realmRoles, clientRoles, attributes}) {
        if (attributes && attributes.length > 0) {
            await custosService.users.addUserAttribute({clientId, attributes, usernames: [username]});
        }

        await custosService.users.addRolesToUser({
            clientId, roles: realmRoles, usernames: [username], clientLevel: false
        });
        await custosService.users.addRolesToUser({
            clientId, roles: clientRoles, usernames: [username], clientLevel: true
        });
        let updatedUser = await custosService.users.updateProfile({clientId, username, firstName, lastName, email});
        commit("SET_USER", {
            id: updatedUser.id,
            username: updatedUser.username,
            firstName: updatedUser.first_name,
            lastName: updatedUser.last_name,
            email: updatedUser.email,
            realmRoles: updatedUser.realm_roles,
            clientRoles: updatedUser.client_roles,
            attributes: updatedUser.attributes.map(({key, values}) => {
                return {key, values};
            }),
            membershipType: updatedUser.membership_type,
            status: updatedUser.state
        });
    }
}


const mutations = {
    SET_USER(state, {id, username, firstName, lastName, email, realmRoles, clientRoles, attributes, membershipType, status}) {
        state.userMap = {
            ...state.userMap,
            [username]: {
                id,
                username,
                firstName,
                lastName,
                email,
                realmRoles,
                clientRoles,
                attributes,
                membershipType,
                status
            }
        }
    },
    SET_USER_STATUS(state, {username, status}) {
        state.userMap = {
            ...state.userMap,
            [username]: {
                ...state.userMap[username],
                status: status
            }
        }
    },
    SET_USER_LIST(state, {queryString, usernames}) {
        state.userListMap = {
            ...state.userListMap,
            [queryString]: usernames
        }
    }
}

const getters = {
    getUser: (state) => ({username}) => {
        if (state.userMap[username]) {
            console.log("####### state.userMap[username] : ", state.userMap[username])
            return state.userMap[username];
        } else {
            return null;
        }
    },
    getUsers(state, getters) {
        return ({username = null, offset = 0, limit = 10, groupId = null, tenantId = null, clientId = null}) => {
            const params = {username, offset, limit, groupId, tenantId, clientId};
            const queryString = JSON.stringify(params);
            console.log("######## getUsers ", queryString)
            if (state.userListMap[queryString]) {
                const usernames = state.userListMap[queryString];
                return usernames.map(username => getters.getUser({username}));
            } else {
                return null;
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}