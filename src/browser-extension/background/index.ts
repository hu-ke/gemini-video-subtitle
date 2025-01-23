/* eslint-disable no-case-declarations */
import browser from 'webextension-polyfill'

browser.contextMenus?.create(
    {
        id: 'gemini-video-substitle',
        type: 'normal',
        title: 'Gemini Video Subtitle',
        contexts: ['page'],
    },
    () => {
        browser.runtime.lastError
    }
)

browser.contextMenus?.onClicked.addListener(async function (info) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    tab.id &&
        browser.tabs.sendMessage(tab.id, {
            type: 'gemini-video-substitle',
            info,
        })
})

browser.commands.onCommand.addListener(async (command) => {
    switch (command) {
        case 'open-popup': {
            await browser.windows.create({
                type: 'popup',
                url: '/popup/index.html',
            })
        }
    }
})
