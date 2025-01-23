/* eslint-disable camelcase */
import { version } from '../../package.json'

export function getManifest(browser: 'chromium') {
    const manifest: chrome.runtime.Manifest = {
        manifest_version: 3,

        name: 'Gemini Video Subtitle',
        description: `Gemini-Video-Subtitle is a browser extension that uses Gemini Multi-Modal for generating video subtitles.`,
        version: version,

        icons: {
            '16': 'icon.png',
            '32': 'icon.png',
            '48': 'icon.png',
            '128': 'icon.png',
        },

        options_ui: {
            page: 'src/browser-extension/options/index.html',
            open_in_tab: true,
        },

        action: {
            default_icon: 'icon.png',
            default_popup: 'src/browser-extension/popup/index.html',
        },

        content_scripts: [
            {
                matches: ['<all_urls>'],
                all_frames: true,
                match_about_blank: true,
                js: ['src/browser-extension/content_script/index.tsx'],
            },
        ],

        background: {
            service_worker: 'src/browser-extension/background/index.ts',
        },

        permissions: ['storage', 'contextMenus', 'webRequest'],

        commands: {
            'open-popup': {
                suggested_key: {
                    default: 'Ctrl+Shift+Y',
                    mac: 'Command+Shift+Y',
                },
                description: 'Open the popup',
            },
        },

        host_permissions: [
        ],
    }

    return manifest
}
