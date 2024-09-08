import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {InfoBoxBodyStyled, InfoBoxHeaderStyled, InfoBoxStyled} from './InfoBox.style';
import {H1} from '../elements/headers';

interface InfoBoxProps {
    title: string;
    subtitle?: string | ReactElement;
}

const InfoBox = ({title, subtitle, children}: PropsWithChildren<InfoBoxProps>): ReactElement => {
    const containerRef = React.createRef<HTMLDivElement>();
    const [containerHeight, setContainerHeight] = useState<string>();

    useEffect(() => {
        const container = containerRef.current;

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === container) {
                    const newHeight = entry.contentRect.height;
                    setContainerHeight(`${newHeight}px`);
                }
            });
        });

        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    }, [containerRef]);

    return (
        <InfoBoxStyled>
            <InfoBoxHeaderStyled>
                <H1> {title} </H1>
                <div> {subtitle} </div>
            </InfoBoxHeaderStyled>
            <InfoBoxBodyStyled $containerHeight={containerHeight}>
                <div ref={containerRef}>{children}</div>
            </InfoBoxBodyStyled>
        </InfoBoxStyled>
    );
};

export default InfoBox;
