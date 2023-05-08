import { $CREATE_SIGNAL } from "./constant";
import { createSubject } from "./subject";

let Listener;

function readSignal() {
    if (Listener) {
        if (!this.observers) {
            this.observers = [Listener]
        } else {
            const updated = this.observers.filter(observer => observer.updatedAt > 0)

            if (!updated.length) {
                this.observers.push(Listener)
            }
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
            observer.updatedAt += 1
            observer.fn()
        })

        $signalSubscriber.setState(newValue)
    }

    return [readSignal.bind(context), setValue]
}

const createEffect = (fn) => {
    Listener = {
        fn,
        updatedAt: 0
    }
    fn()
}

export {
    createSignal,
    createEffect,
}
