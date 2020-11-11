<template>
    <div class="content" @click="contextMenu.isShow = false" @mousemove="mousemove" @mouseup="isResizing = false">
        <div class="tabs">
            <div class="tab">
                code11111
            </div>
            <div class="tab">
                asdfasdfasd
            </div>
        </div>
        <div class="tab-content">
            <div :style="leftWidth" class="left-dir">
                <folders :shell="shell"></folders>
            </div>
            <div :style="rightWidth" class="dir-content">
                <div class="gutter-vertical" @mousedown="isResizing = true"></div>
                <div class="float-top">
                    <div class="nav-bar">
                        <div class="option-container">
                            <div class="breadcrumb-container">
                                <div class="breadcrumb">
                                    <div v-for="item of current_parse_path">{{item}}</div>
                                </div>
                                <input type="text" :value="currentPath">
                            </div>
                            <div class="options">
                                <div>
                                    <img class="arrow-right" src="@/assets/images/arrow.png" alt="">
                                </div>
                                <div>
                                    <img class="arrow-up" src="@/assets/images/arrow.png" alt=""
                                         @click="back()">
                                </div>
                                <div>
                                    <img class="home" src="@/assets/images/home.png" alt=""
                                         @click="gotoPath(homePath)">
                                </div>
                                <div>
                                    <img class="refresh" src="@/assets/images/refresh.png" alt=""
                                         @click="gotoPath(currentPath)">
                                </div>
                            </div>
                        </div>
                        <div class="search">
                            <img class="arrow-right" src="@/assets/images/search.png" alt="">
                            <input type="text" value="" placeholder="搜索">
                        </div>
                    </div>
                    <div class="dir-des">
                        <div class="name">名称</div>
                        <div class="change-date">修改日期</div>
                        <div class="type">类型</div>
                        <div class="size">大小</div>
                    </div>
                </div>
                <div class="dirs">
                    <div class="dir "
                         :class="item.isActive?'active':''"
                         v-for="item of currentDir"
                         @click="dirClick(item)"
                         @dblclick="dbClick(item)"
                         @contextmenu.prevent="onContextMenu($event,item)">
                        <img src="@/assets/images/file.png" alt="" v-if="item.type">
                        <img src="@/assets/images/txt-file.png" alt="" v-else>
                        <div class="name">{{item.name}}</div>
                        <div class="change-date">{{item.change_date}}</div>
                        <div class="type">{{item|fileType}}</div>
                        <div class="size">{{item.file_size|size}}</div>
                    </div>
                </div>
                <div class="file-tab">
                    <div class="tab" v-for="(item,index) of readFiles" @click="showFileContent(item)">
                        <img src="@/assets/images/txt-file.png" alt="">
                        <span>{{item.title}}</span>
                        <img class="cp" src="@/assets/images/close.png" alt="" @click="removeFile(index)">
                    </div>
                </div>
            </div>
        </div>
        <CodeEdit class="file-content"
                  @close="readFile.isShow = false"
                  v-if="readFile.isShow"
                  :content="readFile.content"
                  :title="readFile.title"
                  :path="readFile.path">
        </CodeEdit>

        <div v-if="contextMenu.isShow" :style="{top:contextMenu.top+'px',left:contextMenu.left+'px'}"
             class="contextmenu">
            <div class="item" @click="gotoPath(currentPath)">
                <img src="@/assets/images/file.png" alt="">
                <span>刷新目录</span>
            </div>
            <div class="item" @click="$refs.file.click()">
                <input type="file" ref="file" id="file" style="display: none" @change="upload($event)">
                <img src="@/assets/images/file.png" alt="">
                <span>上传文件</span>
            </div>
            <div class="item" @click="download()">
                <img src="@/assets/images/file.png" alt="">
                <span>下载文件</span>
            </div>
            <div class="item" @click="deleteFile()">
                <img src="@/assets/images/file.png" alt="">
                <span>删除</span>
            </div>
            <div class="item" @click="rename">
                <img src="@/assets/images/file.png" alt="">
                <span>重命名</span>
            </div>
            <div class="item" @click="isShowDialog = true">
                <img src="@/assets/images/file.png" alt="">
                <span>新建</span>
            </div>
            <div class="item">
                <img src="@/assets/images/file.png" alt="">
                <span>在此处打开终端</span>
            </div>
        </div>
        <div class="mask" v-if="isShowDialog"></div>
        <div class="dialog" v-if="isShowDialog">
            <div class="header">
                新建
            </div>
            <div class="content">
                名称:<input type="text" v-model="createFileName">
            </div>
            <div class="footer">
                <div class="button primary" @click="isShowDialog = false">取消</div>
                <div class="button primary" @click="createFile()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import DirItem from "./DirItem"
    import folders from "./folders"
    import File from '../../template/php/file.js'
    import CodeEdit from "./CodeEdit";
    import {mapState} from 'vuex'


    export default {
        components: {
            'dir-item': DirItem,
            'CodeEdit': CodeEdit,
            folders
        },
        data() {
            return {
                viewWidth: 1000,
                width: 1000 * 0.2,
                isShowDialog: false,
                createFileName: '',
                shell: {
                    url: 'api/shell.php',
                    pwd: 'c',
                    shellUrl: 'api/shell.php?c=',
                },
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
                root_path: '',
                currentPath: '',
                current_parse_path: [],
                homePath: '',
            }
        },
        computed: {
            ...mapState('file', [
                'currentDir'
            ]),
            rightWidth() {
                return {width: (this.viewWidth - this.width) + 'px'}
            },
            leftWidth() {
                return {width: this.width + 'px'}

            }
        },
        filters: {
            size(r) {
                if (!r) return ''
                let kb = r / 1024
                if (kb > 1024 * 1024) {
                    let gb = kb / (1024 * 1024)
                    return gb.toFixed(2) + ' GB'
                } else if (kb > 1024) {
                    let mb = kb / 1024
                    return Math.ceil(mb) + ' MB'
                } else {
                    return Math.ceil(kb) + ' KB'
                }
            },
            fileType(r) {
                if (!r) return ''
                if (r.type) {
                    if (r.name === '.' || r.name === '..') {
                        return ''
                    }
                    return '文件夹'
                } else {
                    let suffix = r.name.split('.').pop()
                    switch (suffix) {
                        case 'txt':
                            return '文本'
                        case 'doc':
                        case 'docx':
                            return 'DOC 文档'
                        case 'pdf':
                            return 'PDF 文档'
                        case 'exe':
                            return '应用程序'
                        case 'php':
                            return 'PHP文件'
                        case 'asp':
                            return 'ASP文件'
                        case 'jsp':
                            return 'JSP文件'
                        default:
                            return '未知文件'
                    }
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            mousemove(e) {
                if (!this.isResizing) return;
                if (e.clientX < 120) return;
                this.width = e.clientX
            },
            save() {
                // console.log(this.readFile.content)
                let pre = this.$refs['pre']
                let newContent = pre.innerText

                console.log()
            },
            async upload(e) {
                // console.log(e);
                let file = e.path[0].files[0]
                let formData = new FormData()
                formData.append('file', file)
                let res = await axios.post(this.shell.shellUrl + new File(file.name).upload(), formData, {
                    headers: {'Content-type': 'multipart/form-data'}
                })
                await this.gotoPath(this.currentPath)
                // console.log(res);

            },
            back() {
                let backUrl = JSON.parse(JSON.stringify(this.current_parse_path))
                backUrl.pop()
                if (backUrl.length) {
                    backUrl = backUrl.join('/')
                    console.log(backUrl);
                    this.gotoPath(backUrl)
                }
            },
            async init() {
                this.shell.shellUrl = this.generateShellUrl()
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
            generateShellUrl() {
                if (this.shell.url.indexOf('?') !== -1) {
                    return this.shell.url + '&' + this.shell.pwd + '='
                }
                return this.shell.url + '?' + this.shell.pwd + '='
            },
            dirClick(item) {
                this.currentDir = this.currentDir.map(v => {
                    v.isActive = false;
                    return v
                })
                item.isActive = true
            },
            dbClick(item) {
                let gotoPath = this.currentPath + '/' + item.name
                if (item.type) {
                    this.gotoPath(gotoPath)
                } else {
                    let suffixIndex = gotoPath.lastIndexOf('.')
                    let suffix = gotoPath.substr(suffixIndex + 1).toLowerCase();
                    let allowReadSuffix = [
                        'txt',
                        'php',
                        'php4',
                        'php5',
                        'asp',
                        'aspx',
                        'jsp',
                        'jspx',
                        'htaccess',
                    ]
                    console.log(item);
                    if (allowReadSuffix.find(v => v === suffix) && (item.file_size < 1024 * 1024)) {
                        // console.log('在其中');
                        this.readFileContent(gotoPath, item.name)
                    } else {
                        // console.log('不在其中');
                    }
                }
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
            async download() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.path).download()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
            async createFile() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.path + this.createFileName).create()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
                await this.gotoPath(this.currentPath)
                this.isShowDialog = false
            },
            async deleteFile() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file).delete()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
                await this.gotoPath(this.currentPath)
            },
            async rename() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file, this.contextMenu.file + '2').rename()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
            onContextMenu(e, item) {
                console.log(e, item);
                // console.log(e.clientX, '----', e.clientY);
                // console.log(e.pageX, '----', e.pageY);
                // console.log(e.offsetX, '----', e.offsetY);
                // console.log(e.screenX, '----', e.screenY);
                // console.log(e.x, '----', e.y);
                this.contextMenu.isShow = true
                this.contextMenu.top = e.y
                this.contextMenu.left = e.x
                this.contextMenu.file = this.currentPath + item.name
                this.contextMenu.path = this.currentPath
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
            }
        },
        mounted() {
            this.$bus.$on('gotoPath', v => {
                // console.log(v);
                // this.gotoPath(v)
            })
            this.$bus.$on('closeChildren', v => {
                // console.log(v);
                // this.closeChildren(v)
            })
        }
    }
