<template>
  <div style="display: flex; flex-direction: row;">
    <div style="flex: 1;">
      <slot v-if="show" name="content-when-view"></slot>
      <slot v-else name="content-when-hide"></slot>
    </div>
    <b-button variant="outline-secondary" class="ml-2" size="sm" v-on:click="show = !show"
              style="font-size: 10px;padding: 4px 5px;">
      <b-icon icon="eye"/>&nbsp;
      <span v-if="show">hide</span>
      <span v-else>view</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "button-view",
  props: {
    value: {}
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

</style>