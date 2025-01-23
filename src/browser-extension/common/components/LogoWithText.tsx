import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { IThemedStyleProps } from '../types'
import { useTheme } from '../../utils/hooks/useTheme'
import { getAssetUrl } from '../utils'
import icon from '@/assets/images/icon.png'

const useStyles = createUseStyles({
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
    },
    icon: {
        'display': 'block',
        'width': '16px',
        'height': '16px',
        '-ms-user-select': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none',
        'pointerEvents': 'none',
    },
    iconText: (props: IThemedStyleProps) => ({
        position: 'relative',
        display: 'inline-block',
        color: 'transparent',
        background: 'linear-gradient(74deg, #4285f4 0, #9b72cb 9%, #d96570 20%, #d96570 24%, #9b72cb 35%, #4285f4 44%, #9b72cb 44% 50%, #d96570 56%, #fff 75%, #fff 100%)',
        backgroundSize: '400% 100%',
        backgroundClip: 'text',
        fillColor: 'transparent'
    }),
})

export type LogoWithTextRef = {
    hideText: () => void
    showText: () => void
}

const LogoWithText = forwardRef<LogoWithTextRef, unknown>(function LogoWithText(_props, ref) {
    const { theme, themeType } = useTheme()
    const styles = useStyles({ theme, themeType })

    return (
        <div className={styles.iconContainer}>
            <img data-tauri-drag-region className={styles.icon} src={getAssetUrl(icon)} />
            <span className={styles.iconText}>Gemini Video Subtitle</span>
        </div>
    )
})

export default LogoWithText
