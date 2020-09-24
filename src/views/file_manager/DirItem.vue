<template>
    <div>
        <div v-for="(item,index) in list" :key="index">
            <div :path="(path?path+'/':'')+item.name"
                 :style="calcMarginLeft(deep)"
                 class="name"
                 @click="goto((path?path+'/':'')+item.name)">
                <span class="arrow"
                      :class="item.isClose?'close':''"
                      @click.stop="$bus.$emit('closeChildren', (path?path+'/':'')+item.name)">
                </span>
                <img src="@/assets/images/file.png" alt="">
                <span>{{item.name}}</span>
            </div>
            <dir-item class="children" :class="item.isClose?'close':''" :deep="deep+1"
                      :path="(path?path+'/':'')+item.name" v-if="item.children"
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
    $hover-color: rgb(229, 243, 255);

    .name {
        padding: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .arrow {
            margin-right: 10px;
            width: 5px;
            height: 5px;
            border: solid gray;
            border-width: 1px 1px 0 0;
            transform: translateY(2px) rotate(135deg);

            &.close {
                transform: translateY(2px) rotate(45deg);
            }
        }

        img {
            height: 22px;
        }


        span {
            white-space: nowrap;
            margin-left: 5px;
        }

        &:hover {
            background: $hover-color;
        }
    }

    .children {
        &.close {
            display: none;

        }
    }

</style>
