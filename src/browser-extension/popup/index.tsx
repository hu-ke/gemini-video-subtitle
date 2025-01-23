import '../enable-dev-hmr'
import { createRoot } from 'react-dom/client'
import { Settings } from './components/Settings'
import { Client as Styletron } from 'styletron-engine-atomic'
import './index.css'
import { PREFIX } from '../utils/constants'
import { useTheme } from '../utils/hooks/useTheme'

const engine = new Styletron({
    prefix: `${PREFIX}-styletron-`,
})

const root = createRoot(document.getElementById('root') as HTMLElement)

function App() {
    const { theme } = useTheme()

    return (
        <div
            style={{
                position: 'relative',
                height: '100%',
                background: theme.colors.backgroundPrimary,
            }}
            data-testid='popup-container'
        >
            <Settings engine={engine} />
        </div>
    )
}

root.render(<App />)
