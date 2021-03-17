import CustosService from "./index";

export default class CustosTenants {
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

    getTenants({limit, offset, status}) {
        return this.custosService.axiosInstanceWithTokenAuthorization.get(
            `${CustosService.ENDPOINTS.TENANTS}/tenants`,
            {
                params: {
                    limit: limit,
                    offset: offset,
                    status: status,
                    // requester_email: requesterEmail
                }
            }
        ).then(({data: {tenant}}) => tenant)
    }

    /**
     * Create tenant role
     * @param {string} name
     * @param {string} description
     * @param {boolean} composite
     * @return {Promise<AxiosResponse<any>>}
     */
    createTenantRole({name, description, composite = false}) {
        return this.custosService.axiosInstanceWithTokenAuthorization.post(
            `${CustosService.ENDPOINTS.TENANTS}/roles`,
            {group: {name, description, composite}}
        ).then(({data}) => data);
    }

    /**
     * Fetch tenant roles
     * @return {Promise<AxiosResponse<any>>}
     */
    fetchTenantRoles() {
        return this.custosService.axiosInstanceWithTokenAuthorization.get(
            `${CustosService.ENDPOINTS.TENANTS}/roles`
        );
    }


}
