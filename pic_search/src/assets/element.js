import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
    Button,
    Icon,
    Input,
    Upload,
    Tabs,
    TabPane,
    Pagination,
    Table,
    TableColumn,
    Row,
    Col,
    Menu,
    MenuItem,
    MenuItemGroup,
    Container,
    Header,
    Main,
    Aside,
    Rate,
    Progress,
    DatePicker,
    Message,
    MessageBox,
    Tooltip,
    Checkbox,
} from 'element-ui'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Rate)
Vue.use(Progress)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Checkbox)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert