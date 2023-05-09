import './style.css'
import { createRoot, watchSignalChild } from "./src/js-native-framework";
import { createEffect, createSignal } from "./src/js-native-framework";
import {watchSignalFragment} from "./src/js-native-framework/signal";

const component3 = (value2) => {
    const [value, setValue] = createSignal('AAAAAAAAAAAAAAAAAAAA')

    return {
        [Symbol('div')]: {
            children: 'УРАААААААААААААААААААААААААААААААААААА',
            onClick: () => setValue('8')
        },
    }
}

const component2 = () => {
    return {
        [Symbol('div')]: {
            children: 'Component2'
        },
    }
}

let count1 = 0
let count2 = 0
let count3 = 0
let count4 = 0
let count5 = 0

const component = () => {
    const [signal1, setValue] = createSignal(true)
    const [value2, setValue2] = createSignal(true)

    // createEffect(() => {
    //     count1++
    //     signal1();
    // })
    //
    // createEffect(() => {
    //     count2++
    //     signal1();
    // })

    // setTimeout(() => {
    //     setValue(!signal1())
    // }, 2000)

    // setTimeout(() => {
    //     setValue(!signal1())
    // }, 2000)
    //
    // setTimeout(() => {
    //     setValue(!signal1())
    // }, 4000)
    //
    setTimeout(() => {
        setValue2(!value2())
    }, 2000)
    //
    // setTimeout(() => {
    //     setValue2(!value2())
    // }, 7000)

    const onClick = () => {}
    const onChange = (event) => {}

    return [
        {
            [Symbol('div')]: {
                children: 'signal1()',
                onClick,
            },
        },
        () => value2() ? 8000 : 9000,
        // {
        //     [Symbol('div')]: {
        //         children: () => signal1()
        //             ? ({
        //                 [Symbol('div')] : {
        //                     children: ({
        //                         [Symbol('span')] : {
        //                             children: {
        //                                 [Symbol('span')]: {
        //                                     children: () => ({
        //                                         [Symbol('div')] : {
        //                                             children: 1000
        //                                         }
        //                                     })
        //                                 },
        //                                 [Symbol('div')]: {
        //                                     children: 80
        //                                 },
        //                             }
        //                         }
        //                     })
        //                 }
        //             })
        //             : 90,
        //         onClick,
        //     },
        // }

    ]
}

const app = document.querySelector('#app')

createRoot(component(), app)
