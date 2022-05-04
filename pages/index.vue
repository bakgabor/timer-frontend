<template>
  <div>
    <timmer :timerData="timerData" />
  </div>
</template>

<script>
import Timmer from '@/components/forms/Timmer'
export default {
  name: 'IndexPage',
  components: { Timmer },
  data() {
    return {
      timerData: []
    }
  },
  mounted() {
    this.loadData()
  },
  watch: {
    timerData: {
      handler(newValue, oldValue) {
        if (oldValue) {
          this.saveData()
        }
      },
      deep: true,
    },
  },
  methods: {
    saveData() {
      this.$dataApiRepository
        .saveData(this.timerData)
        .then((response) => {
        })
    },

    loadData() {
      this.$dataApiRepository
        .loadData(this.timerData)
        .then((response) => {
          this.timerData = response
        })
    }
  }
}
</script>
