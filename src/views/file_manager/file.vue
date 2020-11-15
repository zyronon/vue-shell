<template>
    <div class="content"
         @click="contextMenu.isShow = false"
         @mouseup="resize.directory = false"
         @mousemove="mousemove"
         @contextmenu="$event.preventDefault()"
    >
        <div class="tabs">
            <div class="tab">
                code11111
            </div>
            <div class="tab">
                asdfasdfasd
            </div>
        </div>
        <div class="file-tab" v-if="readFiles.length">
            <div class="tab" v-for="(item,index) of readFiles" @click="showFileContent(item)">
                <img src="@/assets/images/txt-file.png" alt="">
                <span>{{item.title}}</span>
                <img class="cp" src="@/assets/images/close.png" alt="" @click="removeFile(index)">
            </div>
        </div>
        <div class="tab-content" :style="tabContentHeight">
            <div :style="{'width':widths.directoryWidth+'px'}" class="left-dir">
                <directory></directory>
            </div>
            <div :style="{'width':viewWidth - widths.directoryWidth+'px'}" class="dir-content">
                <div class="gutter-vertical"
                     @mousedown="resize.directory = true"
                ></div>
                <option-bar></option-bar>
                <folder :directory-width="widths.directoryWidth"></folder>
            </div>
        </div>


        <CodeEdit class="file-content"
                  @close="readFile.isShow = false"
                  v-if="readFile.isShow"
                  :content="readFile.content"
                  :title="readFile.title"
                  :path="readFile.path">
        </CodeEdit>

    </div>
</template>

