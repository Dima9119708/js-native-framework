import './style.css'
import { createRoot }from "./src/js-native-framework";
import { createEffect, createSignal } from "./src/js-native-framework";

let count1 = 0
let count2 = 0
let count3 = 0

const component = () => {
    const [signal1, setSignal] = createSignal(count1)
    const [signal2, setSignal2] = createSignal(count2)
    const [signal3, setSignal3] = createSignal(count3)

    createEffect(() => {
        console.table({
            createEffect: 'createEffect',
            signal3: signal3(),
        });
    })

    setInterval(() => {
        count1++
        setSignal(count1)
    }, 1000)

    setInterval(() => {
        count2++
        setSignal2(count2)
    }, 500)

    setInterval(() => {
        count3++
        setSignal3(count3)
    }, 1500)

    return [
        {
            [Symbol('div')]: {
                children: 'Welcome signal native JS',
            },
        },
        () => signal2(),
        {
            [Symbol('div')]: {
                children: {
                    [Symbol('div')]: {
                        children: {
                            [Symbol('div')]: {
                                children: {
                                    [Symbol('div')]: {
                                        children: {
                                            [Symbol('div')]: {
                                                children: {
                                                    [Symbol('div')]: {
                                                        children: {
                                                            [Symbol('div')]: {
                                                                children: {
                                                                    [Symbol('div')]: {
                                                                        children: () => signal1()
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            },
        },
        () => ({
            [Symbol('div')]: {
                children: {
                    [Symbol('div')]: {
                        children:  {
                            [Symbol('div')]: {
                                children: {
                                    [Symbol('div')]: {
                                        children: () => signal3()
                                    }
                                }
                            }
                        }
                    }
                },
            },
        })
    ]
}

const app = document.querySelector('#app')

createRoot(component(), app)
