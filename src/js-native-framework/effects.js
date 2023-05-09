import { createSubject } from "./subject";

let Listener;

function readSignal() {
    if (Listener) {
        if (!this.observers) {
            this.observers = [Listener]
        } else {
            this.observers.push(Listener)
        }
    }

    return this.value
}

const createSignal = (initial) => {
    const $signalSubscriber = createSubject()

    const context = {
        value: initial,
        $signalSubscriber,
        observers: null,
    }

    const setValue = (newValue) => {
        context.value = newValue

        context.observers?.forEach(observer => {
            observer({ type: 'change' })
        })

        $signalSubscriber.setState(newValue)
    }

    return [readSignal.bind(context), setValue]
}

const createEffect = (fn) => {
    Listener = fn

    fn({ type: 'mount' })

    Listener = undefined
}

export {
    createSignal,
    createEffect,
}
