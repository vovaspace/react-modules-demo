export type UuidGetter = () => string;

export const uuid: UuidGetter = () => `f${(~~(Math.random()*1e8)).toString(16)}`;
