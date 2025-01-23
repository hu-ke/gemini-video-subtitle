/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBrowser, ISettings } from './types'

import { defaultSourceLangId, defaultTargetLangId } from '../utils/config'

export async function getApiKey(): Promise<string> {
    const settings = await getSettings()
    const apiKeys = (settings.apiKeys ?? '').split(',').map((s) => s.trim())
    return apiKeys[Math.floor(Math.random() * apiKeys.length)] ?? ''
}

// In order to let the type system remind you that all keys have been passed to browser.storage.sync.get(keys)
const settingKeys: Record<keyof ISettings, number> = {
    apiKeys: 1,
    sourceLangId: 0,
    targetLangId: 0,
    themeType: 0
}

export async function getSettings(): Promise<ISettings> {
    const browser = await getBrowser()
    const items = await browser.storage.sync.get(Object.keys(settingKeys))

    const settings = items as ISettings
    if (!settings.sourceLangId) {
        settings.sourceLangId = defaultSourceLangId
    }
    if (!settings.themeType) {
        settings.themeType = 'followTheSystem'
    }
    if (!settings.targetLangId) {
        settings.targetLangId = defaultTargetLangId
    }
    if (!settings.apiKeys) {
        settings.apiKeys = ''
    }
    return settings
}

export async function setSettings(settings: Partial<ISettings>) {
    const browser = await getBrowser()
    await browser.storage.sync.set(settings)
}

export async function getBrowser(): Promise<IBrowser> {
    return (await import('webextension-polyfill')).default
}



export const isBrowserExtensionOptions = () => {
    if (typeof window === 'undefined') {
        return false
    }
    return window['__IS_OT_BROWSER_EXTENSION_OPTIONS__' as any] !== undefined
}

export const isBrowserExtensionContentScript = () => {
    if (typeof window === 'undefined') {
        return false
    }
    return window['__IS_OT_BROWSER_EXTENSION_CONTENT_SCRIPT__' as any] !== undefined
}


export const isUserscript = () => {
    // eslint-disable-next-line camelcase
    return typeof GM_info !== 'undefined'
}

export const isFirefox = () => /firefox/i.test(navigator.userAgent)

export function getAssetUrl(asset: string) {
    if (isUserscript()) {
        return asset
    }
    return new URL(asset, import.meta.url).href
}