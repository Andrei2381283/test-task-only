import React, { FC, useState } from 'react';
import type SwiperType from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useIsMobile } from '../../helpers/useIsMobile';
import { DateItem } from '../App/App';
import swipeButton from '../../assets/swipe-button.svg';

import 'swiper/css/pagination';
import './styles.scss';

interface DatesSwiperProps {
  value: number;
  dates: DateItem[];
}


export const DatesSwiper: FC<DatesSwiperProps> = ({ value, dates, }) => {
  const isMobile = useIsMobile();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return <div className='DatesSwiper'>
    {isMobile && <span className='DatesSwiper-Title'>{dates[value].title}</span>}
    {isMobile && <div className='DatesSwiper-Line'></div>}
    {currentSlide !== 0 && !isMobile && swiper && <button onClick={() => swiper.slidePrev()} className='DatesSwiper-SwipeButton DatesSwiper-SwipeButton_left'>
      <img src={swipeButton} width={5} height={10} alt='Scroll left arrow' />
    </button>}
    <Swiper
      spaceBetween={isMobile ? 25 : 50}
      slidesPerView={isMobile ? 2 : 3}
      onSlideChange={(swiper: SwiperType) => setCurrentSlide(swiper.activeIndex)}
      onSwiper={setSwiper}
    >
      {Object.keys(dates[value].progress).map((key) =>
        <SwiperSlide key={key} className='DatesSwiper-Slide'>
          <span className='DatesSwiper-Slide-Year'>{key}</span>
          <span className='DatesSwiper-Slide-Text'>{dates[value].progress[key]}</span>
        </SwiperSlide>
      )}
    </Swiper>
    {currentSlide !== Object.keys(dates[value].progress).length - 1 - (isMobile ? 1 : 2) && !isMobile && swiper && <button onClick={() => swiper.slideNext()} className='DatesSwiper-SwipeButton DatesSwiper-SwipeButton_right'>
      <img src={swipeButton} width={5} height={10} alt='Scroll right arrow' />
    </button>}
  </div>
}