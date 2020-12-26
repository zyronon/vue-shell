import {TYPES} from '../mutation-types'
import request from '../../utils/http'
import File from '../../template/php/file'
import globalMethods from '../../utils/global-methods'
import CryptoJS from "crypto-js";
import CONST from "../../utils/const_var";


export const file = {
    namespaced: true,
    state: {
        currentDir: [],
        homePath: '',
        currentPath: '',
        currentParsePath: '',
        shell: {
            url: '',
            pwd: '',
            shellUrl: '',
        },
    },
    mutations: {
        [TYPES.SET_CURRENT_DIR](state, v) {
            state.currentDir = v
        },
        [TYPES.SET_HOME_PATH](state, v) {
            state.homePath = v
        },
        [TYPES.SET_CURRENT_PATH](state, v) {
            state.currentPath = v
        },
        [TYPES.SET_SHELL](state, v) {
            state.shell = v
        },
        [TYPES.SET_CURRENT_PARSE_PATH](state, v) {
            state.currentParsePath = v
        },

    },
    getters: {},
    actions: {
        async gotoPath({state, commit}, path) {
            let res
            if (state.shell.decodeType === CONST.DECODE_TYPE.BASE64.VALUE) {
                res = await globalMethods.$genRequest(state.shell, new File(
                    path + '/',
                    CONST.DECODE_TYPE.BASE64[state.shell.type]
                ).dir())
                res = CryptoJS.enc.Base64.parse(res).toString(CryptoJS.enc.Utf8)
            }
            let row = res.split('\n')
            let currentDir = []
            row.map(v => {
                if (v) {
                    let row = v.split('``')
                    currentDir.push({
                        name: row[0],
                        type: Number(row[1]),
                        change_date: row[2],
                        file_size: row[3],
                    })
                }
            })
            commit(TYPES.SET_CURRENT_DIR, currentDir)
            commit(TYPES.SET_CURRENT_PATH, path)
        }
    },
}
export default {}
