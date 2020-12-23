export type UuidGetter = () => string;

// eslint-disable-next-line no-bitwise
export const uuid: UuidGetter = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;
