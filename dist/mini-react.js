"use strict";
function createElement(type, props, ...children) {
    return {
        type,
        props: Object.assign(Object.assign({}, props), { children: children.map((child) => {
                const isTextNode = typeof child === 'string' || typeof child === 'number';
                return isTextNode ? createTextNode(child) : child;
            }) })
    };
}

function createTextNode(nodeValue) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue,
            children: []
        }
    };
}
const MiniReact = {
    createElement
};

window.miniReact = MiniReact;
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;

function render() {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
}
function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}