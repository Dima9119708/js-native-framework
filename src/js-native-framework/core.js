import {createEffect} from "./effects.js";
import { isFunction, isObject, isPlainObject, isPrimitive, isString, isUndefined } from "./utils/base.js";

function isPropsEvent(prop, dom) {
    const regex = /^(?=.*on)[A-Z]/i;
    const lowerCaseProp = prop.toLowerCase()

    if (!isUndefined(dom[lowerCaseProp]) && regex.test(prop)) {
        return true
    }

    return false
}

function applyEvent(prop, fn, dom) {
    const eventName = prop.replace(/^on/i, '').replace(/^[A-Z]/, match => match.toLowerCase());
    dom.addEventListener(eventName, fn)
}

function applyProps(props, dom) {
    for (const prop in props) {
        if (isPropsEvent(prop, dom)) {
            applyEvent(prop, props[prop], dom)
            continue
        }

        if (!isUndefined(dom[prop])) {
            dom[prop] = props[prop]
        }
    }
}

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

        if (isObject(element.props)) {
            applyProps(element.props, domElement)
        }

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

