import '../enable-dev-hmr'
import * as utils from '../common/utils'
import React from 'react'
import { popupCardID, popupCardOffset } from './consts'
import { getContainer, queryPopupCardElement } from './utils'
import { create } from 'jss'
import preset from 'jss-preset-default'
import { JssProvider, createGenerateId } from 'react-jss'
import { Client as Styletron } from 'styletron-engine-atomic'
import { createRoot, Root } from 'react-dom/client'
import { PREFIX } from '@/browser-extension/utils/constants'
import { GlobalSuspense } from '@/browser-extension/common/components/GlobalSuspense'
import { type ReferenceElement } from '@floating-ui/dom'
import InnerContainer from './InnerContainer'
import TitleBar from './TitleBar'
import SubtitleSection from './components/SubtitleSection'
import { LiveAPIProvider } from './contexts/LiveAPIContext'

let root: Root | null = null
const generateId = createGenerateId()

async function hidePopupCard() {
    // const $popupCard: HTMLDivElement | null = await queryPopupCardElement()
    // if (!$popupCard) {
    //     return
    // }
    // $popupCard.style.visibility = 'hidden'
}

async function createPopupCard() {
    const $popupCard = document.createElement('div')
    $popupCard.id = popupCardID
    const $container = await getContainer()
    $container.shadowRoot?.querySelector('div')?.appendChild($popupCard)
    if ($container.shadowRoot) {
        const shadowRoot = $container.shadowRoot
        if (import.meta.hot) {
            const { addViteStyleTarget } = await import('@samrum/vite-plugin-web-extension/client')
            await addViteStyleTarget(shadowRoot)
        } else {
            const browser = await utils.getBrowser()
            import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS?.forEach((cssPath) => {
                const styleEl = document.createElement('link')
                styleEl.setAttribute('rel', 'stylesheet')
                styleEl.setAttribute('href', browser.runtime.getURL(cssPath))
                shadowRoot.appendChild(styleEl)
            })
        }7
    }
    return $popupCard
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

async function showPopupCard(reference: ReferenceElement) {
    const settings = await utils.getSettings()
    let $popupCard = await queryPopupCardElement()
    if ($popupCard) {
        $popupCard.style.visibility = 'visible'
        return
    } else {
        $popupCard = await createPopupCard()
    }
   
    const apiKey = await utils.getApiKey()

    const engine = new Styletron({
        container: $popupCard.parentElement ?? undefined,
        prefix: `${PREFIX}-styletron-`,
    })
    const jss = create().setup({
        ...preset(),
        insertionPoint: $popupCard.parentElement ?? undefined,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).__IS_OT_BROWSER_EXTENSION_CONTENT_SCRIPT__ = true
    const JSS = JssProvider
    root = createRoot($popupCard)
    root.render(
        <React.StrictMode>
            <GlobalSuspense>
                <JSS jss={jss} generateId={generateId} classNamePrefix='__huke-gemini-translator-jss-'>
                    <InnerContainer reference={reference}>
                        <LiveAPIProvider url={uri} apiKey={apiKey}>
                            <TitleBar 
                                pinned={settings.pinned} 
                                onClose={hidePopupCard} 
                                engine={engine}
                            />
                            <SubtitleSection engine={engine}/>
                        </LiveAPIProvider>
                    </InnerContainer>
                </JSS>
            </GlobalSuspense>
        </React.StrictMode>
    )
}

async function main() {
    const browser = await utils.getBrowser()

    browser.runtime.onMessage.addListener(function (request) {
        if (request.type === 'gemini-video-substitle') {
            if (window !== window.top) return
            const x = window.innerWidth / 2
            const y = window.innerHeight / 2
            showPopupCard({ getBoundingClientRect: () => new DOMRect(x, y, popupCardOffset, popupCardOffset) })
        }
    })

}


main()
