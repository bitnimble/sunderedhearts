import classNames from 'classnames';
import React from 'react';
import styles from './text.css';

type TextStyle = 'sans' | 'serif' | 'script';
type TextWeight = 'regular' | 'thin' | 'light' | 'semibold' | 'bold' | 'extrabold' | 'black';
type TextDisplay = 'inline' | 'block';
type TextPadding = 'none' | 'small' | 'medium' | 'large';

const styleMap: Record<TextStyle, string> = {
  'sans': styles.styleSans,
  'serif': styles.styleSerif,
  'script': styles.styleScript,
};

const weightMap: Record<TextWeight, string> = {
  'regular': styles.weightRegular,
  'thin': styles.weightThin,
  'light': styles.weightLight,
  'semibold': styles.weightSemibold,
  'bold': styles.weightBold,
  'extrabold': styles.weightExtrabold,
  'black': styles.weightBlack,
};

const displayMap: Record<TextDisplay, string> = {
  'block': styles.displayBlock,
  'inline': styles.displayInline,
};

const paddingMap: Record<TextPadding, string> = {
  'none': '',
  'small': styles.paddingSmall,
  'medium': styles.paddingMedium,
  'large': styles.paddingLarge,
}

export type TextProps = {
  className?: string,
  children: React.ReactNode,
  style?: TextStyle,
  weight?: TextWeight,
  display?: TextDisplay,
  padding?: TextPadding,
};

function createTextClass(className: string) {
  return (
    {
      className: classNameProp,
      children,
      style = 'sans',
      weight = 'regular',
      display = 'block',
      padding = 'none',
    }: TextProps,
  ) => {
    const classname = classNames(
      classNameProp,
      styles.text,
      className,
      styleMap[style],
      weightMap[weight],
      displayMap[display],
    );
    const content = display === 'inline'
      ? <span className={classname}>{children}</span>
      : <p className={classname}>{children}</p>;

    return padding === 'none' ? content : <div className={paddingMap[padding]}>{content}</div>;
  };
}

export namespace T {
  export const Tiny = createTextClass(styles.tiny);
  export const Small = createTextClass(styles.small);
  export const Medium = createTextClass(styles.medium);
  export const Large = createTextClass(styles.large);
  export const ExtraLarge = createTextClass(styles.extraLarge);
  export const Custom = createTextClass(styles.custom);
}
