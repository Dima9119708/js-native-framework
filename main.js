import './src/index.css'
import { createRoot } from "./src/js-native-framework";
import { createEffect, createSignal } from "./src/js-native-framework";

let count1 = 0
let count2 = 0
let count3 = 0

const component = () => {
    const [signal1, setSignal] = createSignal(count1)
    const [signal2, setSignal2] = createSignal(count2)
    const [signal3, setSignal3] = createSignal(count3)

    createEffect(() => {})

    setInterval(() => {
        count1++
        setSignal(count1)
    }, 500)

    return {
        [Symbol('div')]: {
            props: {
                className: 'h-[100px] w-[100px] rounded-[4px] bg-red-600',
            },
            children: {
                [Symbol('div')]: {
                    props: {
                        className: 'text-blue-600 font-semibold'
                    },
                    children: '900'
                },
                [Symbol('div')]: {
                    props: {
                        className: 'animate-heartBeat'
                    },
                    children: () => signal1()
                },
            },
        }
    }
}

const app = document.querySelector('#app')

createRoot(component(), app)
