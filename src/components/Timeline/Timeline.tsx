import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Power1, gsap } from "gsap";
import { DateItem } from '../App/App';
import { useIsMobile } from '../../helpers/useIsMobile';

import './styles.scss';

interface TimelineProps {
  value: number;
  onChange: (newValue: number) => void;
  dates: DateItem[];
}

export const Timeline: FC<TimelineProps> = ({ value, onChange, dates }) => {
  const isMobile = useIsMobile();
  const [lastValue, setLastValue] = useState(value);
  const [degPoint, setDegPoint] = useState(0);
  const degStep = useMemo(() => 360 / dates.length, [dates]);

  const yearsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!yearsRef.current) return;
    gsap.from(yearsRef.current.children[0], {
      textContent: dates[lastValue].from,
      duration: 0.5,
      ease: Power1.easeIn,
      snap: { textContent: 1 },
      stagger: 1,
    });
    gsap.from(yearsRef.current.children[1], {
      textContent: dates[lastValue].to,
      duration: 0.5,
      ease: Power1.easeIn,
      snap: { textContent: 1 },
      stagger: 1,
    });
  }, [value])

  const select = useCallback((val: number) => () => onChange(val), [onChange]);

  useEffect(() => {
    setDegPoint(
      degPoint +
      (Math.abs(value - lastValue) > dates.length / 2 ?
        (Math.min(lastValue, value) + dates.length - Math.max(lastValue, value))
        : (lastValue - value))
      * degStep
      * (value - lastValue < -dates.length / 2 ? -1 : 1)
    );
    setLastValue(value);
  }, [value]);

  return <>
    <div className='Timeline'>
      <div className='Timeline-Ring'>
        <div ref={yearsRef} className='Timeline-Years'>
          <span className='Timeline-Year_left'>{dates[value].from}</span>
          <span className='Timeline-Year_right'>{dates[value].to}</span>
        </div>
        {
          !isMobile && dates.map((_, i) =>
            <button
              data-value={i + 1}
              data-selected={i === value}
              key={i}
              className='Timeline-Dot'
              onClick={select(i)}
              style={
                {
                  transform: `translate(-50%, -50%) rotate(${degPoint - degStep + degStep * i}deg) translateX(${530 / 2}px) rotate(${(degPoint - degStep + degStep * i) * -1}deg)`
                }
              }
            />)
        }
      </div>
      {!isMobile && <span className='Timeline-Text' key={value}>{dates[value].title}</span>}
    </div>
    {!isMobile && <div className='Timeline-VerticalLine'></div>}
    {!isMobile && <div className='Timeline-HorizontalLine'></div>}
  </>
}