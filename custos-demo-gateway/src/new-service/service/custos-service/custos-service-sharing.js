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

    createPermissionType({clientId, id, name, description = null}) {
        return this.custosService.axiosInstanceWithClientAuthorization().post(
            `${CustosService.ENDPOINTS.SHARING}/permission/type`,
            {
                "client_id": clientId,
                "permission_type": {id, name, description}
            }
        );
    }

    deletePermissionType({clientId, id, name, description = null}) {
        return this.custosService.axiosInstanceWithClientAuthorization.delete(
            `${CustosService.ENDPOINTS.SHARING}/permission/type`,
            {
                "client_id": clientId,
                "permission_type": {id, name, description}
            }
        );
    }

    getPermissionTypes({clientId}) {
        return this.custosService.axiosInstanceWithClientAuthorization.get(
            `${CustosService.ENDPOINTS.SHARING}/permission/types`,
            {
                "client_id": clientId
            }
        ).then(({data: {types}}) => types);
    }
}
