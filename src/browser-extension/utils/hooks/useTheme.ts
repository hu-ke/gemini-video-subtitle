import { BaseThemeType } from '@/browser-extension/common/types'
import { LightTheme } from 'baseui-sd/themes'

export const useTheme = () => {
    const theme = LightTheme
    return { theme, themeType: 'light' as BaseThemeType }
}
