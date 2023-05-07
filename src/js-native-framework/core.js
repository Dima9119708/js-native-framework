import {$CREATE_SIGNAL, $WATCH_SIGNAL} from "./constant.js";

function needUpdateNode(node, value, prevValue) {
    if (typeof prevValue !== 'object' && typeof value === 'object') {
        node.innerText = ''
        createNodes(value, node)
    }

    if (typeof value === 'string' && value !== prevValue) {
        node.innerText = ''
        node.innerText = value
    }
}

export function updateNode(node) {
    let prevValue = this.value

    this.$signalSubscriber.subscribe((currentValue) => {
        needUpdateNode(node, currentValue, prevValue)
        prevValue = currentValue
    })
}

export function createNodes (comp, dom) {
    const nodes = []

    Object.getOwnPropertySymbols(comp).forEach(symbol => {
        const element = comp[symbol]

        const domElement = document.createElement(symbol.description)


        if (typeof element.onClick === 'function') {
            domElement.addEventListener('click', element.onClick)
        }

        if (typeof element.onChange === 'function') {
            domElement.addEventListener('input', element.onChange)
        }

        if (typeof element.className === 'string') {
            domElement.className = element.className
        }


        if (element.children?.[$CREATE_SIGNAL]) {
            domElement.innerText = element.children.value
            updateNode.call(element.children.context(), domElement)
        }

        if (element.children?.[$WATCH_SIGNAL]) {
            element.children.init(domElement)
        }

        if (typeof element.children === 'string') {
            domElement.innerText = element.children
        } else if (element.children && !element.children?.[$CREATE_SIGNAL] && !element.children?.[$WATCH_SIGNAL]) {
            createNodes(element.children, domElement)
        }

        nodes.push(domElement)
    })

    dom.append(...nodes)
}

export function signal() {
    return {
        [$CREATE_SIGNAL]: true,
        context: () => this,
        value: this.value,
    }
}

export function watchSignal(signal, fn) {
    let prevValue = signal.value
    const context = signal.context()

    const watch = (node) => {
        context.$signalSubscriber.subscribe((currentValue) => {
            const actualValue = fn(currentValue)

            needUpdateNode(node, actualValue, prevValue)

            prevValue = actualValue
        })
    }

    const init = (node) => {
        watch(node)

        const initialValue = fn(prevValue)

        needUpdateNode(node, initialValue, prevValue)
    }

    return {
        [$WATCH_SIGNAL]: true,
        init,
    }
}
