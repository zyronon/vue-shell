import filters from './filters'
import globalMethods from './global-methods'
import Config from '../config'
import CONSTANT from './const_var'
import {TYPES} from '../store/mutation-types'
import myDialog from '../components/dialog'
import arrowIcon from '../components/arrowIcon';
import cMenu from '../components/menu'
import cItem from '../components/menu/item'
import cTable from '../components/table'
import cTableColumn from '../components/table/column'
import cTableTbody from '../components/table/tbody'

// 全局混入
export default {
    data() {
        return {
            viewWidth: 1000,
            viewHeight: 700,
            TYPES,
            CONFIG: Config,
            CONSTANT,
        }
    },
    methods: {
        // //将tools里面的方法挂载到vue上,以方便调用，直接this.$xxx方法名就可以了
        // Object.keys(globalMethods).forEach(key => {
        //     Vue.prototype[key] = tools[key]
        // })
        // 将globalMethods里面的方法用对象展开符混入到mixin上,以方便调用，直接this.$xxx方法名就可以了
        ...globalMethods,

    },
    filters: {
        // //将filter里面的方法添加了vue的筛选器上
        // Object.keys(filters).forEach(key => {
        //     Vue.filter(key, filters[key])
        // })
        ...filters,
    },
    components: {
        'folderIcon': {
            render() {
                return <svg
                    style={'margin-right:10px'}
                    t="1604848409953" class="icon" viewBox="0 0 1146 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4544" width="16" height="16">
                    <path
                        d="M1064.955986 327.662224H40.955986A40.970321 40.970321 0 0 0 0 368.61821v573.412477a82.155673 82.155673 0 0 0 81.911972 81.926307h983.044014a82.155673 82.155673 0 0 0 81.911972-81.926307v-532.413485a82.155673 82.155673 0 0 0-81.911972-81.954978zM40.998992 245.750252h527.62549a40.941651 40.941651 0 0 0 36.626722-59.262179l-70.587076-141.188487a81.897637 81.897637 0 0 0-73.267779-45.299586H81.911972A81.911972 81.911972 0 0 0 0 81.911972v122.882294a40.970321 40.970321 0 0 0 40.955986 40.955986z m0 0"
                        p-id="4545" fill="#87939A"></path>
                </svg>
            }
        },
        myDialog,
        arrowIcon,
        cMenu,
        cItem,
        cTable,
        cTableColumn,
        cTableTbody,

    }
}