</script>

<style lang="scss" scoped>

    $hover-color: rgb(75, 110, 175);
    $border-color: rgb(229, 229, 229);
    .content {
        -webkit-user-select:none;//禁止文字被选中
        height: 100%;
        width: 100%;
        position: relative;
        background: rgb(60, 63, 65);
        color: rgb(147, 186, 186);

        img {
            height: 15px;
        }

        .cp {
            cursor: pointer;
        }

        .contextmenu {
            /*width: 100px;*/
            /*height: 200px;*/
            background: darkgray;
            border-radius: 4px;
            position: absolute;
            top: 50px;

            .item {
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 10px;

                img {
                    margin-right: 10px;
                }
            }
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
            height: 100%;


            .left-dir {
                overflow: auto;
                position: relative;


                &::-webkit-scrollbar {
                    cursor: col-resize;

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

                .float-top {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 60px;

                    .nav-bar {
                        height: 30px;
                        display: flex;


                        .option-container {
                            display: flex;
                            width: 66%;

                            border: 1px solid $border-color;
                            height: 100%;

                            .breadcrumb-container {
                                height: 100%;
                                width: calc(100% - 120px);

                                .breadcrumb {
                                    height: 100%;
                                    width: 80%;
                                    display: flex;
                                    display: none;
                                    align-items: center;
                                    overflow: auto;

                                    &::-webkit-scrollbar {
                                        display: none; /* Chrome Safari */
                                    }

                                    div {
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        padding: 0 8px;
                                        white-space: nowrap; //强制文本不换行

                                        &::after {
                                            margin-left: 10px;
                                            content: "";
                                            width: 5px;
                                            height: 5px;
                                            border: solid gray;
                                            border-width: 1px 1px 0 0;
                                            transform: translateY(2px) rotate(45deg);
                                        }

                                        &:nth-last-child(1) {
                                            &::after {
                                                display: none;
                                            }
                                        }

                                        &:hover {
                                            background: $hover-color;
                                        }
                                    }
                                }

                                input {
                                    /*display: none;*/
                                    box-sizing: border-box;
                                    outline: 0;
                                    border: 0;
                                    margin: 0;
                                    padding: 0 15px;
                                    height: 100%;
                                    width: 100%;

                                    &:focus {
                                        border: 1px solid rgb(0, 120, 215);
                                    }
                                }
                            }

                            .options {
                                //width: 20%;
                                width: 120px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;

                                div {
                                    border-left: 1px solid $border-color;
                                    height: 100%;
                                    width: 30px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    &:hover {
                                        background: $hover-color;
                                    }
                                }

                                img {
                                    height: 15px;
                                }

                                .arrow-right {
                                    transform: rotate(-90deg);
                                }

                                .arrow-up {
                                    transform: rotate(180deg);
                                }
                            }
                        }

                        .search {
                            margin-left: 10px;
                            border: 1px solid $border-color;
                            width: 33%;
                            display: flex;
                            align-items: center;

                            img {
                                margin: 0 10px;
                                height: 15px;
                            }

                            input {
                                box-sizing: border-box;
                                outline: 0;
                                border: 0;
                                margin: 0;
                                height: 100%;
                                width: 100%;
                            }
                        }
                    }

                    .dir-des {
                        display: flex;
                        /*margin: 3px;*/
                        padding: 6px;

                        .name {
                            width: 50%;
                            margin-left: 10px;
                        }

                        .change-date {
                            width: 20%;
                        }

                        .type {
                            width: 15%;
                        }

                        .size {
                            width: 15%;
                        }
                    }
                }

                .dirs {
                    overflow: auto;
                    height: 100%;
                    padding: 60px 0 30px 0;
                    box-sizing: border-box;
                    /*height: calc(100% - 60px);*/
                    /*margin-top: 60px;*/
                    /*margin-bottom: 30px;*/

                    .dir {
                        display: flex;
                        /*margin: 3px;*/
                        padding: 6px;

                        &.active {
                            background: $hover-color;
                        }

                        &:hover {
                            background: $hover-color;
                        }

                        .name {
                            width: 50%;
                            margin-left: 10px;
                        }

                        .change-date {
                            width: 20%;
                        }

                        .type {
                            width: 15%;
                        }

                        .size {
                            width: 15%;
                        }
                    }

                }

                .file-tab {
                    /*height: 30px;*/
                    z-index: 9;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background: #e8e7e7;
                    display: flex;
                    overflow: auto;

                    .tab {
                        cursor: pointer;
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        background: lightgray;
                        margin-right: 5px;
                        border-radius: 4px 4px 0 0;

                        img {
                            margin: 2px 5px;
                            height: 15px;
                        }
                    }
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
