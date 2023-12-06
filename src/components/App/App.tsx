import React, { FC, useCallback, useState } from 'react';
import { Timeline } from '../Timeline/Timeline';
import { leadingZero } from '../../helpers/leadingZero';
import { useIsMobile } from '../../helpers/useIsMobile';
import { DatesSwiper } from '../DatesSwiper/DatesSwiper';

import headerLine from '../../assets/header-line.svg';
import controlButton from '../../assets/control-button.svg';

import './styles.scss';

export type DateItem = {
  from: number;
  to: number;
  progress: Record<string, string>;
  title: string;
}

const dates: DateItem[] = [
  {
    from: 1992,
    to: 1997,
    title: 'Наука',
    progress: {
      2015: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2016: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
      2017: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      2018: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2019: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2020: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2021: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'
    }
  },
  {
    from: 1997,
    to: 2003,
    title: 'Кино',
    progress: {
      2015: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2016: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
      2017: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      2018: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2019: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2020: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2021: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'
    }
  },
  {
    from: 2003,
    to: 2007,
    title: 'Литература',
    progress: {
      2015: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2016: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
      2017: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      2018: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2019: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2020: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2021: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'
    }
  },
  {
    from: 2007,
    to: 2012,
    title: 'Наука',
    progress: {
      1992: 'Нобелевская премия'
    }
  },
  {
    from: 2012,
    to: 2015,
    title: 'Наука',
    progress: {
      1992: 'Нобелевская премия'
    }
  },
  {
    from: 2015,
    to: 2022,
    title: 'Наука',
    progress: {
      2015: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2016: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
      2017: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      2018: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2019: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2020: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      2021: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'
    }
  }
];

export const App: FC = () => {
  const isMobile = useIsMobile();
  const [value, setValue] = useState(0);

  const prev = useCallback(() => setValue((val) => val - 1), [setValue])
  const next = useCallback(() => setValue((val) => val + 1), [setValue])

  const onChange = useCallback((newValue: number) => setValue(newValue), [setValue])

  return <div className='App'>
    <div className='App-Header'>
      {!isMobile && <img src={headerLine} alt="Header line" />}
      <h2 className='App-Header-Text'>Исторические<br /> даты</h2>
    </div>
    <Timeline value={value} onChange={onChange} dates={dates} />
    <div className='App-Control'>
      <span className='App-Values'>{leadingZero(value + 1)} / {leadingZero(dates.length)}</span>
      <div className='App-Controls'>
        <button className='App-Button' disabled={value === 0} onClick={prev}>
          <img className='App-Button-Img' src={controlButton} height={isMobile ? 8 : 14} alt="Left value" />
        </button>
        <button className='App-Button' disabled={value === dates.length - 1} onClick={next}>
          <img className='App-Button-Img_right' src={controlButton} height={isMobile ? 8 : 14} alt="Left value" />
        </button>
      </div>
    </div>
    <DatesSwiper key={value} value={value} dates={dates} />
    {isMobile && <div className='App-Pagination'>
      {dates.map((_, i) => (
        <button className='App-Pagination-Bullet' data-select={value === i} onClick={() => setValue(i)}></button>
      ))}
    </div>}
  </div>
}
