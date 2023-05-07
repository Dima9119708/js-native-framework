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
