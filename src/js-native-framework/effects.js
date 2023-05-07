import { createSignal } from "./signal/index";

const createEffect = (callback, deps) => {
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

export {
    createSignal,
    createEffect,
}
