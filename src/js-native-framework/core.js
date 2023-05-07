import {$CREATE_SIGNAL, $WATCH_SIGNAL} from "./constant.js";
import {watchSignalUpdateNode} from "./signal/index.js";

export function updateNode(node, value, prevValue) {
    if (typeof prevValue !== 'object' && typeof value === 'object') {
        node.innerText = ''
        createNodes(value, node)
    }

    if (typeof value === 'string' && value !== prevValue) {
        node.innerText = ''
        node.innerText = value
    }
}

// export function createNodes(comp, dom, nodes) {
//     for (const [idx, symbol] of Object.entries(Object.getOwnPropertySymbols(comp)) ) {
//         const element = comp[symbol]
//
//         const domElement = document.createElement(symbol.description)
//
//         if (typeof element === 'function') {
//             element(dom, idx)
//             continue
//         }
//
//         if (typeof element.onClick === 'function') {
//             domElement.addEventListener('click', element.onClick)
//         }
//
//         if (typeof element.onChange === 'function') {
//             domElement.addEventListener('input', element.onChange)
//         }
//
//         if (typeof element.className === 'string') {
//             domElement.className = element.className
//         }
//
//
//         if (element.children?.[$CREATE_SIGNAL]) {
//             watchSignalUpdateNode.call(element.children.context(), domElement)
//         }
//
//         if (element.children?.[$WATCH_SIGNAL]) {
//             element.children.init(domElement)
//         }
//
//         if (typeof element.children === 'string') {
//             domElement.innerText = element.children
//         } else if (element.children && !element.children?.[$CREATE_SIGNAL] && !element.children?.[$WATCH_SIGNAL]) {
//             createNodes(element.children, domElement, nodes)
//         }
//
//         nodes.push(domElement)
//     }
//
//     // return nodes
// }



export function createNodes(comp, dom) {
    const nodes = []

    for (const [idx, symbol] of Object.entries(Object.getOwnPropertySymbols(comp)) ) {
        const element = comp[symbol]

        const domElement = document.createElement(symbol.description)

        if (typeof element === 'function') {
            element(dom, idx)
            continue
        }

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
            watchSignalUpdateNode.call(element.children.context(), domElement)
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
    }

    dom.append(...nodes)

    return dom
}

