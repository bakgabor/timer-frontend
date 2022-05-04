import DataApiRepository from '~/api/DataApiRepository'

export default (ctx, inject) => {
  const dataApiRepository = DataApiRepository(ctx.$axios)

  inject('dataApiRepository', dataApiRepository)
}
