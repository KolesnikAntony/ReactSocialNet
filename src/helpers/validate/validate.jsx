export const required = value => {
    if (value) return undefined;
    return "Required field"
};

export const maxLength = maxLength => value => {
    if (value.length < maxLength ) return undefined;
    return `Max length is ${maxLength}`
};