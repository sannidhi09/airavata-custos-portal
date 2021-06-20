<template>
  <TenantHome title="Entities" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <router-link :to="`/tenants/${clientId}/entities/new`" v-slot="{href, navigate}" tag="">
        <b-button variant="primary" @click="navigate">Make an Appointment</b-button>
      </router-link>
    </template>
    <table-overlay-info :rows="5" :columns="1" :data="appointments">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-th>Appointment</b-th>
            <b-th>History Check</b-th>
            <b-th>Prescriptions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(appointment, appointmentIndex) in appointments" :key="appointmentIndex">
            <!--          {{appointment}}-->
            <b-td>
              <div>
                <strong>Patient :</strong>
                {{ appointment.description.patient }}
              </div>
              <div>
                <strong>Date :</strong>
                {{ appointment.description.visitDate }}
              </div>
              <div>
                <strong>Reason :</strong>
                {{ appointment.description.reason }}
              </div>
              <div>
                <strong>Doctor :</strong>
                {{ appointment.description.doctorId }}
              </div>
              <div class="text-right">
                <small>
                  {{ appointment.createdAt }} by
                  <router-link :to="`/tenants/${clientId}/users/${appointment.ownerId}`" v-slot="{href, navigate}">
                    <b-link :href="href" v-on:click="navigate">{{ appointment.ownerId }}</b-link>
                  </router-link>
                </small>
              </div>
            </b-td>
            <b-td>
              <ul class="history-ul">
                <li v-for="(history, historyIndex) in appointment.description.histories" :key="historyIndex">
                  <div v-if="history.saved">
                    <div>
                      <strong>Symptoms :</strong>
                      {{ history.description.symptoms }}
                    </div>
                    <div>
                      <strong>Allergies :</strong>
                      {{ history.description.allergies }}
                    </div>
                    <div>
                      <strong>Blood Pressure :</strong>
                      {{ history.description.bloodPressure }}
                    </div>
                    <div>
                      <strong>Random Blood Sugar :</strong>
                      {{ history.description.randomBloodSugar }}
                    </div>
                    <div class="text-right">
                      <small>
                        {{ history.createdAt }} by
                        <router-link :to="`/tenants/${clientId}/users/${history.ownerId}`" v-slot="{href, navigate}">
                          <b-link :href="href" v-on:click="navigate">{{ history.ownerId }}</b-link>
                        </router-link>
                      </small>
                    </div>
                  </div>
                  <div v-else>
                    <div>
                      <label class="form-label">Symptoms</label>
                      <b-form-input size="sm" v-model="history.description.symptoms"/>
                    </div>
                    <div>
                      <label class="form-label">Allergies</label>
                      <b-form-input size="sm" v-model="history.description.allergies"/>
                    </div>
                    <div>
                      <label class="form-label">Blood Pressure</label>
                      <b-form-input size="sm" v-model="history.description.bloodPressure"/>
                    </div>
                    <div>
                      <label class="form-label">Random Blood Sugar</label>
                      <b-form-input size="sm" v-model="history.description.randomBloodSugar"/>
                    </div>
                    <div class="mt-3">
                      <b-button variant="primary" size="sm" v-on:click="saveEntity(history) && updateEntity(appointment)">
                        Save
                      </b-button>
                    </div>
                  </div>
                </li>
              </ul>
              <b-button variant="link" size="sm" v-on:click="addNewHealthCheck(appointment)">
                + Create new health check
              </b-button>
            </b-td>
            <b-td>
              <ul class="prescriptions-ul">
                <li v-for="(prescription, prescriptionIndex) in appointment.description.prescriptions"
                    :key="prescriptionIndex">
                  <div v-if="prescription.saved">
                    <div>
                      <strong>MEDICATIONS</strong>
                      <ul class="prescription-medications-ul">
                        <li v-for="(medication, medicationIndex) in prescription.description.medications"
                            :key="medicationIndex">
                          <strong>{{ medication.name }} :</strong>
                          {{ medication.dose }}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <strong>RECOMMENDATIONS</strong>
                      <ul class="prescription-recommendations-ul">
                        <li v-for="(recommendation, recommendationIndex) in prescription.description.recommendations"
                            :key="recommendationIndex">
                          {{ recommendation }}
                        </li>
                      </ul>
                    </div>

                    <div class="text-right">
                      <small>
                        {{ prescription.createdAt }} by
                        <router-link :to="`/tenants/${clientId}/users/${prescription.ownerId}`"
                                     v-slot="{href, navigate}">
                          <b-link :href="href" v-on:click="navigate">{{ prescription.ownerId }}</b-link>
                        </router-link>
                      </small>
                    </div>
                  </div>
                  <div v-else>
                    <div>
                      <label class="form-label">MEDICATIONS</label>
                      <b-button variant="link" size="sm"
                                v-on:click="prescription.description.medications.push({name: '', dose: ''})">
                        + Add
                      </b-button>
                      <div v-for="(medication, medicationIndex) in prescription.description.medications"
                           :key="medicationIndex">
                        <div style="display: flex; flex-direction: row;">
                          <b-form-select size="sm" :options="availableMedications" v-model="medication.name"/>
                          <b-form-input size="sm" v-model="medication.dose"/>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="form-label">RECOMMENDATIONS</label>
                      <b-button variant="link" size="sm"
                                v-on:click="prescription.description.recommendations.push('')">
                        + Add
                      </b-button>
                      <div v-for="(recommendation, recommendationIndex) in prescription.description.recommendations"
                           :key="recommendationIndex">
                        <b-form-input size="sm"
                                      v-model="prescription.description.recommendations[recommendationIndex]"/>
                      </div>
                    </div>
                    <div class="mt-3">
                      <b-button variant="primary" size="sm" v-on:click="saveEntity(prescription)">Save</b-button>
                    </div>
                  </div>
                </li>
              </ul>

              <b-button variant="link" size="sm" v-on:click="addNewPrescription(appointment)">
                + Add new prescription
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </table-overlay-info>
  </TenantHome>
