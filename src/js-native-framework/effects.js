import { signal } from "./core.js";
import { createSubject } from "./subject.js";

export const createSignal = (initial) => {
    const $signalSubscriber = createSubject()

    const context = {
        value: initial,
        $signalSubscriber,
    }

    const setValue = (newValue) => {
        context.value = newValue
        $signalSubscriber.setState(newValue)
    }

    return [signal.bind(context), setValue]
}

export const createEffect = (callback, deps) => {
    const values = []

    deps.forEach((dep, idx) => {
        const context = dep.context()

        values.push(context.value)

        context.$signalSubscriber.subscribe((newValue) => {
            values[idx] = newValue
            callback(values)
        })
    })

    callback(values)
}
