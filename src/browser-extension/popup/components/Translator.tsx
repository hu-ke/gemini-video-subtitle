import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui-sd'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../common/components/ErrorFallback'
import { InnerSettings } from './Settings'
import { useTheme } from '../../utils/hooks/useTheme'
import 'katex/dist/katex.min.css'
import _ from 'underscore'
import { GlobalSuspense } from '../../common/components/GlobalSuspense'

export interface IInnerTranslatorProps {
}

export interface ITranslatorProps extends IInnerTranslatorProps {
    engine: Styletron
}

export function Translator(props: ITranslatorProps) {
    const { theme } = useTheme()

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div>
                <StyletronProvider value={props.engine}>
                    <BaseProvider theme={theme}>
                        <GlobalSuspense>
                            <InnerTranslator {...props} />
                        </GlobalSuspense>
                    </BaseProvider>
                </StyletronProvider>
            </div>
        </ErrorBoundary>
    )
}

function InnerTranslator(props: IInnerTranslatorProps) {
    const { theme } = useTheme()
    return (
        <div
            style={{
                background: theme.colors.backgroundPrimary,
                paddingBottom: '42px',
            }}
        >
            <InnerSettings />
        </div>
    )
}