<script>
    import axios from 'axios'
    import DirItem from "./DirItem"
    import OptionBar from "./OptionBar"
    import directory from "./directory"
    import folder from "./folder"
    import File from '../../template/php/file.js'
    import CodeEdit from "./CodeEdit";
    import {mapActions, mapMutations, mapState} from 'vuex'
    import {TYPES} from "../../store/mutation-types";


    export default {
        components: {
            'dir-item': DirItem,
            'CodeEdit': CodeEdit,
            directory,
            folder,
            OptionBar
        },
        data() {
            return {
                viewWidth: 1000,
                contextMenu: {
                    isShow: false,
                    top: 0,
                    left: 0,
                    path: '',
                    file: '',
                },
                readFile: {
                    isShow: false,
                    content: `
                    <?php

namespace app\\index\\controller;

use think\\Db;
use think\\response\\Json;
use think\\worker\\Server;

class Worker extends Server {
    protected $socket = 'http://0.0.0.0:2346';


    public function onWorkerStart($worker) {

    }

    public function onWorkerReload($worker) {

    }

    public function onConnect($connection) {
//        $connection->uid = ++$this->global_uid;
//        $connection->getRemoteIp();
//        echo $connection->id;
        $connection->id = uniqid();
    }

    public function onMessage($connection, $data) {
        if ($data == null) {
            return;
        }
        $data = json_decode($data, true);

        $roomId = $data['roomId'];
        $user = $data['user'];

        $db = Db::table('rooms_users');

        $room = Db::table('rooms')
            ->where('id', $roomId)
            ->find();

        $roomsUsers = $db
            ->where('roomId', $roomId)
            ->select();

        $isJoin = Db::table('rooms_users')
            ->where('roomId', $data['roomId'])
            ->where('userId', $user['openId'])
            ->find();

        if (isset($data['option'])) {
            $option = $data['option'];
            switch ($option['type']) {
                case 'confirm':
                    //加入
                    $connection->id = uniqid();
                    if ($option['value']) {
                        if ($isJoin) {
                            if ($isJoin['connId'] !== $connection->id) {
                                Db::table('rooms_users')
                                    ->where('id', $isJoin['id'])
                                    ->update([
                                        'connId' => $connection->id,
                                        'type' => 1,
                                        'status' => 0
                                    ]);
                            }
                            echo '在';
                        } else {
                            echo '否';
                            $roomsPlayUsers = Db::table('rooms_users')
                                ->where('roomId', $roomId)
                                ->where('type', 1)
                                ->select();

                            if (count($roomsPlayUsers) >= 10) {
                                return $connection->send(wsSuccess('notice', '', '房间已满'));
                            }
                            Db::table('rooms_users')
                                ->insert([
                                    'roomId' => $roomId,
                                    'userId' => $user['openId'],
                                    'connId' => $connection->id,
                                    'type' => 1,
                                    'status' => 0,
                                ]);
                        }
                        $roomsPlayUsers = Db::table('rooms_users')
                            ->where('roomId', $roomId)
                            ->where('type', 1)
                            ->select();


                        $roomsUsers = Db::table('rooms_users')
                            ->where('roomId', $roomId)
                            ->select();

                        foreach ($roomsUsers as $item) {
                            foreach ($this->worker->connections as $i) {
                                if ($i->id == $item['connId']) {
                                    $i->send(wsSuccess('userJoin', $roomsPlayUsers, $user['name'] . '已加入'));
                                }
                            }
                        }
                    } else {
                        //观战
                        if ($isJoin) {
                            if ($isJoin['connId'] !== $connection->id) {
                                Db::table('rooms_users')
                                    ->where('id', $isJoin['id'])
                                    ->update([
                                        'connId' => $connection->id,
                                        'type' => 0,
                                        'status' => 0,
                                    ]);
                            }
                            echo '在';
                        } else {
                            echo '否';
                            Db::table('rooms_users')
                                ->insert([
                                    'roomId' => $roomId,
                                    'userId' => $user['openId'],
                                    'connId' => $connection->id,
                                    'type' => 0,
                                    'status' => 0,
                                ]);
                        }
                        $roomsLookUsers = Db::table('rooms_users')
                            ->where('roomId', $roomId)
                            ->where('type', 0)
                            ->select();

                        foreach ($roomsUsers as $item) {
                            foreach ($this->worker->connections as $i) {
                                if ($i->id == $item['connId']) {
                                    $i->send(wsSuccess('look', $roomsLookUsers, $user['name'] . '加入观战'));
                                }
                            }
                        }
                    }
                    break;
                case 'ready':
                    if ($room['currentGameIsStart'] == 1) {
                        return $connection->send(wsSuccess('notice', null, '游戏已开始'));
                    }

                    Db::table('rooms_users')
                        ->where('userId', $user['openId'])
                        ->update(['status' => 1]);

                    $roomsReadyUsers = Db::table('rooms_users')
                        ->where('roomId', $roomId)
                        ->where('status', 1)
                        ->select();


                    $roomsPlayUsers = Db::table('rooms_users')
                        ->where('roomId', $roomId)
                        ->where('type', 1)
                        ->select();

                    foreach ($roomsPlayUsers as $item) {
                        foreach ($this->worker->connections as $i) {
                            if ($i->id == $item['connId']) {
                                $i->send(wsSuccess('userReady', $roomsPlayUsers, $user['name'] . '已准备'));
                            }
                        }
                    }

                    if (count($roomsReadyUsers) == count($roomsPlayUsers) && count($roomsReadyUsers) >= 2) {
                        $room['currentGameIsStart'] = 1;
                        Db::table('rooms')
                            ->update($room);

                        $cards = GenerateCard::generateCards(count($roomsPlayUsers));

                        foreach ($roomsPlayUsers as $k => &$item) {
                            $card = $cards[$k];

                            $cardRow = [
                                'roomId' => $roomId,
                                'userId' => $item['userId'],
                                'roomsUsersId' => $item['id'],
                                'isHost' => 0,
                                'multiple' => null,
                                'grab' => null,
                                'numberGames' => $room['currentNumberGames'],
                                'card0' => $card[0],
                                'card1' => $card[1],
                                'card2' => $card[2],
                                'card3' => $card[3],
                                'card4' => $card[4],
                            ];
                            $cardRow['id'] = Db::table('rooms_users_games')
                                ->insertGetId($cardRow);

                            $item['currentGame'] = $cardRow;
                        }

                        foreach ($roomsPlayUsers as &$item) {
                            foreach ($this->worker->connections as $i) {
                                if ($i->id == $item['connId']) {
                                    $i->send(wsSuccess('myCard', $roomsPlayUsers));
                                }
                            }
                        }
                    }

                    break;
                case 'grab':
                    $option['value']['time'] = time();
                    Db::table('rooms_users_games')
                        ->update($option['value']);

                    echo 1;

                    $currentGames = Db::table('rooms_users_games')
                        ->where('roomId', $roomId)
                        ->where('numberGames', $room['currentNumberGames'])
                        ->select();


                    $roomsUsers = Db::table('rooms_users')
                        ->where('roomId', $roomId)
                        ->select();

                    foreach ($roomsUsers as &$item) {
                        foreach ($currentGames as $games) {
                            if ($games['userId'] == $item['userId']) {
                                $item['currentGame'] = $games;
                            }
                        }
                    }


                    foreach ($roomsUsers as $item2) {
                        foreach ($this->worker->connections as $i) {
                            if ($i->id == $item2['connId']) {
                                $i->send(wsSuccess('updateUserStatus', $roomsUsers));
                            }
                        }
                    }

                    $roomsPlayUsers = Db::table('rooms_users')
                        ->where('roomId', $roomId)
                        ->where('type', 1)
                        ->select();

                    $currentGames = Db::table('rooms_users_games')
                        ->where('roomId', $roomId)
                        ->where('numberGames', $room['currentNumberGames'])
                        ->where('grab', '<>', null)
                        ->select();

                    if (count($roomsPlayUsers) == count($currentGames)) {

                        $currentGames[0]['isHost'] = 1;
                        Db::table('rooms_users_games')
                            ->update($currentGames[0]);

                        foreach ($roomsUsers as &$item) {
                            foreach ($currentGames as $games) {
                                if ($games['userId'] == $item['userId']) {
                                    $item['currentGame'] = $games;
                                }
                            }
                        }

                        foreach ($roomsUsers as $item2) {
                            foreach ($this->worker->connections as $i) {
                                if ($i->id == $item2['connId']) {
                                    $i->send(wsSuccess('multiple', $roomsUsers));
                                }
                            }
                        }
                    }

                    break;
                case 'multiple':
                    Db::table('rooms_users_games')
                        ->update($option['value']);

                    $currentGames = Db::table('rooms_users_games')
                        ->where('roomId', $roomId)
                        ->where('numberGames', $room['currentNumberGames'])
                        ->select();


                    $roomsUsers = Db::table('rooms_users')
                        ->where('roomId', $roomId)
                        ->select();

                    foreach ($roomsUsers as &$item) {
                        foreach ($currentGames as $games) {
                            if ($games['userId'] == $item['userId']) {
                                $item['currentGame'] = $games;
                            }
                        }
                    }

                    foreach ($roomsUsers as $item2) {
                        foreach ($this->worker->connections as $i) {
                            if ($i->id == $item2['connId']) {
                                $i->send(wsSuccess('updateUserStatus', $roomsUsers));
                            }
                        }
                    }

                    $roomsPlayUsers = Db::table('rooms_users')
                        ->where('roomId', $roomId)
                        ->where('type', 1)
                        ->select();

                    $currentNotHostGames = Db::table('rooms_users_games')
                        ->where('roomId', $roomId)
                        ->where('numberGames', $room['currentNumberGames'])
                        ->where('isHost', 0)
                        ->where('multiple', '<>', null)
                        ->select();

                    if (count($roomsPlayUsers) - 1 == count($currentNotHostGames)) {
                        //重置游戏为未开始
                        $room['currentGameIsStart'] = 0;
                        $room['currentNumberGames'] = $room['currentNumberGames'] + 1;
                        Db::table('rooms')
                            ->update($room);

                        //重置所有玩家为未准备
                        Db::table('rooms_users')
                            ->where('roomId', $roomId)
                            ->where('type', 1)
                            ->update(['status' => 0]);


                        $hostGamer = null;
                        foreach ($currentGames as &$currentGame) {
                            $currentGame['res'] = GenerateCard::calcPoints($currentGame);
                            if ($currentGame['isHost'] == 1) {
                                $hostGamer = $currentGame;
                            }
                        }
                        $baseFraction = $room['baseFraction'];

                        foreach ($currentGames as &$v) {
                            if ($v['id'] !== $hostGamer['id']) {
                                $vDigits = 1;
                                $hostDigits = 1;

                                $vType = $v['res']['type'];
                                $hostType = $hostGamer['res']['type'];
                                switch ($vType) {
                                    case 13:
                                    case 12:
                                    case 11:
                                        $vDigits = 5;
                                        break;
                                    case 10:
                                        $vDigits = 4;
                                        break;
                                    case 9:
                                        $vDigits = 3;
                                        break;
                                    case 8:
                                    case 7:
                                        $vDigits = 2;
                                        break;
                                    case 0:
                                        echo '无牛';
                                        break;
                                    default:
                                        $vDigits = 1;
                                        break;
                                }
                                switch ($hostType) {
                                    case 13:
                                    case 12:
                                    case 11:
                                        $hostDigits = 5;
                                        break;
                                    case 10:
                                        $hostDigits = 4;
                                        break;
                                    case 9:
                                        $hostDigits = 3;
                                        break;
                                    case 8:
                                    case 7:
                                        $hostDigits = 2;
                                        break;
                                    case 0:
                                        echo '无牛';
                                        break;
                                    default:
                                        $hostDigits = 1;
                                        break;
                                }

                                $v['score'] = $vDigits * $baseFraction * $v['multiple'] * $hostDigits;
                                $hostGamer['score'] = $vDigits * $baseFraction * $v['multiple'] * $hostDigits;
                                if ($vType > $hostType) {
                                    $v['scoreType'] = 1;
                                    $hostGamer['scoreType'] = 0;
                                } elseif ($vType == $hostType) {
                                    $v['scoreType'] = -1;
                                    $hostGamer['scoreType'] = -1;
                                } else {
                                    $v['scoreType'] = 0;
                                    $hostGamer['scoreType'] = 1;
                                }
                            }
                        }

                        foreach ($currentGames as &$currentGame) {
                            if ($currentGame['id'] == $hostGamer['id']) {
                                $currentGame['scoreType'] = $hostGamer['scoreType'];
                                $currentGame['score'] = $hostGamer['score'];
                            }
                            Db::table('rooms_users_games')
                                ->update($currentGame);
                        }

                        foreach ($roomsPlayUsers as &$item) {
                            $item['status'] = 0;
                            foreach ($currentGames as $games) {
                                if ($games['userId'] == $item['userId']) {
                                    $item['currentGame'] = $games;
                                }
                            }
                        }

                        foreach ($roomsUsers as $item2) {
                            foreach ($this->worker->connections as $i) {
                                if ($i->id == $item2['connId']) {
                                    $i->send(wsSuccess('end', $roomsPlayUsers));
                                }
                            }
                        }
                    }
                    break;
                case 'end':
                    break;
            }
        } else {
            foreach ($roomsUsers as $item) {
                foreach ($this->worker->connections as $i) {
                    if ($i->id == $item['connId']) {
                        $i->send($data['value']);
                    }
                }
            }
        }
    }

    public function onMessage1($connection, $data) {
        //        if (in_array($connection->id, [0, 1, 2, 3, 4, 5])) {
        //            $connection->id = uniqid();
        //        } else {
        //        }
        if ($data == null) {
            return;
        }
        $data = json_decode($data, true);

        d($connection->id);

        d('-------------------------------------------------------------------------------------------------');
        d('-------------------------------------------------------------------------------------------------');
        d('-------------------------------------------------------------------------------------------------');
        d('-------------------------------------------------------------------------------------------------');
        if (isset($data['test'])) {
            d('进来了');
            foreach ($this->worker->connections as $i) {
                if ($i->id == $data['test']) {
                    d(123123);
                }
            }
        }
        //        $this->worker->connections[$connection->id]->send($data['value']);
    }

    public function onClose($connection) {
        //        echo '---die---';
        //        echo $connection->id;
    }

    public function onError($connection, $code, $msg) {
        echo "error [ $code ] $msg\\n";
    }
}
                    `,
                    title: '',
                    path: 'D:/safe/code/vue-shell/php-shell//shell.php'
                },
                readFiles: [],
                current_parse_path: [],
                resize: {
                    directory: false,
                },
                widths: {
                    directoryWidth: 1000 * .2,
                }
            }
        },
        computed: {
            ...mapState('file', [
                'currentDir',
                'homePath',
                'currentPath',
                'shell'
            ]),
            tabContentHeight() {
                return {height: !this.readFiles.length ? '100%' : 'calc(100% -30px)'}
            }
        },

        created() {
            this.init()
        },
        methods: {
            ...mapActions('file', {
                gotoPath: 'gotoPath'
            }),
            ...mapMutations('file', {
                setShell: TYPES.SET_SHELL + '',
            }),
            mousemove(e) {
                if (this.resize.directory) {
                    if (e.clientX < 120) return this.resize.directory = false
                    this.widths.directoryWidth = e.clientX
                }
            },
            save() {
                // console.log(this.readFile.content)
                let pre = this.$refs['pre']
                let newContent = pre.innerText

                console.log()
            },
            async init() {
                let shell = {url: 'api/shell.php', pwd: 'c'}
                shell.shellUrl = this.generateShellUrl(shell)
                this.setShell(shell)

                // let content = this.editor.getValue()
                let content = ' async init() {\n' +
                    '                this.shell.shellUrl = this.generateShellUrl()\n' +
                    '                await this.getCurrentPath()\n' +
                    '                // let content = this.editor.getValue()\n' +
                    '                let content = \'花木成畦手自栽工花木成畦手自栽茜花木成畦手自栽李斐莉雪\'\n' +
                    '                console.log(base64._encode(content));\n' +
                    '                // let res = await this.$request(\'http://localhost:8863/api/file.php\', \'c=\' + base64._encode(content), {}, \'POST\')\n' +
                    '                // console.log(res);\n' +
                    '            },'
                // console.log(base64._encode(content));
                // let res = await this.$request('http://localhost:8863/api/file.php', 'c=' + base64._encode(content), {}, 'POST')
                // console.log(res);
            },
            generateShellUrl(shell) {
                if (shell.url.indexOf('?') !== -1) {
                    return shell.url + '&' + shell.pwd + '='
                }
                return shell.url + '?' + shell.pwd + '='
            },

            async readFileContent(path, fileName) {
                let res = await this.$request(this.shell.shellUrl + new File(path).read())
                // console.log(res);
                let row = {
                    title: fileName,
                    content: res,
                    path: path,
                }
                this.readFile = {...this.readFile, ...row}
                this.readFile.isShow = true
                this.readFiles.push(row)
            },
            showFileContent(item) {
                let that = this
                that.readFile = {...that.readFile, ...item}
                that.readFile.isShow = !that.readFile.isShow
                // console.log(that.readFile);
            },
            async request(phpCode) {
                return new Promise(resolve => {
                    $.ajax({
                        url: 'http://localhost/shell.php?c=' + phpCode,
                        success(res) {
                            resolve(res)
                        }
                    })
                })
            },

            removeFile(i) {
                console.log(i);
                let fileTab = this.readFiles[i]
                if (fileTab.path === this.readFile.path) {
                    this.readFile = {
                        isShow: false,
                        content: '',
                        title: '',
                        path: ''
                    }
                }
                this.readFiles.splice(i, 1)
                if (this.readFiles.length === 0) {
                    this.readFile.isShow = !this.readFile.isShow
                }
            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>

    $hover-color: rgb(75, 110, 175);
    $border-color: rgb(229, 229, 229);
    $bg-color: rgb(60, 63, 65);
    //$bg-color: #AFB1B3;

    .content {
        -webkit-user-select: none; //禁止文字被选中
        height: 100%;
        width: 100%;
        position: relative;
        background: $bg-color;
        color: rgb(147, 186, 186);

        img {
            height: 15px;
        }

        .cp {
            cursor: pointer;
        }



        .tabs {
            display: none;

            .tab {
                width: 30%;
                background: #ff634c;
                margin: 3px;
            }
        }


        .tab-content {
            //border-top: 1px solid gray;
            display: flex;
            //height: 100%;
            height: calc(100% - 30px);


            .left-dir {
                overflow: auto;
                position: relative;


                &::-webkit-scrollbar {
                    width: 8px;
                    height: 10px;
                    background: #F1F1F1;
                }

                &::-webkit-scrollbar-button {
                    display: none;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    background: #C1C1C1;

                    &:hover {
                        background: #a8a8a8;
                    }

                    &:active {
                        background: #787878;
                    }
                }

                &::-webkit-scrollbar-track {
                    border-radius: 10px;
                    background: #F1F1F1;
                }
            }

            .dir-content {
                height: 100%;
                position: relative;

                .gutter-vertical {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 1px;
                    height: 100%;

                    &::after {
                        content: "";
                        cursor: ew-resize;
                        display: block;
                        height: 100%;
                        width: 8px;
                        position: fixed;
                        margin-left: -3px;
                        z-index: 10;
                    }
                }
            }
        }

        .file-tab {
            height: 30px;
            z-index: 9;
            width: 100%;
            display: flex;
            overflow: auto;

            .tab {
                cursor: pointer;
                padding: 5px;
                display: flex;
                margin-right: 1px;
                align-items: center;
                background: rgb(78, 82, 84);

                img {
                    margin: 2px 5px;
                    height: 15px;
                }
            }
        }
    }

    .file-content {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: #fff;
    }

    .mask {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
    }

    .dialog {
        top: calc(50% - 100px);
        left: 25%;
        position: absolute;
        border-radius: 4px;
        background: #ffffff;
        width: 50%;
        //height: 100px;
        border: 1px solid $border-color;

        .content {
            padding: 30px 20px;
            color: #606266;
            font-size: 14px;
            word-break: break-all;
        }


        .header {
            padding: 20px;
            padding-bottom: 10px;
        }

        .footer {
            padding: 20px;
            padding-top: 10px;
            text-align: right;
            box-sizing: border-box;
        }
    }
</style>
