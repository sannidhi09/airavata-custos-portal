# Custos Portal

1. Install latest stable nodejs (v14.17) https://nodejs.org/en/download/
2. Change `.env` file with all new entries of following

```
VUE_APP_CLIENT_ID=""
VUE_APP_CLIENT_SEC=""

VUE_APP_REDIRECT_URI="http://localhost:8080/callback"

VUE_APP_CLIENT_ENTITY_TYPE_ID_APPOINTMENT="APPOINTMENT"
VUE_APP_CLIENT_ENTITY_TYPE_ID_PATIENT_HISTORY="PATIENT_HISTORY"
VUE_APP_CLIENT_ENTITY_TYPE_ID_PRESCRIPTION="PRESCRIPTION"

VUE_APP_CLIENT_ROLE_DOCTOR="doctor"
VUE_APP_CLIENT_ROLE_NURSE="nurse"
VUE_APP_CLIENT_ROLE_PATIENT="patient"

VUE_APP_CLIENT_GROUP_ID_DOCTOR=""
VUE_APP_CLIENT_GROUP_ID_NURSE=""

VUE_APP_CLIENT_PERMISSION_TYPE_VIEWER="VIEWER"
VUE_APP_CLIENT_PERMISSION_TYPE_EDITOR="EDITOR"
```

3. Create necessary entity types, permission types, roles, groups and update them on .env
4. `npm install`
5. `npm run serve`
6. http://localhost:8080

