import './style.css'
import { createRoot, createSignal, createEffect } from "./src/js-native-framework";

const component3 = (value2) => {
    const [value, setValue] = createSignal('AAAAAAAAAAAAAAAAAAAA')

    return {
        [Symbol('div')]: {
            children: 'Component3'
        },
        [Symbol('div')]: {
            children: value(),
            onClick: () => setValue('BBBBBBBBBBBBBBBBBBBBBBB')
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
    const [value, setValue] = createSignal(false)
    const [value2, setValue2] = createSignal('initial')

    createEffect(() => {

    }, [value2()])

    const onClick = () => {
        setValue2('12345678'.split("").reverse().join(""))
    }

    const onChange = (event) => {
        setValue(event.target.value)

        const comp = event.target.value.length > 15 ? component3() : event.target.value

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
            children:  value2()
        },
        // ...component3(),
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
