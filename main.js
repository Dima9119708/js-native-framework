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

const component = () => {
    const [signal1, setValue] = createSignal('signal1')
    const [value2, setValue2] = createSignal(false)

    createEffect(() => {
        count1++
        signal1();
        console.log('count1', count1)
    })

    createEffect(() => {
        count2++
        signal1();
        console.log('count2', count2)
    })

    createEffect(() => {
        count3++
        signal1()
        console.log('count3', count3)
    })

    createEffect(() => {
        count4++
        signal1()
        console.log('count4', count4)
    })

    const onClick = () => {}
    const onChange = (event) => {}

    setTimeout(() => {
        setValue('START')
    }, 500)

    // setTimeout(() => {
    //     setValue2('PENDING')
    // }, 1000)

    setTimeout(() => {
        setValue('FINISH')
    }, 2000)


    setTimeout(() => {
        setValue('FINISH sacsac')
    }, 2500)


    return {
        [Symbol('div')]: {
            children: '',
            onClick,
        },
        // [Symbol('div')]: {
        //     children: signal1(),
        //     onClick,
        // },
        // ...watchSignalFragment(value2(), (value) => {
        //     if (value) {
        //
        //         return {
        //             [Symbol('div')]: {
        //                 children: {
        //                     [Symbol('div')]: {
        //                         children: {
        //                             [Symbol('div')]: {
        //                                 children:  {
        //                                     [Symbol('div')]: {
        //                                         children: signal1()
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //
        //     return ({
        //         [Symbol('div')]: {
        //             children: {
        //                 [Symbol('div')]: {
        //                     children: {
        //                         [Symbol('div')]: {
        //                             children: {
        //                                 [Symbol('div')]: {
        //                                     children: {
        //                                         [Symbol('div')]: {
        //                                             children: {
        //                                                 [Symbol('div')]: {
        //                                                     children: {
        //                                                         [Symbol('div')]: {
        //                                                             children: {
        //                                                                 [Symbol('div')]: {
        //                                                                     children: 'FALSE'
        //                                                                 }
        //                                                             }
        //                                                         }
        //                                                     }
        //                                                 }
        //                                             }
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     })
        // }),
        // [Symbol('span')]: {
        //     children: {
        //         [Symbol('span')]: {
        //             children: '8000'
        //         }
        //     }
        // },
        // [Symbol('div')]: {
        //    children: {
        //        // [Symbol('label')]: {
        //        //     children: '80'
        //        // },
        //        [Symbol('input')]: {
        //            onChange,
        //            onClick,
        //        },
        //    }
        // },
    }
}

const app = document.querySelector('#app')

createRoot(component(), app)

// let Listener;
//
// function readSignal() {
//
//     if (Listener) {
//
//         if (!this.observers) {
//             this.observers = []
//         }
//
//         if (Array.isArray(this.observers)) {
//             this.observers.push(Listener)
//         }
//     }
//
//     return this.value
// }
//
// function _createSignal(init) {
//
//     const content = {
//         value: init,
//         observers: null
//     }
//
//     const setter = (value) => {
//         content.value = value
//
//         content.observers.forEach((observer) => {
//             observer.fn()
//         })
//     }
//
//     return [readSignal.bind(content), setter]
// }
//
// const [_value, _setValue] = _createSignal(false)
// const [_value2, _setValue2] = _createSignal([])
//
// function _createEffect(fn) {
//     const content = {
//         fn
//     }
//
//     Listener = content
//
//     content.fn()
// }
//
// _createEffect(() => {
//     console.log(_value());
// })
//
// _createEffect(() => {
//     console.log(_value2());
// })
//
// setTimeout(() => {
//     _setValue(5)
// }, 1500)
//
// setTimeout(() => {
//     _setValue2(['asd', '984848'])
// }, 1500)
