import classNames from 'classnames';
import { T } from 'pages/sundered_hearts/base/text/text';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './button.css';
import loadingStyles from './loading.css';

export type ButtonProps = {
  className?: string,
  link?: string,
  loading?: boolean,
  disabled?: boolean,
  onClick?(): void,
  children: React.ReactNode,
};

export const Button = (props: ButtonProps) => {
  const { className, link, loading, disabled, onClick, children } = props;

  const _onClick = () => onClick?.();
  return link
    ? (
      <div
        className={classNames(className, styles.button, {
          [styles.disabled]: disabled || loading,
        })}
      >
        <Link
          className={styles.a}
          to={(disabled || loading) ? '' : link}
        >
          <T.Small display="inline">{children}</T.Small>
        </Link>
      </div>
    )
    : (
      <button
        disabled={disabled || loading || false}
        className={classNames(className, styles.button, {
          [styles.disabled]: disabled || loading,
        })}
        onClick={_onClick}
      >
        <T.Small display="inline">
          {children}
          {loading
            ? (
              <div
                className={classNames(
                  loadingStyles.laBallPulse,
                  loadingStyles.laSm,
                  styles.loadingSpinner,
                )}
              >
                {/* These divs are styled via 'loading.css'. */}
                <div></div>
                <div></div>
                <div></div>
              </div>
            )
            : undefined}
        </T.Small>
      </button>
    );
};
