<template>
    <div class="folder">
        <div v-for="(item,index) in list" :key="index">
            <div class="content"
                 :path="(path?path+'/':'')+item.name"
                 :style="calcMarginLeft(deep)"
                 @click="goto((path?path+'/':'')+item.name)">
                <div class="icons">
                    <div class="arrow"
                         :class="item.isClose?'close':''"
                         @click.stop="$bus.$emit('closeChildren', (path?path+'/':'')+item.name)">
                    </div>
                    <!--                <img src="@/assets/images/file.png" alt="">-->
                    <svg t="1604848409953" class="icon" viewBox="0 0 1146 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4544" width="200" height="200">
                        <path d="M1064.955986 327.662224H40.955986A40.970321 40.970321 0 0 0 0 368.61821v573.412477a82.155673 82.155673 0 0 0 81.911972 81.926307h983.044014a82.155673 82.155673 0 0 0 81.911972-81.926307v-532.413485a82.155673 82.155673 0 0 0-81.911972-81.954978zM40.998992 245.750252h527.62549a40.941651 40.941651 0 0 0 36.626722-59.262179l-70.587076-141.188487a81.897637 81.897637 0 0 0-73.267779-45.299586H81.911972A81.911972 81.911972 0 0 0 0 81.911972v122.882294a40.970321 40.970321 0 0 0 40.955986 40.955986z m0 0"
                              p-id="4545" fill="#87939A"></path>
                    </svg>
                </div>
                <span class="name">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <dir-item style="width: 100%;" class="children" :class="item.isClose?'close':''" :deep="deep+1"
                      :path="(path?path+'/':'')+item.name" v-if="item.children && item.children.length"
                      :list="item.children"></dir-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DirItem',  //组件命名
        props: {
            list: Array,
            deep: {
                type: Number,
                default: 0
            },
            path: {
                type: String,
                default: ''
            },
        },
        methods: {
            calcMarginLeft(i) {
                return 'padding-left:' + 20 * i + 'px;'
            },
            test(pPath, cPath) {
                // console.log(pPath,cPath)
                return pPath + '/' + cPath
            },
            goto(p) {
                this.$bus.$emit('gotoPath', p)
            },
            closeChildren(p) {
                this.$bus.$emit('closeChildren', p)
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/color";


    .folder {
        min-width: 200px;

        float: left;

        .content {
            display: flex;
            padding: 5px;
            align-items: center;
            /*cursor: pointer;*/

            .icons {
                margin: 0 5px;
                display: flex;
                align-items: center;

                .arrow {
                    width: 0;
                    height: 0;
                    border: 7px solid transparent;
                    border-left: 12px solid $folder-color;
                    transform: translate(-4px, 3px) rotate(90deg);

                    &.close {
                        transform: rotate(0deg);
                    }
                }

                img, svg {
                    height: 22px;
                    width: 22px;
                }

                svg {
                    height: 16px;
                    width: 16px;
                }

            }

            .name {
                white-space: nowrap;
                margin-left: 5px;
            }

            &:hover {
                background: $active-color;
            }
        }

        .active {
            background: $active-color;

        }
    }

    .children {
        &.close {
            display: none;

        }
    }

</style>
