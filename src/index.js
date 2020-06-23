import './scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/store/rootReducer'
import {storageHandler} from '@core/utils'
import {initialState} from '@/store/initialState'

const store = createStore(rootReducer, initialState)

store.subscribe(state => {
  console.log('App State: ', state)
  storageHandler('excel-column', state)
})

const excel = new Excel('#app', {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
  store,
})

excel.render()

