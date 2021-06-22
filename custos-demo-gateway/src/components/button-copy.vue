<template>
  <b-button variant="outline-secondary" class="ml-2" size="sm" v-on:click="copy"
            style="font-size: 10px;padding: 4px 5px;">
    <b-icon icon="clipboard"/>&nbsp;copy
    <input style="position: fixed; top: -1000px;" type="text" :value="value" ref="copyValueRef">
  </b-button>
</template>

<script>
export default {
  name: "button-copy",
  props: {
    value: {}
  },
  methods: {
    copy() {
      this.$refs.copyValueRef.select();
      document.execCommand("copy");
    }
  }
}
</script>

<style scoped>

</style>