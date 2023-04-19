import Axios from 'axios'
const RESOURCE_NAME = '/api/'

export default {
  getAll () {
    return Axios.post(RESOURCE_NAME, {first_name: 'Sergey', last_name: 'Zhuravlev', territorial_bank: "UZB", personnel_number: '11111111'})
  }
}
