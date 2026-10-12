import React from 'react';
import * as styles from './code.module.scss';

export const Code = ({
  className,
  ...props
}: React.JSX.IntrinsicElements['code']) => (
  <code {...props} className={[className, styles.code].filter(Boolean).join(' ')} />
);
