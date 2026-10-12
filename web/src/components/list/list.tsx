import React from 'react';
import * as styles from './list.module.scss';

export const List = ({ className, ...props }: React.JSX.IntrinsicElements['ul']) => (
  <ul {...props} className={[className, styles.list].filter(Boolean).join(' ')} />
);
