import CustosService from "./index";

export default class CustosEntities {
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

    async createEntity({clientId, entityId, name, description, type, ownerId}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.post(
            `${CustosService.ENDPOINTS.SHARING}/entity`,
            {
                "client_id": clientId,
                "entity": {
                    "id": entityId,
                    "name": name,
                    "description": description,
                    "type": type,
                    "owner_id": ownerId
                }
            }
        ).then(({data: {types}}) => types);
    }

    async getEntities({clientId, ownerId}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.post(
            `${CustosService.ENDPOINTS.SHARING}/entities`,
            {
                "client_id": clientId,
                "owner_id": ownerId,
                "search_criteria": [{"search_field": "ENTITY_TYPE_ID", "value": "DOC", "condition": "EQUAL"}]
            }
        ).then(({data: {entity_array}}) => entity_array);
    }

    async getEntity({clientId, entityId}) {
        const axiosInstance = await this.custosService.getAxiosInstanceWithClientAuthorization({clientId});
        return axiosInstance.get(
            `${CustosService.ENDPOINTS.SHARING}/entity`,
            {
                params: {"entity.id": entityId}
            }
        ).then(({data}) => data);
    }


}
