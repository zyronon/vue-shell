import {types} from '../mutation-types'
import request from "../../utils/http";

export const file = {
    namespaced: true,
    state: {
        currentDir: [],
        homePath: '',
        currentPath: '',
    },
    mutations: {
        [types.SET_CURRENT_DIR](state, v) {
            state.currentDir = v
        },
        [types.SET_HOME_PATH](state, v) {
            state.homePath = v
        },
        [types.SET_CURRENT_PATH](state, v) {
            state.currentPath = v
        },

    },
    getters: {},
    actions: {
        async gotoPath({commit}, value) {
            // console.log(value)
            let res = await request(value.url)
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
            commit(types.SET_CURRENT_DIR, currentDir)
            commit(types.SET_CURRENT_PATH, value.path)
        }
    },
}
export default {}
