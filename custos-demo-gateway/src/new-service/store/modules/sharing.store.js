import {custosService} from "../util/custos.util";

const getDefaultState = () => {
    return {
        permissionTypesMap: {},
        permissionTypesListMap: {}
    }
};

const state = getDefaultState();

const actions = {
    async createPermissionType({commit}, {clientId, id, name, description = null}) {
        await custosService.sharing.createPermissionType({clientId, id, name, description});

        commit('SET_PERMISSION_TYPE', {clientId, id, name, description});
    },
    async deletePermissionType({commit}, {clientId, id, name, description = null}) {
        await custosService.sharing.deletePermissionType({clientId, id, name, description});

        commit('DELETE_PERMISSION_TYPE', {clientId, id, name, description});
    },
    async fetchPermissionTypes({commit}, {clientId}) {
        const permissionTypes = await custosService.sharing.getPermissionTypes({clientId});
        console.log("##### fetchPermissionTypes : ", permissionTypes);
        const permissionTypeIds = permissionTypes.map(({id, name, description}) => {
            commit('SET_PERMISSION_TYPE', {clientId, id, name, description});

            return {clientId, id};
        });

        commit('SET_PERMISSION_TYPES_LIST', {clientId, permissionTypeIds});
    }
}

const mutations = {
    SET_PERMISSION_TYPE(state, {clientId, id, name, description}) {
        state.permissionTypesMap = {
            ...state.permissionTypesMap,
            [clientId]: {
                ...state.permissionTypesMap[clientId],
                [id]: {clientId, id, name, description}
            }
        };
    },
    DELETE_PERMISSION_TYPE(state, {clientId, id}) {
        state.permissionTypesListMap = {
            ...state.permissionTypesListMap,
            [clientId]: state.permissionTypesListMap[clientId].filter(permissionType => {
                return permissionType.id !== id;
            })
        };
    },
    SET_PERMISSION_TYPES_LIST(state, {clientId, permissionTypeIds}) {
        state.permissionTypesListMap = {
            ...state.permissionTypesListMap,
            [clientId]: permissionTypeIds
        };
    }
}

const getters = {
    getPermissionTypes(state, getters) {
        return ({clientId}) => {
            if (state.permissionTypesListMap[clientId]) {
                return state.permissionTypesListMap[clientId].map(({id}) => {
                    return getters.getPermissionType({clientId, id});
                });
            } else {
                return null;
            }
        }
    },
    getPermissionType(state) {
        return ({clientId, id}) => {
            if (state.permissionTypesMap[clientId] && state.permissionTypesMap[clientId][id]) {
                return state.permissionTypesMap[clientId][id];
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
