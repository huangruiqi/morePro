<template>
  <span :style="'font-size:'+size+'px'">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#'+type"></use>
      </svg>
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ZIcon',
  props: {
    type: {
      type: String
    },
    size: {
      type: Number
    }
  }
}
</script>

<style lang="less" scoped>
</style>
