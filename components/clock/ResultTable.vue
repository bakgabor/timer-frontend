<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="false"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="timerData"
    >
      <b-table-column field="taskName" label="Task Name" v-slot="props" sortable searchable>
        {{ props.row.taskName }}
      </b-table-column>
      <b-table-column field="userName" label="User Name" v-slot="props" sortable searchable>
        {{ props.row.userName }}
      </b-table-column>
      <b-table-column field="taskName" label="Start Time" v-slot="props">
        {{ props.row.startTime }}
      </b-table-column>
      <b-table-column field="endTime" label="End Time" v-slot="props">
        {{ props.row.endTime }}
      </b-table-column>
      <b-table-column field="runTime" label="Run Time" v-slot="props">
        {{ props.row.runTime }}
      </b-table-column>
      <b-table-column custom-key="actions" class="is-actions-cell"  v-slot="props">
        <div class="buttons is-right">
          <button @click="remove(props.row)" class="button is-small is-danger">
            <b-icon icon="delete" size="is-small" />
          </button>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    timerData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  name: "table",
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
  },
  methods: {
    remove(data) {
      this.$emit('remove', data)
    }
  }
}
</script>

<style scoped>

</style>
