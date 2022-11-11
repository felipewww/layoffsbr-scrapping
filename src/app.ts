import './infra/module-alias'
import '@/infra/config'
import {browser} from "@/infra/browser";

// import IA from '@/utils/ia';
// import ia from "@/utils"
// new IA()

function init() {
    browser()
        .then(res => {
            console.log('.then(res => {')
            console.log(res)
        })
        .catch(res => {
            console.log('.catch(res => {')
            console.log(res)
        })
}

init()
