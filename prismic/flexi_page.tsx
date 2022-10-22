import { makeObservable, observable, runInAction } from 'mobx';
import { FlexiPage } from 'pages/sundered_hearts/prismic/prismic_types';
import { SliceView, StaffCardView } from 'pages/sundered_hearts/prismic/slice';
import { TitleView } from 'pages/sundered_hearts/prismic/text/text';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './flexi_page.css';
import { prismicClient } from 'pages/sundered_hearts/prismic/install';
import { PrismicTypeDeserializer } from 'pages/sundered_hearts/prismic/prismic_type_deserializer';

const deserializer = new PrismicTypeDeserializer();

class FlexiPageView extends React.Component<{ page: FlexiPage }> {
  render() {
    const { page } = this.props;
    let isStaffCardFlipped = true;
    return (
      <div>
        <div className={styles.title}><TitleView body={page.pageTitle}/></div>
        <br/>
        {page.slices.map((s, i) => {
          if (s.type === 'staff_card') {
            isStaffCardFlipped = !isStaffCardFlipped;
            return <StaffCardView key={i} slice={s} isFlipped={isStaffCardFlipped}/>
          } else {
            isStaffCardFlipped = true;
          }
          return <SliceView key={i} slice={s}/>;
        })}
      </div>
    )
  }
}

type Props = { id: string };

@observer
export class FlexiPageViewLoader extends React.Component<Props> {
  private page: FlexiPage | undefined;

  constructor(props: Props) {
    super(props);
    makeObservable<FlexiPageViewLoader, 'page'>(this, {
      page: observable,
    });
  }

  async componentDidMount() {
    const prismicPage = await prismicClient.getByUID('flexi_page', this.props.id);
    const flexiPage = deserializer.deserialize(prismicPage);
    runInAction(() => this.page = flexiPage);
  }

  render() {
    if (this.page == null) {
      return <div>Loading...</div>;
    }
    return <FlexiPageView page={this.page}/>
  }
}
