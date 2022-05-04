<template>
  <div>
    <div class="ml-2">
      <clock-component :time="time" />
    </div>
    <div class="d-flex justify-content-center mt-2">
      <button
        v-if="getVisibleButtons('play')"
        @click="startTimer"
        class="button is-small is-success ml-2"
      >
        <b-icon icon="play" size="is-small" />
      </button>
      <button
        v-if="getVisibleButtons('pause')"
        @click="pauseTimer"
        class="button is-small is-info ml-2"
      >
        <b-icon icon="pause" size="is-small" />
      </button>
      <button
        v-if="getVisibleButtons('stop')"
        @click="stopTimer"
        class="button is-small is-warning ml-2"
      >
        <b-icon icon="stop" size="is-small" />
      </button>
      <button
        v-if="getVisibleButtons('save')"
        @click="saveTime"
        class="button is-small is-success ml-2"
      >
        <b-icon icon="timer" size="is-small" />
      </button>
    </div>
    <div class="mt-3 d-flex justify-content-center">
      <div class="result-table">
        <result-table @remove="remove" :timerData="timerData" />
      </div>
    </div>
  </div>
</template>

<script>
import ClockComponent from '@/components/clock/ClockComponent'
import ResultTable from '@/components/clock/ResultTable'
import DualStringModal from "@/components/modals/DualStringModal";

export default {
  name: "stopwatch",
  components: { ClockComponent, ResultTable },
  props: {
    timerData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      time: '00:00:00',
      selfTime: 0,
      startTime: 0,
      timerStartTime: 0,
      interval: null,
      state: 'stop',
      taskName: null,
      userName: null,
      visibleButtons: {
        stop: {
          play: true,
          pause: false,
          stop: false,
          save: false,
        },
        play: {
          play: false,
          pause: true,
          stop: true,
          save: true,
        },
        pause: {
          play: true,
          pause: false,
          stop: true,
          save: true,
        },
      }
    }
  },
  mounted() {
    this.reset()
  },
  methods: {

    saveTime() {
      this.timerData.push({
        id: Date.now(),
        taskName: this.taskName,
        userName: this.userName,
        startTime: this.startTime,
        endTime: new Date().toISOString().slice(11, 19),
        runTime: this.time
      })
    },

    remove(data) {
      const removeIndex = this.timerData.map(function(item) { return item.id; }).indexOf(data.id);
      this.timerData.splice(removeIndex, 1);
    },

    stopTimer() {
      this.pauseTimer()
      this.state = 'stop'
      this.reset()
    },

    showAskModal() {
      const self = this
      this.$buefy.modal.open({
        parent: this,
        component: DualStringModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalTitle: 'Data',
          firstTitle: 'Task name',
          secondTitle: 'User name',
          checkFirstData: true,
          checkSecondData: true,
        },
        events: {
          submit(data) {
            self.taskName = data.firstData
            self.userName = data.secondData
            self.start()
          },
        },
      })
    },

    startTimer() {
      if (this.state === 'stop') {
        this.startTime = new Date().toISOString().slice(11, 19)
        this.showAskModal()
        return
      }
      this.start()
    },

    start() {
      this.state = 'play'
      this.timerStartTime = Date.now() - (this.selfTime * 1000)
      this.interval = setInterval(() => {
        this.selfTime = parseInt((Date.now() - this.timerStartTime) / 1000)
        this.time = new Date(this.selfTime * 1000).toISOString().slice(11, 19);
      }, 1000);
    },

    pauseTimer() {
      this.state = 'pause'
      clearInterval(this.interval);
    },

    reset() {
      this.time = '00:00:00'
      this.selfTime = 0
      this.timerStartTime = Date.now()
    },

    getVisibleButtons(button) {
      return this.visibleButtons[this.state][button]
    }
  }
}
</script>

<style scoped>

</style>
