import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import user from "./modules/user.store";
import group from "./modules/group.store";
import tenant from "./modules/tenant.store";
import sharing from "./modules/sharing.store";
import auth from "./modules/auth.store";
import ciLogon from "./modules/ci-logon.store";

import {custosService} from "./util/custos.util";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const custosSessionPlugin = store => {
    store.dispatch('auth/init')
    custosService.identity.onChange(() => store.dispatch('auth/init'))
}

export default new Vuex.Store({
    modules: {
        auth,
        user,
        group,
        tenant,
        sharing,
        ciLogon
    },
    strict: debug,
    plugins: debug ? [createLogger(), custosSessionPlugin] : [custosSessionPlugin],
})
