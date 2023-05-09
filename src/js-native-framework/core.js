import {createEffect} from "./effects.js";
import {isFunction, isPlainObject, isPrimitive, isString} from "./utils/base.js";

export function createNodes(comp, dom) {
    const nodes = []

    if (Array.isArray(comp)) {
        const structuredObject = comp.reduce((acc, element) => {
            const children = isFunction(element)
                ? { [Symbol('Fragment')]: { children: element }  }
                : element


            Object.assign(acc, children)

            return acc
        }, {})

        createNodes(structuredObject, dom)

        return
    }

    for (const [idx, symbol] of Object.entries(Object.getOwnPropertySymbols(comp))) {
        const element = comp[symbol]

        const children = isFunction(element.children)
            ? element.children()
            : element.children

        const domElement = symbol.description === 'Fragment'
            ? document.createDocumentFragment()
            : document.createElement(symbol.description)

        if (isFunction(element.children)) {
            createEffect((info) => {
                const value = element.children()

                if (info.type === 'mount') return

                if (typeof value === 'object') {
                    const newNode = createNodes(value, document.createDocumentFragment())
                    dom.replaceChild(newNode, dom.childNodes[idx])
                } else {
                    domElement.replaceChildren(value)
                    dom.replaceChild(domElement, dom.childNodes[idx])
                }
            })
        }

        if (isFunction(element.onClick)) {
            domElement.addEventListener('click', element.onClick)
        }

        if (isFunction(element.onChange)) {
            domElement.addEventListener('input', element.onChange)
        }

        if (isString(element.className)) {
            domElement.className = element.className
        }

        if (isPrimitive(children)) {
            if (!domElement.innerText) {
                domElement.append(children)
            } else {
                domElement.innerText = children
            }
        }

        if (isPlainObject(children)) {
            createNodes(children, domElement)
        }

        nodes.push(domElement)
    }

    dom.append(...nodes)

    return dom
}

