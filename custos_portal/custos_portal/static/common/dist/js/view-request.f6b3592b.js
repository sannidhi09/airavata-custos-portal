(function(e){function t(t){for(var r,o,l=t[0],d=t[1],c=t[2],u=0,m=[];u<l.length;u++)o=l[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(r in d)Object.prototype.hasOwnProperty.call(d,r)&&(e[r]=d[r]);s&&s(t);while(m.length)m.shift()();return n.push.apply(n,c||[]),i()}function i(){for(var e,t=0;t<n.length;t++){for(var i=n[t],r=!0,l=1;l<i.length;l++){var d=i[l];0!==a[d]&&(r=!1)}r&&(n.splice(t--,1),e=o(o.s=i[0]))}return e}var r={},a={"view-request":0,"request-new-tenant":0},n=[];function o(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=r,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(i,r,function(t){return e[t]}.bind(null,r));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="http://localhost:9000/static/common/dist/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var s=d;n.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("7354")},"37fb":function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"main-content-wrapper"},[i("main",{staticClass:"main-content",class:{"main-content--with-sidebar":e.hasSidebar}},[i("div",{staticClass:"container-fluid"},[e._t("default")],2)]),e._t("sidebar")],2)},a=[],n={name:"main-layout",computed:{hasSidebar:function(){return this.$slots.sidebar}}},o=n,l=i("2877"),d=Object(l["a"])(o,r,a,!1,null,null,null);t["a"]=d.exports},7354:function(e,t,i){"use strict";i.r(t);var r=i("ee1c"),a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("b-form",{on:{submit:e.onSubmit}},[i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Client Name","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.client_name.$invalid,trim:""},model:{value:e.form.client_name,callback:function(t){e.$set(e.form,"client_name",t)},expression:"form.client_name"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Requester Email","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.requester_email.$invalid,trim:""},model:{value:e.form.requester_email,callback:function(t){e.$set(e.form,"requester_email",t)},expression:"form.requester_email"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Admin Username","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.admin_username.$invalid,trim:""},model:{value:e.form.admin_username,callback:function(t){e.$set(e.form,"admin_username",t)},expression:"form.admin_username"}})],1),i("b-form-row",[i("b-col",[i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Admin First Name","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.admin_first_name.$invalid,trim:""},model:{value:e.form.admin_first_name,callback:function(t){e.$set(e.form,"admin_first_name",t)},expression:"form.admin_first_name"}})],1)],1),i("b-col",[i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Admin Last Name","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.admin_last_name.$invalid,trim:""},model:{value:e.form.admin_last_name,callback:function(t){e.$set(e.form,"admin_last_name",t)},expression:"form.admin_last_name"}})],1)],1)],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Admin Email","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.admin_email.$invalid,trim:""},model:{value:e.form.admin_email,callback:function(t){e.$set(e.form,"admin_email",t)},expression:"form.admin_email"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Admin Password","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-input",{attrs:{type:"password",id:"text-password","aria-describedby":"password-help-block",state:!e.$v.form.admin_password.$invalid,trim:""},model:{value:e.form.admin_password,callback:function(t){e.$set(e.form,"admin_password",t)},expression:"form.admin_password"}}),i("b-form-text",{attrs:{id:"password-help-block"}},[e._v("\n                Your password must be 8-20 characters long, and must contain letters and numbers, and must\n                at least one special character.\n            ")])],1),i("b-form-row",[i("b-col",[i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Primary contact","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.primary_contact.$invalid,trim:""},model:{value:e.form.primary_contact,callback:function(t){e.$set(e.form,"primary_contact",t)},expression:"form.primary_contact"}})],1)],1),i("b-col",[i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Secondary Contact","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.secondary_contact.$invalid,trim:""},model:{value:e.form.secondary_contact,callback:function(t){e.$set(e.form,"secondary_contact",t)},expression:"form.secondary_contact"}})],1)],1)],1),e._l(e.form.redirect_uris,(function(t,r){return i("div",[i("b-form-row",{staticClass:"align-items-center"},[i("b-col",[i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Redirect URI","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-input-group",[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.redirect_uris.$each[r].$invalid,trim:""},model:{value:e.form.redirect_uris[r],callback:function(t){e.$set(e.form.redirect_uris,r,t)},expression:"form.redirect_uris[index]"}}),i("b-input-group-append",[i("b-button",{on:{click:function(t){return e.deleteRedirectUri(r)}}},[e._v("Delete URI")]),i("b-button",{on:{click:function(t){return e.addRedirectUri(r)}}},[e._v("Add another URI")])],1)],1)],1)],1)],1)],1)})),i("b-form-group",{attrs:{label:"Scope:"}},[i("b-form-checkbox-group",{attrs:{id:"checkbox-group-1",options:e.scopeOptions,name:"flavour-1"},model:{value:e.form.scope,callback:function(t){e.$set(e.form,"scope",t)},expression:"form.scope"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Domain","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.domain.$invalid,trim:""},model:{value:e.form.domain,callback:function(t){e.$set(e.form,"domain",t)},expression:"form.domain"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Client URI","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.client_uri.$invalid,trim:""},model:{value:e.form.client_uri,callback:function(t){e.$set(e.form,"client_uri",t)},expression:"form.client_uri"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"",label:"Logo URI","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-input",{attrs:{id:"input-1",state:!e.$v.form.logo_uri.$invalid,trim:""},model:{value:e.form.logo_uri,callback:function(t){e.$set(e.form,"logo_uri",t)},expression:"form.logo_uri"}})],1),i("b-form-group",{attrs:{id:"fieldset-1",description:"(At least 15 characters long) Provide description of the new tenant and any other comments here.",label:"Comment","label-for":"input-1","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback}},[i("b-form-textarea",{attrs:{rows:"3",textarea:"",id:"input-1",state:!e.$v.form.comment.$invalid,trim:""},model:{value:e.form.comment,callback:function(t){e.$set(e.form,"comment",t)},expression:"form.comment"}})],1),i("b-form-group",{attrs:{label:"Application Type"}},[i("b-form-radio-group",{attrs:{id:"radio-group-1",options:e.application_typeOptions,name:"radio-options"},model:{value:e.form.application_type,callback:function(t){e.$set(e.form,"application_type",t)},expression:"form.application_type"}})],1),i("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],2)],1)},n=[],o=i("08ba"),l={computed:{state:function(){return this.name.length>=4},invalidFeedback:function(){return""},validFeedback:function(){return""}},data:function(){return{form:{client_name:"",requester_email:"",admin_username:"",admin_first_name:"",admin_last_name:"",admin_email:"",admin_password:"",primary_contact:"",secondary_contact:"",redirect_uris:[""],scope:[],domain:"",client_uri:"",logo_uri:"",application_type:"web",comment:""},scopeOptions:[{text:"openId",value:"openid"},{text:"email",value:"email"},{text:"profile",value:"profile"},{text:"org.cilogon.userinfo",value:"org.cilogon.userinfo"}],application_typeOptions:[{text:"web",value:"web"}]}},validations:{form:{client_name:{required:o["required"]},requester_email:{required:o["required"],email:o["email"]},admin_username:{required:o["required"]},admin_first_name:{required:o["required"]},admin_last_name:{required:o["required"]},admin_email:{required:o["required"]},admin_password:{required:o["required"],strongPassword:function(e){return/[a-z]/.test(e)&&/[0-9]/.test(e)&&/\W|_/.test(e)&&e.length>=8}},primary_contact:{required:o["required"]},secondary_contact:{},scope:{required:o["required"]},domain:{url:o["url"]},client_uri:{required:o["required"]},logo_uri:{url:o["url"]},application_type:{required:o["required"]},redirect_uris:{$each:{required:o["required"],url:o["url"]}},comment:{required:o["required"],minLength:Object(o["minLength"])(15)}}},methods:{onSubmit:function(e){e.preventDefault(),console.log(this.$v.form.client_name)},addRedirectUri:function(){this.form.redirect_uris.push("")},deleteRedirectUri:function(e){console.log(e),this.form.redirect_uris.splice(e,1)}}},d=l,c=i("2877"),s=Object(c["a"])(d,a,n,!1,null,null,null),u=s.exports,m=i("37fb");Object(r["a"])((function(e){new e({render:function(e){return e(m["a"],[e(u)])},data:function(){return{experimentId:null}},beforeMount:function(){console.log("Entry is executed")}}).$mount("#request-new-tenant")}))},ee1c:function(e,t,i){"use strict";var r={};function a(e){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function n(e,t){return"string"===typeof t?e[t]:"object"===a(t)&&t instanceof Array?t.reduce((function(e,t){return e&&t in e?e[t]:void 0}),e):void 0}function o(e){return e.replace(/[^a-zA-Z0-9_-]/g,"_")}i.r(r),i.d(r,"getProperty",(function(){return n})),i.d(r,"sanitizeHTMLId",(function(){return o}));var l=i("2b0e"),d=i("5f5b"),c=(i("2dd8"),i("9271")),s=i.n(c);function u(e){l["default"].use(d["a"]),l["default"].use(s.a),e(l["default"])}i.d(t,"a",(function(){return u}))}});