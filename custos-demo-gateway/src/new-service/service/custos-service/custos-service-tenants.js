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

    createChildTenant({username, firstName, lastName, email, password, tenantName, redirectUris, scope, domain, clientUri, logoUri, comment, applicationType}) {

        return this.custosService.axiosInstanceWithClientAuthorization.post(
            `${CustosService.ENDPOINTS.TENANTS}/oauth2/tenant`,
            {
                "client_name": tenantName,
                "requester_email": email,
                "admin_username": username,
                "admin_first_name": firstName,
                "admin_last_name": lastName,
                "admin_email": email,
                "contacts": [email],
                "redirect_uris": redirectUris,
                "scope": scope.join(" ").trim(),
                "domain": domain,
                "admin_password": password,
                "client_uri": clientUri,
                "logo_uri": logoUri,
                "application_type": applicationType,
                "comment": comment
            }
        );

        // let body = {
        //     "client_name": client_name,
        //     "requester_email": requester_email,
        //     "admin_username": admin_username,
        //     "admin_first_name": admin_first_name,
        //     "admin_last_name": admin_last_name,
        //     "admin_email": admin_email,
        //     "contacts": contacts,
        //     "redirect_uris": redirect_uris,
        //     "scope": scopeString,
        //     "domain": domain,
        //     "admin_password": admin_password,
        //     "client_uri": client_uri,
        //     "logo_uri": logo_uri,
        //     "application_type": application_type,
        //     "comment": comment
        //   }

        // let authHeader = {'Authorization': 'Bearer ' + btoa(data.client_id + ':' + data.client_sec)}
        // let endpoint = tenantMgtEndpoint + "/oauth2/tenant"
        // return api().post(endpoint, {
        //     "client_name": clientName,
        //     "requester_email": requesterEmail,
        //     "admin_username": adminUsername,
        //     "admin_first_name": adminFirstName,
        //     "admin_last_name": adminLastName,
        //     "admin_email": adminEmail,
        //     "contacts": contacts,
        //     "redirect_uris": redirectUris,
        //     "scope": scope,
        //     "domain": domain,
        //     "admin_password": adminPassword,
        //     "client_uri": clientUri,
        //     "logo_uri": logoUri,
        //     "application_type": applicationType,
        //     "comment": comment
        // }, {headers: authHeader})
    }

}
