import axios from "axios";
import http from "http";
import https from "https";
import CustosGroups from "./custos-service-groups";
import CustosUsers from "./custos-service-users";
import CustosIdentity from "./custos-service-identity";
import CustosTenants from "./custos-service-tenants";
import CustosSharing from "./custos-service-sharing";

const httpAgent = new http.Agent({keepAlive: true});
const httpsAgent = new https.Agent({keepAlive: true});

export default class CustosService {
    static ENDPOINTS = {
        IDENTITY: "/identity-management/v1.0.0",
        USERS: "user-management/v1.0.0",
        GROUPS: "group-management/v1.0.0",
        TENANTS: "tenant-management/v1.0.0",
        SHARING: "sharing-management/v1.0.0"
    };

    /**
     * Api Client ID
     * @type {strong}
     * @private
     */
    _clientId = null;

    /**
     * Api Client Secret
     * @type {strong}
     * @private
     */
    _clientSecret = null;

    /**
     * Api Redirect URI
     * @type {strong}
     * @private
     */
    _redirectURI = null;

    /**
     * Api Base URL
     * @type {strong}
     * @private
     */
    _baseURL = null;


    /**
     * @type {CustosGroups}
     */
    _groups = null;


    /**
     * @type {CustosTenants}
     */
    _tenants = null;


    /**
     * @type {CustosUsers}
     */
    _users = null;

    /**
     * @type {CustosIdentity}
     */
    _identity = null;

    /**
     * @type {CustosSharing}
     */
    _sharing = null;

    constructor({clientId, clientSecret, redirectURI, baseURL}) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._redirectURI = redirectURI;
        this._baseURL = baseURL;
        this._tenants = new CustosTenants(this);
        this._groups = new CustosGroups(this);
        this._users = new CustosUsers(this);
        this._identity = new CustosIdentity(this);
        this._sharing = new CustosSharing(this);
    }

    get clientId() {
        return this._clientId;
    }

    get clientSecret() {
        return this._clientSecret;
    }

    get redirectURI() {
        return this._redirectURI;
    }

    get baseURL() {
        return this._baseURL;
    }

    get tenants() {
        return this._tenants;
    }

    get groups() {
        return this._groups;
    }

    get users() {
        return this._users;
    }

    get identity() {
        return this._identity;
    }

    get sharing() {
        return this._sharing;
    }

    get axiosInstance() {
        return axios.create({
            httpAgent,
            httpsAgent,
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
    }

    async getAxiosInstanceWithClientAuthorization({clientId = null, clientSecret = null} = {}) {
        if (!clientId) {
            clientId = this.clientId
        }

        if (!clientSecret) {
            clientSecret = await this.identity.getClientSecret({clientId});
        }

        return axios.create({
            httpAgent,
            httpsAgent,
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${btoa(`${clientId}:${clientSecret}`)}`
            }
        });
    }

    get axiosInstanceWithClientAuthorization() {
        return this.getAxiosInstanceWithClientAuthorization({clientId: this.clientId, clientSecret: this.clientSecret});
        // return axios.create({
        //     httpAgent,
        //     httpsAgent,
        //     baseURL: this.baseURL,
        //     withCredentials: false,
        //     headers: {
        //         'Accept': '*/*',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        //     }
        // });
    }

    get axiosInstanceWithTokenAuthorization() {
        return axios.create({
            httpAgent,
            httpsAgent,
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.identity.accessToken}`
            }
        });
    }
}