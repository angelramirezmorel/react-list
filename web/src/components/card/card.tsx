import React from 'react';
import * as styles from './card.module.scss';

export const Card = ({ className, ...props }: React.JSX.IntrinsicElements['div']) => (
  <div {...props} className={[className, styles.card].filter(Boolean).join(' ')} />
);
