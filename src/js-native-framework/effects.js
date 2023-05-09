import { $CREATE_SIGNAL } from "./constant";
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
            observer()
        })

        $signalSubscriber.setState(newValue)
    }

    return [readSignal.bind(context), setValue]
}

const createEffect = (fn) => {
    Listener = fn

    fn()

    Listener = undefined
}

export {
    createSignal,
    createEffect,
}
