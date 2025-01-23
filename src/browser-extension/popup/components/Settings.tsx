import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui-sd'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../common/components/ErrorFallback'
import { InnerSettings } from './InnerSettings'
import { useTheme } from '../../utils/hooks/useTheme'
import 'katex/dist/katex.min.css'
import _ from 'underscore'
import { GlobalSuspense } from '../../common/components/GlobalSuspense'

export interface IInnerSettingsProps {
}

export interface ISettingsProps extends IInnerSettingsProps {
    engine: Styletron
}

export function Settings(props: ISettingsProps) {
    const { theme } = useTheme()

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div>
                <StyletronProvider value={props.engine}>
                    <BaseProvider theme={theme}>
                        <GlobalSuspense>
                            <InnerSettings />
                        </GlobalSuspense>
                    </BaseProvider>
                </StyletronProvider>
            </div>
        </ErrorBoundary>
    )
}
