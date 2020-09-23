<template>
    <div>
        <div v-for="(item,index) in list" :key="index">
            <div :path="(path?path+'/':'')+item.name"
                 :style="calcMarginLeft(deep)"
                 class="name"
                 @click="goto((path?path+'/':'')+item.name)">
                <img src="@/assets/images/file.png" alt="">
                <span>{{item.name}}</span>
            </div>
            <dir-item class="children" :deep="deep+1" :path="(path?path+'/':'')+item.name" v-if="item.children"
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
                return 'padding-left:' + 10 * i + 'px;'
            },
            test(pPath, cPath) {
                // console.log(pPath,cPath)
                return pPath + '/' + cPath
            },
            goto(p) {
                this.$bus.$emit('gotoPath', p)
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

        img {
            height: 22px;
        }

        span {
            margin-left: 5px;
        }

        &:hover {
            background: $hover-color;
        }
    }

</style>
