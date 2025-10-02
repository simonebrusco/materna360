export const IS_DEV = process.env.NODE_ENV !== 'production';
export const ENABLE_FULLSTORY = !IS_DEV && process.env.NEXT_PUBLIC_ENABLE_FULLSTORY !== 'false';
