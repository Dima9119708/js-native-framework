import './style.css'
import { createRoot, createSignal, createEffect, watchSignalChild } from "./src/js-native-framework";
import {watchSignalFragment} from "./src/js-native-framework/signal/index.js";

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

const component = () => {
    const [signal1, setValue] = createSignal(false)
    const [value2, setValue2] = createSignal('0')

    createEffect(() => {

    }, [value2()])

    const onClick = () => {

    }

    const onChange = (event) => {
        let comp = '0'

        if (!event.target.value.length) {
            comp = '0'
        }

        if (event.target.value.length > 2) {
            comp = '1'
        }

        if (event.target.value.length > 8) {
            comp = '8'
        }

        if (event.target.value.length > 9) {
            comp = '60'
        }

        setValue2(!signal1().value)
        setValue(!signal1().value)
    }

    return {
        // [Symbol('div')]: {
        //     children: signal1(),
        //     onClick,
        // },
        // [Symbol('div')]: {
        //     children: signal1(),
        //     onClick,
        // },
        ...watchSignalFragment(value2(), (value) => {
            if (value) {
                return {
                    [Symbol('div')]: {
                        children: `TRUE ${value}`
                    }
                }
            }

            return ({
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
                                                                            children: 'FALSE'
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
                    }
                }
            })
        }),
        // [Symbol('span')]: {
        //     children: {
        //         [Symbol('span')]: {
        //             children: '8000'
        //         }
        //     }
        // },
        [Symbol('div')]: {
           children: {
               // [Symbol('label')]: {
               //     children: '80'
               // },
               [Symbol('input')]: {
                   onChange,
                   onClick,
               },
           }
        },
    }
}

const app = document.querySelector('#app')

createRoot(component(), app)
