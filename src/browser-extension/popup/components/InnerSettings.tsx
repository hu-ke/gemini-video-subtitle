import { useCallback, useEffect, useMemo, useState } from 'react'
import _ from 'underscore'
import icon from '@/assets/images/icon-large.png'
import toast, { Toaster } from 'react-hot-toast'
import * as utils from '../../common/utils'
import { Input } from 'baseui-sd/input'
import { createForm } from '../../common/components/Form'
import { Button } from 'baseui-sd/button'
import { ISettings } from '../../common/types'
import { useTheme } from '../../utils/hooks/useTheme'
import { useTranslation } from 'react-i18next'
import AppConfig from '../../../../package.json'
import { useSettings } from '../../common/hooks/useSettings'
import { IoIosSave } from 'react-icons/io'
import { useThemeType } from '../../common/hooks/useThemeType'
import { Select, Option } from 'baseui-sd/select'
import { defaultSourceLangId, defaultTargetLangId, langOptions } from '../../utils/config'
import { FaGithub } from "react-icons/fa";

const linkStyle = {
    color: 'inherit',
    opacity: 0.8,
    cursor: 'pointer',
    outline: 'none',
}

const { Form, FormItem, useForm } = createForm<ISettings>()

interface IInnerSettingsProps {
    showFooter?: boolean
    onSave?: (oldSettings: ISettings) => void
    headerPromotionID?: string
    openaiAPIKeyPromotionID?: string
}

interface ILangSelectorProps {
    value?: string
    onChange?: (value: string) => void
    onBlur?: () => void
    options: Option[]
}

function LangSelector({value, onChange, options}: ILangSelectorProps) {
    return (
        <Select
            size='mini'
            clearable={false}
            options={options}
            value={
                value
                    ? [
                          {
                              id: value,
                              label: options.find((option) => option.id === value)?.label || 'en',
                          },
                      ]
                    : undefined
            }
            onChange={(params) => {
                onChange?.(params.value[0].id as string)
            }}
        />
    )
}

export function InnerSettings({
    onSave,
}: IInnerSettingsProps) {
    const { theme } = useTheme()

    const { refreshThemeType } = useThemeType()

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)
    const { settings, setSettings } = useSettings()
    const [values, setValues] = useState<ISettings>(settings)
    const [prevValues, setPrevValues] = useState<ISettings>(values)
    const [sourceLangId, setSourceLangId] = useState(defaultSourceLangId)
    const [targetLangId, setTargetLangId] = useState(defaultTargetLangId)

    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue(values)
    }, [form, values])

    useEffect(() => {
        if (settings) {
            ;(async () => {
                setValues(settings)
                setPrevValues(settings)
            })()
        }
    }, [settings])

    const onChange = useCallback((_changes: Partial<ISettings>, values_: ISettings) => {
        setValues(values_)
    }, [])

    const onSubmit = useCallback(
        async (data: ISettings) => {
            setLoading(true)
            const oldSettings = await utils.getSettings()
            await utils.setSettings(data)
            toast(t('Saved'), {
                icon: '👍',
                duration: 3000,
            })
            setLoading(false)
            setSettings(data)
            onSave?.(oldSettings)
        },
        [onSave, setSettings, refreshThemeType, t]
    )

    const onBlur = useCallback(async () => {
        if (values.apiKeys && !_.isEqual(values, prevValues)) {
            await utils.setSettings(values)
            setPrevValues(values)
        }
    }, [prevValues, values])

    const [isScrolled, setIsScrolled] = useState(window.scrollY > 0)

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    const sourceLangOptions = useMemo(() => {
        return langOptions.map(lang => {
            return {
                ...lang,
                disabled: lang.id === targetLangId
            }
        })
    }, [targetLangId])

    const targetLangOptions = useMemo(() => {
        return langOptions.map(lang => {
            return {
                ...lang,
                disabled: lang.id === sourceLangId
            }
        })
    }, [sourceLangId])

    return (
        <div
            style={{
                paddingTop: '86px',
                paddingBottom: '32px',
                background: theme.colors.backgroundPrimary,
                minWidth: 400,
                maxHeight: utils.isUserscript() ? 'calc(100vh - 32px)' : undefined,
                overflow: utils.isUserscript() ? 'auto' : undefined,
            }}
            data-testid='settings-container'
        >
            <nav
                style={{
                    position: utils.isBrowserExtensionOptions() ? 'sticky' : 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 999,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(90deg, #076eff 50%, #4fabff, #ac87eb, #ee4d5d)',
                    boxSizing: 'border-box',
                    boxShadow: isScrolled ? theme.lighting.shadow600 : undefined,
                }}
                data-tauri-drag-region
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#fff',
                        gap: 10,
                        padding: '15px 25px 0 25px',
                    }}
                >
                    <img width='22' src={utils.getAssetUrl(icon)} alt='logo' />
                    <h2
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        Gemini Video Subtitle
                        {AppConfig?.version ? (
                            <span>{AppConfig.version}</span>
                        ) : null}
                    </h2>
                    <div
                        style={{
                            flexGrow: 1,
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: '16px'
                    }}>
                        <FaGithub size={40}/>
                        <a style={{color: '#fff'}} href='https://github.com/hu-ke/gemini-video-subtitle' target='_blank'>gemini-video-subtitle</a>
                    </div>
                </div>
                <div style={{padding: '16px'}}></div>
            </nav>
            <Form
                autoComplete='off'
                autoCapitalize='off'
                form={form}
                style={{
                    padding: '20px 25px',
                    paddingBottom: utils.isBrowserExtensionOptions() ? 0 : undefined,
                }}
                onFinish={onSubmit}
                initialValues={values}
                onValuesChange={onChange}
            >
                <div>
                    <div
                        style={{
                            display: 'block',
                        }}
                    >
                        <div
                            style={{
                                display: 'block',
                            }}
                        >
                            <FormItem
                                required={true}
                                name='apiKeys'
                                label={t('API Key')}
                                caption={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 3,
                                        }}
                                    >
                                        <div>
                                            {t('Go to the')}{' '}
                                            <a
                                                target='_blank'
                                                href='https://aistudio.google.com/apikey'
                                                rel='noreferrer'
                                                style={linkStyle}
                                            >
                                                {t('Gemini page')}
                                            </a>{' '}
                                            {t(
                                                'to get your API Key. You can separate multiple API Keys with English commas to achieve quota doubling and load balancing.'
                                            )}
                                        </div>
                                    </div>
                                }
                            >
                                <Input
                                    type='password'
                                    size='compact'
                                    name='apiKey'
                                    onBlur={onBlur}
                                />
                            </FormItem>
                            <FormItem
                                required={true}
                                name='sourceLangId'
                                label={t('Video Source Language')}
                            >
                                <LangSelector options={sourceLangOptions} />
                            </FormItem>
                            <FormItem
                                required={true}
                                name='targetLangId'
                                label={t('Translate to')}
                            >
                                <LangSelector options={targetLangOptions} />
                            </FormItem>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: utils.isBrowserExtensionOptions() ? 'sticky' : 'fixed',
                        bottom: '7px',
                        right: '25px',
                        paddingBottom: utils.isBrowserExtensionOptions() ? '10px' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        zIndex: 1000,
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            marginRight: 'auto',
                        }}
                    />
                    <Button isLoading={loading} size='mini' startEnhancer={<IoIosSave size={12} />}>
                        {t('Save')}
                    </Button>
                </div>
                <Toaster />
            </Form>
        </div>
    )
}
