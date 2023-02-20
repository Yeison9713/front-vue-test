import { createStore } from 'vuex'

import reqres from './modules/reqres'

export default createStore({
    modules: { reqres }
})