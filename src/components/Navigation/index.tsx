import { FC } from 'react';
import cl from 'classnames';

import { SlideContent } from '../../types';

import s from './style.module.scss';

interface NavigationProps {
  title: string;
  nextSlide: boolean;
  prevSlide: boolean;
  handleNextSlide: () => void;
  handlePrevSlide: () => void;
  data: SlideContent[];
  isActiveSlide: number;
}

export const Navigation: FC<NavigationProps> = ({
  title,
  nextSlide,
  prevSlide,
  handleNextSlide,
  handlePrevSlide,
  data,
  isActiveSlide,
}) => {
  return (
    <div className={s.navigation}>
      <h2 className={s.navigationTitle}>{title}</h2>
      <div className={s.navigationActions}>
        <div className={s.navigationProgressBar}>
          <div
            className={s.navigationProgressBarProgress}
            style={{ width: `${(isActiveSlide * 100) / (data.length - 1)}%` }}
          />
        </div>
        <div className={s.navigationActionsContainer}>
          <button
            disabled={prevSlide}
            onClick={handlePrevSlide}
            className={cl(s.navigationBtn, s.navigationBtnPrev)}
          >
            -
          </button>
          <button
            disabled={nextSlide}
            onClick={handleNextSlide}
            className={cl(s.navigationBtn, s.navigationBtnNext)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
