import { T, TextProps } from 'pages/sunderedhearts/base/text/text';
import PrismicDOM from 'prismic-dom';
import React from 'react';
import { BaseText, Richtext, TextStyles } from '../prismic_types';
import styles from './text.css';

const textViewMapping: Record<TextStyles, React.ComponentType<TextProps>> = {
  'heading1': (props) => <T.Medium style="serif" {...props}/>,
  'heading2': (props) => <T.Small style="serif" weight="light" padding="medium" {...props}/>,
  'list-item': (props) => <T.Small {...props}/>,
  'o-list-item': (props) => <T.Small {...props}/>,
  'paragraph': (props) => <T.Tiny style="serif" weight="thin" {...props}/>,
}

class BaseTextView<T extends TextStyles> extends React.PureComponent<{
  body: BaseText<T>;
  textStyle: T;
  overrides?: Partial<TextProps>;
}> {
  private get textContent() {
    return { __html: PrismicDOM.RichText.asText([this.props.body]) };
  }

  render() {
    const Wrapper: React.ComponentType<TextProps> = textViewMapping[this.props.textStyle];
    return (
      <Wrapper {...this.props.overrides}>
        <span dangerouslySetInnerHTML={this.textContent}></span>
      </Wrapper>
    );
  }
}

const createTextView = <T extends TextStyles>(textStyle: T) => {
  return ({ body, overrides }: { body: BaseText<T> | undefined, overrides?: Partial<TextProps>}) => body
      ? <BaseTextView body={body} textStyle={textStyle} overrides={overrides} />
      : null;
};

export const TitleView = createTextView('heading1');
export const SubtitleView = createTextView('heading2');
export const ParagraphView = createTextView('paragraph');
export const ListItemView = createTextView('list-item');
export const OListItemView = createTextView('o-list-item');

export class RichtextView extends React.PureComponent<{
  body: Richtext | undefined;
  alignment?: 'left' | 'center' | 'right' | 'justify';
}> {
  render() {
    const { body, alignment = 'center' } = this.props;
    if (!body) {
      return;
    }
    return (
        <T.Small>
          <div className={styles[alignment]}>
            {body.paragraphs.map((item, i) => {
              if (Object.keys(textViewMapping).includes(item.type)) {
                return <BaseTextView key={i} body={item as BaseText<TextStyles>} textStyle={item.type as TextStyles}/>;
              } else if (item.type === 'image') {
                // TODO: merge image component with Gallery component
                return (
                  <div key={i} className={styles.image}>
                    <img src={item.url}/>
                    <div className={styles.subtitle}>
                      <T.Small style="serif" weight="light">{item.alt}</T.Small>
                    </div>
                  </div>
                );
              } else {
                throw new Error('richtext item type not supported: ' + item.type);
              }
            })}
          </div>
        </T.Small>
    );
  }
}
