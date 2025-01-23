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
    automaticCheckForUpdates: 1,
    apiKeys: 1,
    apiURL: 1,
    apiURLPath: 1,
    apiModel: 1,
    chatgptModel: 1,
    azureAPIKeys: 1,
    azureAPIURL: 1,
    azureAPIURLPath: 1,
    azureAPIModel: 1,
    azMaxWords: 1,
    enableMica: 1,
    enableBackgroundBlur: 1,
    miniMaxGroupID: 1,
    miniMaxAPIKey: 1,
    miniMaxAPIModel: 1,
    moonshotAPIKey: 1,
    moonshotAPIModel: 1,
    geminiAPIURL: 1,
    geminiAPIKey: 1,
    geminiAPIModel: 1,
    autoTranslate: 1,
    defaultTargetLanguage: 1,
    alwaysShowIcons: 1,
    hotkey: 1,
    displayWindowHotkey: 1,
    ocrHotkey: 1,
    writingTargetLanguage: 1,
    writingHotkey: 1,
    writingNewlineHotkey: 1,
    themeType: 1,
    i18n: 1,
    tts: 1,
    restorePreviousPosition: 1,
    runAtStartup: 1,
    selectInputElementsText: 1,
    readSelectedWordsFromInputElementsText: 1,
    disableCollectingStatistics: 1,
    allowUsingClipboardWhenSelectedTextNotAvailable: 1,
    pinned: 1,
    autoCollect: 1,
    hideTheIconInTheDock: 1,
    languageDetectionEngine: 1,
    autoHideWindowWhenOutOfFocus: 1,
    proxy: 1,
    customModelName: 1,
    ollamaAPIURL: 1,
    ollamaAPIModel: 1,
    ollamaCustomModelName: 1,
    ollamaModelLifetimeInMemory: 1,
    groqAPIURL: 1,
    groqAPIURLPath: 1,
    groqAPIModel: 1,
    groqAPIKey: 1,
    groqCustomModelName: 1,
    claudeAPIURL: 1,
    claudeAPIURLPath: 1,
    claudeAPIModel: 1,
    claudeAPIKey: 1,
    claudeCustomModelName: 1,
    kimiRefreshToken: 1,
    kimiAccessToken: 1,
    chatglmAccessToken: 1,
    chatglmRefreshToken: 1,
    cohereAPIKey: 1,
    cohereAPIModel: 1,
    deepSeekAPIKey: 1,
    deepSeekAPIModel: 1,
    fontSize: 1,
    uiFontSize: 1,
    iconSize: 1,
    noModelsAPISupport: 1,
    sourceLangId: 0,
    targetLangId: 0,
}

export async function getSettings(): Promise<ISettings> {
    const browser = await getBrowser()
    const items = await browser.storage.sync.get(Object.keys(settingKeys))

    const settings = items as ISettings
    if (!settings.sourceLangId) {
        settings.sourceLangId = defaultSourceLangId
    }
    if (!settings.targetLangId) {
        settings.targetLangId = defaultTargetLangId
    }
    if (!settings.apiKeys) {
        settings.apiKeys = ''
    }

    if (!settings.disableCollectingStatistics) {
        settings.disableCollectingStatistics = false
    }

    if (!settings.themeType) {
        settings.themeType = 'followTheSystem'
    }
    if (settings.automaticCheckForUpdates === undefined || settings.automaticCheckForUpdates === null) {
        settings.automaticCheckForUpdates = true
    }
    if (settings.enableBackgroundBlur === undefined || settings.enableBackgroundBlur === null) {
        if (settings.enableMica !== undefined && settings.enableMica !== null) {
            settings.enableBackgroundBlur = settings.enableMica
        } else {
            settings.enableBackgroundBlur = false
        }
    }
    if (!settings.languageDetectionEngine) {
        settings.languageDetectionEngine = 'baidu'
    }
    if (!settings.proxy) {
        settings.proxy = {
            enabled: false,
            protocol: 'HTTP',
            server: '127.0.0.1',
            port: '1080',
            basicAuth: {
                username: '',
                password: '',
            },
            noProxy: 'localhost,127.0.0.1',
        }
    }
    if (!settings.ollamaAPIURL) {
        settings.ollamaAPIURL = 'http://127.0.0.1:11434'
    }
    if (!settings.miniMaxAPIModel) {
        settings.miniMaxAPIModel = 'abab5.5-chat'
    }
    if (!settings.groqAPIURL) {
        settings.groqAPIURL = 'https://api.groq.com'
    }
    if (!settings.groqAPIURLPath) {
        settings.groqAPIURLPath = '/openai/v1/chat/completions'
    }
    if (!settings.claudeAPIURL) {
        settings.claudeAPIURL = 'https://api.anthropic.com'
    }
    if (!settings.claudeAPIURLPath) {
        settings.claudeAPIURLPath = '/v1/messages'
    }
    if (settings.fontSize === undefined || settings.fontSize === null) {
        settings.fontSize = 15
    }
    if (settings.uiFontSize === undefined || settings.uiFontSize === null) {
        settings.uiFontSize = 12
    }
    if (settings.iconSize === undefined || settings.iconSize === null) {
        settings.iconSize = 15
    }
    if (settings.azMaxWords === undefined || settings.azMaxWords === null) {
        settings.azMaxWords = 1024
    }
    if (settings.hideTheIconInTheDock === undefined || settings.hideTheIconInTheDock === null) {
        settings.hideTheIconInTheDock = true
    }
    if (settings.ollamaModelLifetimeInMemory === undefined || settings.ollamaModelLifetimeInMemory === null) {
        settings.ollamaModelLifetimeInMemory = '5m'
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

export const isDarkMode = async () => {
    const settings = await getSettings()
    if (settings.themeType === 'followTheSystem') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return settings.themeType === 'dark'
}

export const isFirefox = () => /firefox/i.test(navigator.userAgent)

export function getAssetUrl(asset: string) {
    if (isUserscript()) {
        return asset
    }
    return new URL(asset, import.meta.url).href
}