import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import 'amfe-flexible'
import 'vant/lib/index.css'
import {
  Button,
  Form,
  Field,
  CellGroup,
  DatePicker,
  Popup,
  Picker,
  RadioGroup,
  Radio,
  Toast,
  NavBar
} from 'vant'

function start() {
  const app = createApp(App)
  app.use(Button)
  app.use(Form)
  app.use(Field)
  app.use(CellGroup)
  app.use(DatePicker)
  app.use(Popup)
  app.use(Picker)
  app.use(RadioGroup)
  app.use(Radio)
  app.use(Toast)
  app.use(NavBar)
  app.use(router)
  app.mount('#app')
}

start()
