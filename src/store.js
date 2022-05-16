import { writable, get, derived } from 'svelte/store';

export const VERSION = __BUILD_VERSION__
export const ENV = __ENV__;
export const WEBOS = navigator.userAgent.includes("WebAppManager");