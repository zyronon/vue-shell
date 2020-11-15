<template>
    <div class="home" ref="content">
        <div class="toolbar">
            <div class="left">
                <img src="@/assets/images/close.png" alt="">
                <span>Shell管理器</span>
            </div>
            <div class="right">
                <div class="search">
                    <svg t="1603954159566" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="22428" width="32" height="32">
                        <path d="M920.576 545.28h-820.736c-19.968 0-35.84-15.872-35.84-35.84s15.872-35.84 35.84-35.84h820.736c19.968 0 35.84 15.872 35.84 35.84s-15.872 35.84-35.84 35.84zM920.576 225.792h-820.736c-19.968 0-35.84-15.872-35.84-35.84s15.872-35.84 35.84-35.84h820.736c19.968 0 35.84 15.872 35.84 35.84s-15.872 35.84-35.84 35.84zM100.352 797.184h817.664c19.968 0 35.84 15.872 35.84 35.84s-15.872 35.84-35.84 35.84h-817.664c-19.968 0-35.84-15.872-35.84-35.84s15.872-35.84 35.84-35.84z"
                              p-id="22429" fill="#8a8a8a"></path>
                    </svg>
                    <div class="input-container">
                        <svg t="1603954192648" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="23562" width="200" height="200">
                            <path d="M924.31327975 877.71348306l-177.24797232-177.57248318a371.11091474 371.11091474 0 0 0 85.70338633-237.89910114C832.76869376 256.69655698 666.61900107 90.125 461.52797418 90.125 256.37204611 90.125 90.125 256.69655698 90.125 462.24189875c0 205.51289118 166.24704611 372.21425217 371.30562158 372.21425299 91.25252655 0 174.78168777-33.0027811 239.42430285-87.74780658l177.0857169 177.50758117a32.58091598 32.58091598 0 0 0 46.30773641 0 32.87297625 32.87297625 0 0 0 0-46.46999186h0.06490201z m-462.85020758-108.93838183a304.84574451 304.84574451 0 0 1-216.22175794-89.75977542 305.55966907 305.55966907 0 0 1-89.53261715-216.77342707 305.13780396 305.13780396 0 0 1 89.56506858-216.74097564 304.84574451 304.84574451 0 0 1 432.50841787 0 305.59211965 305.59211965 0 0 1 89.50016657 216.74097564 305.13780396 305.13780396 0 0 1-89.56506859 216.77342707 304.84574451 304.84574451 0 0 1-216.25420934 89.75977542z"
                                  fill="#8a8a8a" p-id="23563"></path>
                        </svg>
                        <input type="text">
                    </div>
                </div>
                <div class="options">
                    <svg t="1603954052053" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="20091" width="32" height="32">
                        <path d="M342.7 516.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 191.8c6.2 6.2 14.4 9.4 22.6 9.4 8.2 0 16.4-3.1 22.6-9.4l192-191.8c12.5-12.5 12.5-32.7 0-45.3-12.5-12.5-32.8-12.5-45.3 0L544.1 653.8V98.2c0-17.7-14.3-32-32-32s-32 14.3-32 32v555.6L342.7 516.6z"
                              p-id="20092" fill="#8a8a8a"></path>
                        <path d="M804 191.8H672c-17.7 0-32 14.3-32 32s14.3 32 32 32h132c33.1 0 60 26.9 60 60v519.8c0 33.1-26.9 60-60 60H222c-33.1 0-60-26.9-60-60V315.8c0-33.1 26.9-60 60-60h129.8c17.7 0 32-14.3 32-32s-14.3-32-32-32H222c-68.5 0-124 55.5-124 124v519.8c0 68.5 55.5 124 124 124h582c68.5 0 124-55.5 124-124V315.8c0-68.5-55.5-124-124-124z"
                              p-id="20093" fill="#8a8a8a"></path>
                    </svg>
                    <svg @click="isShowDialog = true" t="1603954019387" class="icon" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19292" width="200" height="200">
                        <path d="M480 480V216c0-17.673 14.327-32 32-32 17.673 0 32 14.327 32 32v264h264c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H544v264c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V544H216c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h264z"
                              fill="#8a8a8a" p-id="19293"></path>
                    </svg>
                    <svg t="1603954121990" class="icon" viewBox="0 0 1129 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="21473" width="200" height="200">
                        <path d="M492.57931 877.462069a19.244138 19.244138 0 0 1-6.885517-1.412414 17.655172 17.655172 0 0 1-10.593103-18.714483L512 590.035862h-172.667586A17.655172 17.655172 0 0 1 323.089655 564.965517L476.689655 209.037241a17.655172 17.655172 0 0 1 16.242759-10.593103h252.645517a17.655172 17.655172 0 0 1 15.183448 8.474483 17.655172 17.655172 0 0 1 0 17.655172l-105.931034 205.506207h146.184827a17.655172 17.655172 0 0 1 15.713104 9.886897 17.655172 17.655172 0 0 1-1.588966 17.655172L506.703448 870.4a17.655172 17.655172 0 0 1-14.124138 7.062069z m-126.411034-322.736552h167.017931a17.655172 17.655172 0 0 1 13.241379 6.002759 17.655172 17.655172 0 0 1 4.237242 13.947586L519.591724 794.482759l247.172414-329.445518h-139.828966a17.655172 17.655172 0 0 1-15.713103-25.6l105.931034-205.506207h-211.862069z"
                              fill="#8a8a8a" p-id="21474"></path>
                    </svg>
                    <svg t="1603953905633" class="icon" viewBox="0 0 1105 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="13267" width="200" height="200">
                        <path d="M358.970906 945.384648c-2.080729 0-4.251924-0.271399-6.332652-0.904665-62.33139-17.279094-119.868057-50.389817-166.458283-95.894446-4.885189-4.794722-7.41825-11.48924-7.056384-18.274225 0.361866-6.784984 3.709125-13.208103 9.137112-17.36956 29.763465-23.159413 37.995912-65.045383 19.178889-97.522842-18.90749-32.567925-59.25553-46.318827-94.085117-32.386992-6.332652 2.623527-13.569969 2.352128-19.631221-0.814198-6.061253-3.07586-10.584576-8.68478-12.212972-15.288831-7.961048-31.391861-11.941572-63.59792-11.941572-95.803979 0-32.115593 3.980524-64.321652 11.941572-95.803979 1.718863-6.604051 6.151719-12.212972 12.212972-15.379298 6.061253-3.166326 13.208103-3.437725 19.631221-0.814198 34.73912 14.112767 75.08716 0.271399 93.99465-32.296526 18.817023-32.386992 10.584576-74.363429-19.178889-97.522842-5.427987-4.251924-8.68478-10.584576-9.137112-17.36956-0.361866-6.784984 2.171195-13.479502 7.056384-18.274225 46.590226-45.504628 104.21736-78.705819 166.458283-95.894446 6.694518-1.718863 13.660435-0.633265 19.359822 3.07586 5.699387 3.799591 9.498978 9.770377 10.403643 16.555362 5.066122 37.181714 37.272181 65.226316 74.815761 65.226316 26.868538 0 65.13585-39.986175 75.08716-57.536667-0.723732-3.618658-0.542799-7.508716 0.542799-11.308307 3.799591-12.484371 17.007694-19.450289 29.401599-15.922097 0 0 0 0 0.090466 0l0 0 0 0c64.954917 19.359822 120.772722 51.656348 165.915484 95.713513 4.885189 4.794722 7.508716 11.48924 7.14685 18.274225-0.361866 6.784984-3.709125 13.117636-9.137112 17.36956-29.672998 23.159413-37.995912 65.045383-19.178889 97.522842 18.90749 32.567925 59.345997 46.49976 94.085117 32.296526 6.332652-2.623527 13.479502-2.352128 19.631221 0.814198 6.151719 3.07586 10.584576 8.68478 12.212972 15.379298 7.961048 31.482327 11.941572 63.688387 11.941572 95.713513s-4.070991 64.231185-11.941572 95.803979c-1.718863 6.604051-6.151719 12.212972-12.212972 15.288831-6.151719 3.166326-13.208103 3.437725-19.631221 0.814198-34.73912-14.022301-75.177627-0.180933-94.085117 32.386992-18.817023 32.386992-10.584576 74.363429 19.178889 97.522842 5.427987 4.161457 8.68478 10.494109 9.137112 17.36956s-2.171195 13.479502-7.14685 18.274225c-46.49976 45.414162-104.036427 78.615352-166.458283 95.894446-6.604051 1.809329-13.660435 0.723732-19.269356-3.07586-5.699387-3.799591-9.498978-9.860844-10.494109-16.555362-5.066122-37.181714-37.181714-65.226316-74.815761-65.226316-37.54358 0-69.749639 28.044602-74.815761 65.226316-0.904665 6.784984-4.704256 12.755771-10.403643 16.555362C368.108019 944.118117 363.584696 945.384648 358.970906 945.384648zM237.203053 831.035045c31.210928 26.325739 66.945179 46.952092 105.212491 60.612527 17.731426-46.680692 63.145588-79.339084 114.892402-79.339084 51.746814 0 97.160976 32.658391 114.892402 79.339084 38.357778-13.660435 74.001563-34.286788 105.212491-60.612527-31.572794-38.900577-37.181714-94.537449-11.217841-139.318346 25.873407-44.69043 76.896489-67.397511 126.110243-59.888795 3.618658-20.083554 5.337521-40.438507 5.337521-60.612527 0-20.17402-1.809329-40.438507-5.337521-60.612527-49.03282 7.961048-100.146369-15.198365-126.110243-59.888795-25.963874-44.69043-20.354953-100.327302 11.217841-139.227879-30.487196-25.692474-65.950048-45.956961-105.75529-60.522061-20.17402 33.110724-68.935441 79.158151-114.349603 79.158151-51.656348 0-97.07051-32.658391-114.892402-79.339084-38.267312 13.569969-74.001563 34.196321-105.212491 60.702993 31.572794 38.900577 37.181714 94.537449 11.217841 139.227879-25.963874 44.69043-76.62509 67.668911-126.019776 59.888795-3.618658 20.083554-5.427987 40.34804-5.427987 60.612527 0 20.264487 1.809329 40.528973 5.427987 60.612527 49.123287-7.780115 100.146369 15.198365 126.110243 59.979262C274.294301 736.407129 268.775847 792.134468 237.203053 831.035045z"
                              p-id="13268" fill="#8a8a8a"></path>
                        <path d="M457.21748 694.24976c-67.759377 0-122.943917-55.18454-122.943917-123.034383s55.18454-122.943917 122.943917-122.943917c67.759377 0 122.943917 55.18454 122.943917 122.943917S524.976857 694.24976 457.21748 694.24976zM457.21748 495.675884c-41.705037 0-75.629959 33.924922-75.629959 75.629959s33.924922 75.629959 75.629959 75.629959c41.705037 0 75.539493-33.924922 75.539493-75.629959S498.922517 495.675884 457.21748 495.675884z"
                              p-id="13269" fill="#8a8a8a"></path>
                    </svg>
                    <span>|</span>
                    <svg t="1603953884525" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="12449" width="200" height="200">
                        <path d="M865.572571 548.352h-658.285714a36.571429 36.571429 0 1 1 0-73.142857h658.285714a36.571429 36.571429 0 1 1 0 73.142857z"
                              p-id="12450" fill="#8a8a8a"></path>
                    </svg>
                    <svg t="1603953812818" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="10399" width="200" height="200">
                        <path d="M256 192h512a64 64 0 0 1 64 64v512a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V256a64 64 0 0 1 64-64z m0 64v512h512V256H256z"
                              fill="#8a8a8a" p-id="10400"></path>
                    </svg>
                    <svg t="1603953684261" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="3038" width="32" height="32">
                        <path d="M519.02036023 459.47959989L221.8941505 162.35411435a37.07885742 37.07885742 0 1 0-52.45354772 52.40502656l297.12476134 297.15010821L169.44060278 809.05863314a37.07885742 37.07885742 0 1 0 52.42964924 52.42892505l297.15010821-297.12476136 297.15010822 297.12476136a37.07885742 37.07885742 0 1 0 52.42892504-52.40430237l-297.12476135-297.1740067 297.12476135-297.12548553a37.07885742 37.07885742 0 1 0-52.42892504-52.42964924L519.04498291 459.47959989z"
                              p-id="3039" fill="#8a8a8a"></path>
                    </svg>
                </div>
            </div>

        </div>
        <div class="content-container">
            <div class="category">
                <div class="row">
                    <svg t="1603956289510" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="24487" width="32" height="32">
                        <path d="M128 224v576a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32v-448a32 32 0 0 0-32-32H467.776a96 96 0 0 1-85.888-53.12l-28.608-57.216A32 32 0 0 0 324.672 192H160a32 32 0 0 0-32 32z m-64 0A96 96 0 0 1 160 128h164.672a96 96 0 0 1 85.888 53.12l28.608 57.216A32 32 0 0 0 467.776 256H864A96 96 0 0 1 960 352v448a96 96 0 0 1-96 96h-704A96 96 0 0 1 64 800v-576z"
                              p-id="24488" fill="#8a8a8a"></path>
                    </svg>
                    <div class="name">所有</div>
                </div>
                <div class="row">
                    <svg t="1603956289510" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="24487" width="32" height="32">
                        <path d="M128 224v576a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32v-448a32 32 0 0 0-32-32H467.776a96 96 0 0 1-85.888-53.12l-28.608-57.216A32 32 0 0 0 324.672 192H160a32 32 0 0 0-32 32z m-64 0A96 96 0 0 1 160 128h164.672a96 96 0 0 1 85.888 53.12l28.608 57.216A32 32 0 0 0 467.776 256H864A96 96 0 0 1 960 352v448a96 96 0 0 1-96 96h-704A96 96 0 0 1 64 800v-576z"
                              p-id="24488" fill="#8a8a8a"></path>
                    </svg>
                    <div class="name">所有</div>
                </div>
            </div>
            <div class="content">
                <table cellspacing="0">
                    <thead>
                    <tr>
                        <th></th>
                        <th width="40%">路径</th>
                        <th>密码</th>
                        <th>IP</th>
                        <th>备注</th>
                        <!--                        <th>创建时间</th>-->
                        <th width="22%">修改时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) of shells">
                        <th>{{index}}</th>
                        <td width="40%" @click="goto(item)">
                            {{item.url}}
                        </td>
                        <td>{{item.pwd}}</td>
                        <td>{{item.ip}}</td>
                        <td>{{item.note}}</td>
                        <!--                        <td>{{item.createDate|date}}</td>-->
                        <td>{{item.changeDate|date}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <my-dialog title="添加" :visible.sync="isShowDialog">
            <template v-slot:content>
                <div class="form">
                    <div class="form-row">
                        <span>URL地址：</span>
                        <input type="text" v-model="form.url">
                    </div>
                    <div class="form-row">
                        <span>连接密码：</span>
                        <input type="text" v-model="form.pwd">
                    </div>
                    <div class="form-row">
                        <span>网站备注：</span>
                        <input type="text" v-model="form.note">
                    </div>
                    <div class="form-row">
                        <span>连接类型：</span>
                        <select v-model="form.type">
                            <option value="php">PHP</option>
                            <option value="jsp">JSP</option>
                            <option value="asp">ASP</option>
                        </select>
                    </div>
                    <div class="data">
                        <div class="add-headers">
                            <div class="notice">HTTP HEADERS</div>
                            <div class="table-headers">
                                <table cellspacing="0">
                                    <thead>
                                    <tr class="thead">
                                        <th width="10%"></th>
                                        <th>KEY</th>
                                        <th>VALUE</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) of 0">
                                        <td align="center"><input type="checkbox"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="button primary" @click="isShowDialog = false">取消</div>
                <div class="button primary" @click="test()">测试</div>
                <div class="button primary" @click="add()">添加</div>
            </template>
        </my-dialog>
    </div>
