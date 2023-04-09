import { FC, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Slide, Navigation } from '../';

import { SlideContent } from '../../types';

import s from './style.module.scss';

interface SliderProps {
  data: SlideContent[];
}

export const Slider: FC<SliderProps> = ({ data }) => {
  const [isActiveSlide, setIsActiveSlide] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);

  const nextSlide = data[isActiveSlide + 1];
  const prevSlide = data[isActiveSlide - 1];

  const sliderContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sliderInterval: ReturnType<typeof setInterval>;
    if (nextSlide) {
      sliderInterval = setInterval(() => {
        setIsActiveSlide(isActiveSlide + 1);
      }, 4000);
    }

    return () => {
      if (sliderInterval) {
        clearInterval(sliderInterval);
      }
    };
  }, [isActiveSlide, nextSlide]);

  useEffect(() => {
    if (!sliderContainer.current) {
      return;
    }

    sliderContainer.current.style.transform = `translate3d(-${isActiveSlide * 260}px, 0, 0)`;
  }, [isActiveSlide]);

  const handleNextSlide = useCallback(() => {
    setIsActiveSlide((prevState) => prevState + 1);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setIsActiveSlide((prevState) => prevState - 1);
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50 && nextSlide) {
      handleNextSlide();
    } else if (touchEndX - touchStartX > 50 && prevSlide) {
      handlePrevSlide();
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };
  return (
    <div>
      <Navigation
        title="Актуальное"
        nextSlide={!nextSlide}
        prevSlide={!prevSlide}
        data={data}
        handleNextSlide={handleNextSlide}
        handlePrevSlide={handlePrevSlide}
        isActiveSlide={isActiveSlide}
      />
      <div className={s.sliderCards}>
        <div
          ref={sliderContainer}
          className={s.sliderCardsContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {data.map((el: SlideContent) => (
            <Slide key={el.id} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
};
