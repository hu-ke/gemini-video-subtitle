import { useEffect, useState, useRef, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { BaseProvider } from 'baseui-sd'
import { Provider as StyletronProvider } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { IThemedStyleProps } from '../common/types'
import { useTheme } from '../utils/hooks/useTheme'
import { RxCross2 } from 'react-icons/rx'
import LogoWithText from '../common/components/LogoWithText'
import { Tooltip } from '../common/components/Tooltip'
import { AudioRecorder } from './lib/audio-recorder'
import { useLiveAPIContext } from './contexts/LiveAPIContext'
import { useLoggerStore } from './lib/store-logger'
import { getLargestVideo } from './utils'
import { BiCollapseVertical, BiExpandVertical } from "react-icons/bi";

const useStyles = createUseStyles({
    container: ({ theme }: IThemedStyleProps) => ({
        background: theme.colors.backgroundPrimary,
        boxShadow: '10px 10px 8px rgba(0,0,0,.3)',
        borderRadius: '4px',
        border: '1px solid #ccc',
        display: 'flex',
        padding: '8px 16px 4px 16px',
        cursor: 'move',
        justifyContent: 'space-between',
        justifyItems: 'center'
    }),
    statusConnected: ({ theme }: IThemedStyleProps) => ({
        color: theme.colors.positive700,
    }),
    statusDisconnected: ({ theme }: IThemedStyleProps) => ({
        color: theme.colors.negative700,
    }),
    actionsIconContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    actionIcon: {
        cursor: 'pointer'
    },
    closeIconContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        cursor: 'pointer',
    },
})

type TitleBarProps = {
    pinned?: boolean
    engine: Styletron
    onClose: () => void
}

export default function TitleBar({ onClose, engine }: TitleBarProps) {
    const { theme, themeType } = useTheme()
    const mediaElement = useRef<HTMLVideoElement | null>(null)
    const [audioRecorder] = useState(() => new AudioRecorder());
    const { client, connected, connect, config } = useLiveAPIContext();
    const { log, logs } = useLoggerStore()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const styles = useStyles({ theme, themeType })

    useEffect(() => {
        const onData = (base64: string) => {
          client.sendRealtimeInput([
            {
              mimeType: "audio/pcm;rate=16000",
              data: base64,
            },
          ]);
        };
        if (connected && audioRecorder && mediaElement.current) {
          audioRecorder.on("data", onData).start(mediaElement.current);
        } else {
          audioRecorder.stop();
        }
        return () => {
          audioRecorder.off("data", onData);
        };
    }, [connected, client, audioRecorder, mediaElement.current]);

    useEffect(() => {
        const allVideos = document.querySelectorAll('video') || null;
        if (!allVideos) return;
        mediaElement.current = getLargestVideo(allVideos)
    }, [])

    useEffect(() => {
        if (connect && config) {
            connect()
        }
    }, [connect, config])

    // listen for log events and store them
    useEffect(() => {
        client.on("log", log);
        return () => {
            client.off("log", log);
        };
    }, [client, log]);

    const onCollapse = () => {
        setIsCollapsed(true)
    }
    const onExpand = () => {
        setIsCollapsed(false)
    }

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
            {
                isCollapsed ? (
                    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Tooltip content={'Expand'} placement='bottom' onMouseEnterDelay={1000}>
                            <div
                                className={styles.actionIcon}
                                style={{background: 'rgba(0, 0, 0, 0.1)'}}
                                onClick={onExpand}
                                data-testid='titlebar-expand-btn'
                            >
                                <BiExpandVertical size={20} />
                            </div>
                        </Tooltip>
                    </div>
                ) : (
                    <div data-tauri-drag-region className={styles.container} style={{visibility: isCollapsed ? 'hidden' : 'visible'}}>
                        <LogoWithText />
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            Status: {connected ? <span className={styles.statusConnected}>connected</span> : <span className={styles.statusDisconnected}>disconnected</span>}
                        </div>
                        <div className={styles.actionsIconContainer}>
                            <Tooltip content={'Collapse'} placement='bottom' onMouseEnterDelay={1000}>
                                <div
                                    className={styles.actionIcon}
                                    onClick={onCollapse}
                                    data-testid='titlebar-collapse-btn'
                                >
                                    <BiCollapseVertical size={16} />
                                </div>
                            </Tooltip>
                            <Tooltip content={'Close'} placement='bottom' onMouseEnterDelay={1000}>
                                <div
                                    className={styles.actionIcon}
                                    onClick={onClose}
                                    data-testid='titlebar-close-btn'
                                >
                                    <RxCross2 size={16} />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                )
            }
            </BaseProvider>
        </StyletronProvider>
    )
}