</template>

<script>
    import {TYPES} from '../../store/mutation-types'
    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                form: {url: '', note: ''},
                shells: [],
                isShowDialog: true
            }
        },
        created() {
            this.shells = this.get('shell', [])
        },
        filters: {
            // 时间转换器
            date(v) {
                if (!v) return ''
                if (typeof v === 'number') {
                    const temp = v + ''
                    if (temp.length === 10) {
                        return dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
                }
                if (typeof v === 'string') {
                    if (v.length === 10) {
                        return dayjs.unix(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return dayjs(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
                }
                return dayjs(v).format('YYYY-MM-DD HH:mm:ss')

            },
        },
        methods: {
            goto(item) {
                console.log(item);
                // console.log(location.href = 'file.html?url=' + item.url + '&pwd=' + item.pwd);
                this.$router.push({
                    path: '/file'
                })
            },
            add() {
                this.shells.push({
                    url: this.form.url,
                    pwd: this.form.pwd,
                    ip: '',
                    category: '',
                    note: this.form.note,
                    createDate: Date.now(),
                    changeDate: Date.now(),
                })
                this.set('shell', this.shells)
                this.form = {}
                this.isShowDialog = false
            },
            test() {

            },
            set(key, value) {
                if (typeof value === 'object') {
                    value = JSON.stringify(value)
                }
                localStorage.setItem(key, value)
            },
            get(key, default2 = '') {
                const value = localStorage.getItem(key) || default2
                try {
                    return JSON.parse(value)
                } catch (e) {
                    return value
                }
            },
            remove(key) {
                localStorage.removeItem(key)
            },
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    $border-color: gray;
    $bg-color: #2B2B2B;
    $head-bg-color: rgb(33, 33, 36);
    $dialog-bg-color: rgb(54, 54, 54);
    $input-bg-color: rgb(67, 67, 67);
    $main-bg-color: #2B2B2B;

    .home {
        padding: 0;
        margin: 0;
        position: relative;
        background: $main-bg-color;
        height: 100%;

        .toolbar {
            background: $head-bg-color;
            height: 40px;
            padding: 5px;
            display: flex;

            img, svg {
                height: 22px;
                width: 22px;
            }

            .left {
                display: flex;
                align-items: center;
                width: 200px;
                color: white;
                height: 100%;

                span {
                    margin-left: 10px;
                }
            }

            .right {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: space-between;

                .search {
                    display: flex;
                    flex: 1;
                    align-items: center;

                    .input-container {
                        display: flex;
                        align-items: center;
                        background: #38383C;
                        border-radius: 20px;
                        padding: 5px 10px;
                        margin-left: 10px;
                        width: 90%;
                        box-sizing: border-box;

                        img {
                            height: 15px;
                            width: 15px;
                        }

                        input {
                            margin-left: 5px;
                            background-color: #38383C;
                            color: white;
                            background-image: none;
                            border-radius: 4px;
                            border: none;
                            box-sizing: border-box;
                            display: inline-block;
                            font-size: inherit;
                            outline: none;
                            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                            width: 100%;

                        }
                    }
                }

                .options {
                    display: flex;
                    align-items: center;

                    img, svg {
                        margin: 0 5px;
                        cursor: pointer;
                    }
                }
            }
        }

        .content-container {
            display: flex;
            height: 100%;

            .category {
                width: 200px;
                border-right: 1px solid #3c505a;

                img, svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }

                .row {
                    padding: 10px 15px;
                    display: flex;
                    border-bottom: 1px solid #3c505a;
                    color: white;

                    &:hover {
                        opacity: .7;
                    }
                }
            }

            .content {
                width: calc(100% - 200px);

                box-sizing: border-box;
                color: white;

                table {
                    word-wrap: break-word;
                    word-break: break-all;
                    table-layout: fixed;
                    width: 100%;
                    border-collapse: collapse;
                    //border: 1px solid $border-color;

                    thead {
                        color: rgb(136, 136, 136);

                        tr {
                            height: 30px;
                        }

                        th {
                            border-right: 1px solid $border-color;

                            &:nth-last-child(1) {
                                border-right: none;
                            }
                        }
                    }

                    tbody {
                        /*text-align: center;*/
                        tr {
                            background-color: rgb(46, 46, 46);

                            height: 30px;
                            //border-bottom: 1px solid $border-color;
                            &:nth-child(even) {
                                background-color: rgb(43, 43, 43);
                            }

                            &:hover {
                                background-color: rgb(55, 55, 55);
                            }

                            &:active {
                                background-color: rgb(63, 63, 63);
                            }
                        }

                        td {
                            //border-right: 1px solid $border-color;
                            //width: 50%;
                        }
                    }
                }
            }
        }
    }

</style>
