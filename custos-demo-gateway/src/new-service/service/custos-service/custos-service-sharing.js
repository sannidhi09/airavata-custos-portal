import CustosService from "./index";

export default class CustosSharing {
    /**
     * @type {CustosService}
     */
    _custosService = null;

    constructor(custosService) {
        this._custosService = custosService;
    }

    get custosService() {
        return this._custosService;
    }

    async createPermissionType({clientId, id, name, description = null}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.post(
            `${CustosService.ENDPOINTS.SHARING}/permission/type`,
            {
                "client_id": clientId,
                "permission_type": {id, name, description}
            }
        );
    }

    async deletePermissionType({clientId, id, name, description = null}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.delete(
            `${CustosService.ENDPOINTS.SHARING}/permission/type`,
            {
                "client_id": clientId,
                "permission_type": {id, name, description}
            }
        );
    }

    async getPermissionTypes({clientId}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.get(
            `${CustosService.ENDPOINTS.SHARING}/permission/types`,
            {
                params: {"client_id": clientId}
            }
        ).then(({data: {types}}) => types);
    }

    async getEntityTypes({clientId}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.get(
            `${CustosService.ENDPOINTS.SHARING}/entity/types`,
            {
                params: {"client_id": clientId}
            }
        ).then(({data: {types}}) => types);
    }

    async getSharedOwners({clientId, entityId}) {

        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});

        const res = await axiosInstance.get(
            `${CustosService.ENDPOINTS.SHARING}/share`,
            {
                params: {
                    "entity.id": entityId
                }
            }
        ).then(({data: {shared_data}}) => shared_data);

        console.log(" res : ", res);

        return res;
    }

    async shareEntity({clientId, entityId, permissionTypeId, groupIds = [], usernames = []}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});

        let promises = [];

        promises.concat(groupIds.map(groupId => {
            return axiosInstance.post(
                `${CustosService.ENDPOINTS.SHARING}/groups/share`,
                {
                    "client_id": clientId,
                    "entity": {"id": entityId},
                    "permission_type": {"id": permissionTypeId},
                    "owner_id": [groupId],
                    "cascade": true
                }
            );
        }));

        promises.concat(usernames.map(username => {
            return axiosInstance.post(
                `${CustosService.ENDPOINTS.SHARING}/users/share`,
                {
                    "client_id": clientId,
                    "entity": {"id": entityId},
                    "permission_type": {"id": permissionTypeId},
                    "owner_id": [username],
                    "cascade": true
                }
            );
        }));

        await Promise.all(promises);
    }

    async dropEntitySharedOwner({clientId, entityId, permissionTypeId, groupIds = [], usernames = []}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});

        let promises = [];

        promises.concat(groupIds.map(groupId => {
            return axiosInstance.delete(
                `${CustosService.ENDPOINTS.SHARING}/groups/share`,
                {
                    data: {
                        "client_id": clientId,
                        "entity": {"id": entityId},
                        "permission_type": {"id": permissionTypeId},
                        "owner_id": [groupId],
                        "cascade": true
                    }
                }
            );
        }));

        promises.concat(usernames.map(username => {
            return axiosInstance.delete(
                `${CustosService.ENDPOINTS.SHARING}/users/share`,
                {
                    data: {
                        "client_id": clientId,
                        "entity": {"id": entityId},
                        "permission_type": {"id": permissionTypeId},
                        "owner_id": [username],
                        "cascade": true
                    }
                }
            );
        }));

        await Promise.all(promises);
    }
}
