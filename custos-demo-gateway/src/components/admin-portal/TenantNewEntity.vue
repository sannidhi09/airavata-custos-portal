<template>
  <TenantHome title="New Entity" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <b-button variant="primary" v-on:click="create">Create</b-button>
    </template>
    <b-overlay :show="processing">
      <div class="p-2 text-center">
        <div class="w-100 text-left" style="max-width: 600px;display: inline-block;">
          <!--          <div class="pt-3">-->
          <!--            <label class="form-label" for="name">Entity Name</label>-->
          <!--            <b-form-input-->
          <!--                v-model="name"-->
          <!--                :state="inputState.name"-->
          <!--                id="name"-->
          <!--                trim-->
          <!--                size="sm">-->
          <!--            </b-form-input>-->
          <!--            <b-form-invalid-feedback>-->
          <!--              Enter at least 2 letters-->
          <!--            </b-form-invalid-feedback>-->
          <!--          </div>-->
          <div class="pt-3">
            <label class="form-label" for="description.patient">Patient</label>
            <b-form-input
                v-model="description.patient"
                id="description.patient"
                trim
                size="sm">
            </b-form-input>
          </div>

          <div class="pt-3">
            <label class="form-label" for="description.doctorId">Doctor</label>
            <b-form-select
                v-model="description.doctorId"
                :options="availableDoctors"
                id="description.doctorId"
                trim
                size="sm">
            </b-form-select>
          </div>

          <div class="pt-3">
            <label class="form-label" for="description.reason">Reason</label>
            <b-form-input
                v-model="description.reason"
                id="description.reason"
                trim
                size="sm">
            </b-form-input>
          </div>

          <div class="pt-3">
            <label class="form-label" for="description.date">Date</label>
            <b-form-datepicker
                v-model="description.date"
                id="description.date"
                trim
                size="sm">
            </b-form-datepicker>
          </div>


        </div>
      </div>
    </b-overlay>
  </TenantHome>
</template>

<script>
import store from "../../new-service/store"
import TenantHome from "@/components/admin-portal/TenantHome";
// import ButtonOverlay from "@/components/button-overlay";

export default {
  name: "TenantEntities",
  store: store,
  components: {TenantHome},
  data() {
    return {
      processing: false,
      errors: [],

      availableDoctors: ["Dr. Aruna", "Dr. Ruwan", "Dr. Marlon"],

      // name: null,
      description: {
        "patient": "",
        "reason": "",
        "doctorId": "",
        "visitDate": "",
        "histories": [],
        "prescriptions": []
      },
      entityTypeId: "APPOINTMENT",
      secretType: "SSH",

      availableSecretTypes: ["SSH"],

      inputFieldsList: ["name", "entityTypeId"]
    };
  },
  computed: {
    name() {
      return `custos-health-appointment-${this.description.patient}-${this.description.visitDate}`;
    },
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    inputState() {
      return {
        name: this.name === null ? null : this.isValid.name,
        // description: this.description === null ? null : this.isValid.description,
        entityTypeId: this.entityTypeId === null ? null : this.isValid.entityTypeId,
      }
    },
    isValid() {
      return {
        name: !!this.name && this.name.length >= 2,
        // description: true,
        entityTypeId: !!this.entityTypeId
      }
    },
    isFormValid() {
      let _isFormValid = true;
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        _isFormValid = _isFormValid && this.isValid[this.inputFieldsList[i]];
      }

      return _isFormValid;
    },
    breadcrumbLinks() {
      return [
        {to: `/tenants/${this.clientId}/entities`, name: "Entities"},
        {to: `/tenants/${this.clientId}/entities/new`, name: "New"}
      ];
    },
    entityTypes() {
      return this.$store.getters["sharing/getEntityTypes"]({clientId: this.clientId});
    }
  },
  methods: {
    makeFormVisited() {
      for (let i = 0; i < this.inputFieldsList.length; i++) {
        if (this[this.inputFieldsList[i]] === null) this[this.inputFieldsList[i]] = "";
      }
    },
    async create() {
      this.makeFormVisited()

      if (this.isFormValid) {
        this.processing = true;

        try {
          await this.$store.dispatch("entity/createEntity", {
            entityId: `${this.clientId}_${window.performance.now()}`,
            clientId: this.clientId,
            name: this.name,
            description: JSON.stringify(this.description),
            type: this.entityTypeId,
            ownerId: this.$store.getters["auth/currentUsername"]
          });
          await this.$router.push(`/tenants/${this.clientId}/entities`);
        } catch (error) {
          this.errors.push({
            title: "Unknown error when creating the entity.",
            source: error, variant: "danger"
          });
        }

        this.processing = false;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("sharing/fetchEntityTypes", {clientId: this.clientId});
  }
}
</script>

<style scoped>

</style>