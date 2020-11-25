import {TYPES} from '../mutation-types'

export const layout = {
    namespaced: true,
    state: {
        isLeftCollapse: false,
        isRightCollapse: true,
        tableColumns: [],
    },
    mutations: {
        [TYPES.COLLAPSE_LEFT](state) {
            state.isLeftCollapse = !state.isLeftCollapse
        },
        setTableColumns(state, v) {
            state.tableColumns = v
        },
        [TYPES.COLLAPSE_RIGHT](state) {
            state.isRightCollapse = !state.isRightCollapse
        },
    },
    getters: {},
    actions: {},
}
export default {}
