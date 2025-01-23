import { StatefulTooltip, StatefulTooltipProps } from 'baseui-sd/tooltip'
import React from 'react'

interface ITooltipProps extends StatefulTooltipProps {
    content: string
}

const Tooltip = ({ content, children, ...props }: ITooltipProps) => {
    return (
        <StatefulTooltip
            content={<span style={{ pointerEvents: 'none', userSelect: 'none' }}>{content}</span>}
            accessibilityType={'tooltip'}
            showArrow
            {...props}
        >
            {children}
        </StatefulTooltip>
    )
}

export { Tooltip }
