export const isFunction = (value) => typeof value === 'function'

export const isString = (value) => typeof value === 'string'

export const isUndefined = (value) => value === undefined;

export const isNullOrUndefined = (value) => value === null || value === undefined;

export const isObjectType = (value) => typeof value === 'object';

export const isDateObject = (value) => value instanceof Date;

export const isObject = (value) => (
    !isNullOrUndefined(value) &&
    !Array.isArray(value) &&
    isObjectType(value) &&
    !isDateObject(value)
)

export const isPlainObject = (tempObject) => {
    const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;

    return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf')
};

export const isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value)
