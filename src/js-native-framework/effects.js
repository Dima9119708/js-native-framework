import { createSubject, signalImpl } from "./core.js";

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

    return [signalImpl.bind(context), setValue]
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