</template>

<script>
import store from "../../new-service/store"
import TenantHome from "@/components/admin-portal/TenantHome";
import TableOverlayInfo from "@/components/table-overlay-info";
// import ModalShareEntity from "@/components/admin-portal/modals/modal-share-entity";
// import ButtonOverlay from "@/components/button-overlay";

export default {
  name: "TenantEntities",
  store: store,
  components: {TableOverlayInfo, TenantHome},
  data() {
    return {
      processingDelete: {},
      errors: [],

      availableMedications: [
        "Synthroid", "Crestor", "Ventolin HFA", "Nexium", "Advair Diskus", "Lantus Solostar", "Vyvanse", "Lyrica"
      ],

      entitiesMap: {},
      appointmentEntityIds: []
    }
  },
  computed: {
    clientId() {
      console.log("this.$route.params : ", this.$route.params);
      return this.$route.params.clientId;
    },
    appointments() {
      return this.appointmentEntityIds.map(entityId => this.getEntity({entityId}));
    },
    entities() {

      // const dumbEntities = [
      //   {
      //     entityId: "0",
      //     type: "APPOINTMENT",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //     description: `{
      //       "patient": "Isuru Ranawaka",
      //       "reason": "Abdominal Pain",
      //       "doctorId": "Aruna",
      //       "visitDate": "01/01/2021",
      //       "histories": [2],
      //       "prescriptions": [3]
      //     }`,
      //     ownerId: "Dinuka"
      //   },
      //   {
      //     entityId: "1",
      //     type: "APPOINTMENT",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //     description: `{
      //       "patient": "Suresh",
      //       "reason": "Chest Pain",
      //       "doctorId": "Saman",
      //       "visitDate": "01/01/2021",
      //       "histories": [2],
      //       "prescriptions": [3, 3]
      //     }`,
      //     ownerId: "Dinuka"
      //   },
      //   {
      //     entityId: "2",
      //     type: "HISTORY",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //     description: `{
      //       "symptoms": "Cold and Fever for few days",
      //       "allergies": "None",
      //       "bloodPressure": "120",
      //       "randomBloodSugar": "101"
      //     }`,
      //     ownerId: "Dinuka"
      //   },
      //   {
      //     entityId: "3",
      //     type: "PRESCRIPTION",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //     description: `{
      //       "medications": [
      //         {"name": "Panadol", "dose": 23},
      //         {"name": "Vitamin C", "dose": 40}
      //       ],
      //       "recommendations": [
      //         "Bed Rest", "Steam"
      //       ]
      //     }`,
      //     ownerId: "Dinuka"
      //   },
      //
      // ];
      //
      // return dumbEntities;


      // return this.dumbEntities.map(({entityId}) => {
      //   return this.getEntity({entityId});
      // });


      return this.$store.getters["entity/getEntities"]({clientId: this.clientId, ownerId: this.currentUsername})
    },
    breadcrumbLinks() {
      return [{to: `/tenants/${this.clientId}/entities`, name: "Entities"}];
    },
    currentUsername() {
      return this.$store.getters["auth/currentUsername"];
    }
  },
  methods: {
    addNewHealthCheck(appointment) {
      const newHealthCheckEntityId = `${appointment.entityId}_${window.performance.now()}`;
      this.entitiesMap = {
        ...this.entitiesMap,
        [newHealthCheckEntityId]: {
          entityId: newHealthCheckEntityId,
          type: "HISTORY",
          saved: false,
          description: {
            "symptoms": "",
            "allergies": "",
            "bloodPressure": "",
            "randomBloodSugar": ""
          }
        },
        [appointment.entityId]: {
          ...this.entitiesMap[appointment.entityId],
          description: {
            ...this.entitiesMap[appointment.entityId].description,
            histories: [
              ...this.entitiesMap[appointment.entityId].description.histories,
              newHealthCheckEntityId
            ]
          }
        }
      };
    },
    addNewPrescription(appointment) {
      const newPrescriptionEntityId = `${appointment.entityId}_${window.performance.now()}`;
      this.entitiesMap = {
        ...this.entitiesMap,
        [newPrescriptionEntityId]: {
          entityId: newPrescriptionEntityId,
          type: "PRESCRIPTION",
          saved: false,
          description: {
            "medications": [
              // {"name": "Panadol", "dose": 23},
              // {"name": "Vitamin C", "dose": 40}
            ],
            "recommendations": [
              // "Bed Rest", "Steam"
            ]
          }
        },
        [appointment.entityId]: {
          ...this.entitiesMap[appointment.entityId],
          description: {
            ...this.entitiesMap[appointment.entityId].description,
            prescriptions: [
              ...this.entitiesMap[appointment.entityId].description.prescriptions,
              newPrescriptionEntityId
            ]
          }
        }
      };
    },
    async updateEntity({entityId}) {

      try {
        const entity = this.entitiesMap[entityId];
        await this.$store.dispatch("entity/updateEntity", {
          entityId: entityId,
          clientId: this.clientId,
          name: `custos-health-history-${window.performance.now()}`,
          description: JSON.stringify(entity.description),
          type: entity.type,
          ownerId: this.$store.getters["auth/currentUsername"]
        });

        this.entitiesMap = {
          ...this.entitiesMap,
          [entityId]: {
            ...this.entitiesMap[entityId],
            saved: true
          }
        }
      } catch (error) {
        this.errors.push({
          title: "Unknown error when creating the entity.",
          source: error, variant: "danger"
        });
      }

    },
    async saveEntity({entityId}) {

      try {
        const entity = this.entitiesMap[entityId];
        await this.$store.dispatch("entity/createEntity", {
          entityId: entityId,
          clientId: this.clientId,
          name: `custos-health-history-${window.performance.now()}`,
          description: JSON.stringify(entity.description),
          type: entity.type,
          ownerId: this.$store.getters["auth/currentUsername"]
        });

        this.entitiesMap = {
          ...this.entitiesMap,
          [entityId]: {
            ...this.entitiesMap[entityId],
            saved: true
          }
        }
      } catch (error) {
        this.errors.push({
          title: "Unknown error when creating the entity.",
          source: error, variant: "danger"
        });
      }

    },
    getEntity({entityId}) {
      let entity = this.entitiesMap[entityId];
      if (!entity) {
        alert(entityId)
      }
      if (entity.type === "APPOINTMENT") {
        entity = {
          ...entity,
          description: {
            ...entity.description,
            histories: entity.description.histories.map(entityId => this.getEntity({entityId})),
            prescriptions: entity.description.prescriptions.map(entityId => this.getEntity({entityId}))
          }
        }
      } else {
        entity = {
          ...entity
        }
      }

      return entity;
    },
    refreshData() {
      this.$store.dispatch("entity/fetchEntities", {clientId: this.clientId, ownerId: this.currentUsername});
    },
    resetData() {
      this.entitiesMap = {};
      this.appointmentEntityIds = [];

      if (this.entities) {
        for (let i = 0; i < this.entities.length; i++) {
          const entity = {...this.entities[i]};
          entity.saved = true;

          try {
            entity.description = JSON.parse(entity.description);
          } catch (err) {
            entity.description = {};
          }

          this.entitiesMap[entity.entityId] = entity;

          if (entity.type === "APPOINTMENT") {
            this.appointmentEntityIds.push(entity.entityId);
          }
        }
      }
    },
    async onClickDelete({entityId, name, description, type, ownerId}) {
      this.processingDelete = {...this.processingDelete, [entityId]: true};

      try {
        await this.$store.dispatch("entity/deleteEntity", {
          clientId: this.clientId,
          entityId,
          name,
          description,
          type,
          ownerId
        });
        this.refreshData();
      } catch (error) {
        this.errors.push({
          title: `Unknown error when deleting the entity '${entityId}'.`,
          source: error, variant: "danger"
        });
      }

      this.processingDelete = {...this.processingDelete, [entityId]: false};
    }
  },
  watch: {
    entities() {
      this.resetData();
    }
  },
  mounted() {
    this.refreshData();
    this.resetData();
  }
}
</script>

<style scoped>
ul.history-ul {
  list-style: none;
  padding: 0px;
}

ul.history-ul > li {
  list-style: none;
  padding: 10px;
  background-color: #cdf0c2;
  border-radius: 5px;
  margin: 10px;
}

ul.prescriptions-ul {
  list-style: none;
  padding: 0px;
}

ul.prescriptions-ul > li {
  list-style: none;
  padding: 10px;
  background-color: #bee5eb;
  border-radius: 5px;
  margin: 10px;
}

ul.prescription-medications-ul {
  /*list-style: none;*/
  /*padding: 0px;*/
}

ul.prescription-recommendations-ul {
  /*padding: 0px;*/
}
</style>