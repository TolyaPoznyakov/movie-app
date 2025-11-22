import moment from 'moment'

export default defineNuxtPlugin( ()=> ({
  provide: {
    moment
  }
}))