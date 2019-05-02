import BeerModal from './components/BeerModal.vue'

const Modal = {

  install(Vue, options) {

    this.EventBus = new Vue()

    Vue.component('app-modal', BeerModal)


    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit('show', params)
      }
    }
  }
}

export default Modal