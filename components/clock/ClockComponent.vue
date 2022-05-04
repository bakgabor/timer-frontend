<template>
  <div class="mt-5">
    <div class="d-flex justify-content-center">
      <client-only>
        <clock :time="time"></clock>
        <div class="digital">
          {{ time }}
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClockComponent",
  // components: { Clock },
  props: {
    time: {
      type: String,
      default: "00:00:00"
    },
  },
  methods: {
    start() {
      this.startTime = Date.now()
    }
  }
}
</script>

<style scoped>
.digital {
  position: absolute;
  margin-top: 95px;
}
</style>
