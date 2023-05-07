import './style.css'
import { createRoot, createSignal, createEffect, watchSignalChild } from "./src/js-native-framework";

const component3 = (value2) => {
    const [value, setValue] = createSignal('AAAAAAAAAAAAAAAAAAAA')

    return {
        [Symbol('div')]: {
            children: 'УРАААААААААААААААААААААААААААААААААААА'
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
    const [value, setValue] = createSignal('999')
    const [value2, setValue2] = createSignal('0')

    createEffect(() => {

    }, [value2()])

    const onClick = () => {

    }

    const onChange = (event) => {
        setValue(event.target.value)

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

        setValue2(comp)
    }

    return {
        [Symbol('div')]: {
            children: value(),
            onClick,
        },
        [Symbol('div')]: {
            children: value(),
            onClick,
        },
        [Symbol('span')]: {
            children: watchSignalChild(value2(), (value) => {
                if (value === '0') {
                    return component3()
                }

                return value
            })
        },
        [Symbol('span')]: {
            children: ''
        },
        [Symbol('div')]: {
           children: {
               [Symbol('label')]: {
                   children: '80'
               },
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
