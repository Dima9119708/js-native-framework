import {$CREATE_SIGNAL, $WATCH_SIGNAL} from "../constant.js";
import { createSubject } from "../subject.js";
import { updateNode } from "../core.js";

export function signal() {
    return {
        [$CREATE_SIGNAL]: true,
        context: () => this,
        value: this.value,
    }
}

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


export function watchSignalUpdateNode(node) {
    let prevValue = this.value

    this.$signalSubscriber.subscribe((currentValue) => {
        updateNode(node, currentValue, prevValue)
        prevValue = currentValue
    })

    updateNode(node, this.value, undefined)
}

export function watchSignalChild(signal, fn) {
    let prevValue = signal.value
    const context = signal.context()

    const watch = (node) => {
        context.$signalSubscriber.subscribe((currentValue) => {
            const actualValue = fn(currentValue)

            updateNode(node, actualValue, prevValue)

            prevValue = actualValue
        })
    }

    const init = (node) => {
        watch(node)

        const initialValue = fn(prevValue)

        updateNode(node, initialValue, prevValue)
    }

    return {
        [$WATCH_SIGNAL]: true,
        init,
    }
}