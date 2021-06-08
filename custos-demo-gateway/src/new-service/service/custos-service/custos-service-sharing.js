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
}
