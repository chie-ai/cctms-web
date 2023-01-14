export default ({ $axios, $config }, inject)=>{
  const api = $axios.create({ headers: { common: { Accept: 'application/json' } } })

  api.setBaseURL($config.BASE_URL)
  inject('api', api)
}