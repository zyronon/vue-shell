import Vue from 'vue'
import MessageVue from './message.vue'

let MessageConstructor = Vue.extend(MessageVue)

let instance
let instances = []
let seed = 1

const Message = function (options) {
    options = options || {}
    if (typeof options === 'string') {
        options = {
            message: options
        }
    }
    let id = 'message_' + seed++
    options.onClose = function () {
        Message.close(id)
    }
    instance = new MessageConstructor({
        data: options
    })
    instance.id = id
    instance.$mount()
    document.body.appendChild(instance.$el)
    let verticalOffset = options.offset || 20
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })
    instance.verticalOffset = verticalOffset
    instance.visible = true
    instances.push(instance)
    return instance
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return Message(options)
    }
})

Message.close = function (id, userOnClose) {
    let len = instances.length
    let index = -1
    let removedHeight
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight
            index = i
            instances.splice(i, 1)
            break
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return
    for (let i = index; i < len - 1; i++) {
        let dom = instances[i].$el
        dom.style['transition'] = 'all .5s'
        dom.style['top'] =
            parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
    }
}

Message.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close()
    }
}
export default Message
