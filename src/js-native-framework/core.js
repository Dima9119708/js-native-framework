import {$CREATE_SIGNAL} from "./constant.js";

export const createSubject = () => {
    const state = new Set();

    const setState = (...args) => {
        state.forEach(fn => {
            fn(...args)
        })
    };

    const subscribe = (fn) => {
        state.add(fn);
    };

    const clear = () => {
        state.clear();
    };

    const api = { setState, subscribe, clear };

    return api;
};

export function updateNode(node) {
    let scopeValue = this.value

    this.$signalSubscriber.subscribe((currentValue) => {
        if (typeof scopeValue !== 'object' && typeof currentValue === 'object') {
            createNodes(currentValue, node)
        }

        if (typeof currentValue === 'string' && currentValue !== scopeValue) {
            node.innerText = currentValue
        }

        scopeValue = currentValue
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

        if (typeof element.children === 'string') {
            domElement.innerText = element.children
        } else if (element.children && !element.children?.[$CREATE_SIGNAL]) {
            createNodes(element.children, domElement)
        }

        nodes.push(domElement)
    })

    dom.append(...nodes)
}

export function signalImpl() {
    return {
        [$CREATE_SIGNAL]: true,
        context: () => this,
        value: this.value,
    }
}
