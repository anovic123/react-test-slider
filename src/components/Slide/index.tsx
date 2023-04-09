import { FC } from 'react';

import { SlideContent } from '../../types';

import IMG from '../../assets/img.png';

import s from './style.module.scss';

interface CardProps extends SlideContent {}

export const Slide: FC<CardProps> = ({ imgSrc, date, title, description }) => {
  return (
    <article className={s.card}>
      <img src={imgSrc || IMG} alt={title} className={s.cardImg} />
      <b className={s.cardDate}>{date}</b>
      <h3 className={s.cardTitle}>{title}</h3>
      <p className={s.cardDescription}>{description}</p>
    </article>
  );
};
