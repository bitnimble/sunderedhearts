import { UnreachableError } from 'base/unreachable';
import classNames from 'classnames';
import { action, makeObservable, observable } from 'mobx';
import { Gallery } from 'pages/sunderedhearts/base/gallery/gallery';
import { T } from 'pages/sunderedhearts/base/text/text';
import { RichtextItem, Slice, StaffCard } from 'pages/sunderedhearts/prismic/prismic_types';
import { RichtextView } from 'pages/sunderedhearts/prismic/text/text';
import React from 'react';
import styles from './slice.css';
import { observer } from 'mobx-react';

export class SliceView extends React.Component<{ slice: Slice }> {
  private renderVerticalSlice(components: RichtextItem[]) {
    return components.map((c, i) => <RichtextView key={i} body={{ type: 'richtext', paragraphs: [c] }} />)
  }

  render() {
    const { slice } = this.props;
    switch (slice.type) {
      case 'gallery':
        return <Gallery images={slice.images.map(i => i.url)}/>;
      case 'section_start':
        return this.renderVerticalSlice([slice.sectionTitle, ...slice.sectionText.flatMap(t => t.paragraphs)]);
      case 'staff_card':
        return <StaffCardView slice={slice} isFlipped={false} />
      default:
        throw new UnreachableError(slice);
    }
  }
}

type StaffCardViewProps = { slice: StaffCard, isFlipped: boolean };

@observer
export class StaffCardView extends React.Component<StaffCardViewProps> {
  private isRpDialogOpen = false;

  constructor(props: StaffCardViewProps) {
    super(props);
    makeObservable<StaffCardView, 'isRpDialogOpen' | 'openRpInfo' | 'closeRpInfo'>(this, {
      isRpDialogOpen: observable,
      openRpInfo: action.bound,
      closeRpInfo: action.bound,
    });
  }

  private openRpInfo() {
    this.isRpDialogOpen = true;
  }

  private closeRpInfo() {
    this.isRpDialogOpen = false;
  }

  render() {
    const { isFlipped, slice } = this.props;
    return (
      <>
        <div className={classNames(styles.staffCard, { [styles.staffCardFlipped]: isFlipped })}>
          <div className={styles.profilePicture}>
            <img src={slice.profilePicture.url} alt={slice.profilePicture.alt} />
          </div>
          <div>
            <T.Large style="script">{slice.name}</T.Large>
            <T.Small style="sans">{slice.username}</T.Small>
            <T.Tiny style="sans">{slice.role}</T.Tiny>
            <br/>
            <RichtextView body={slice.description} alignment="left"/>
            <br/>
            <span className={styles.rpInfoLabel} onClick={this.openRpInfo}>{slice.rpStyle === 'rp' ? 'Full RP' : 'Casual RP'}</span>
          </div>
        </div>
        {this.isRpDialogOpen && (
          <dialog open>
            <div className={styles.rpInfo}>
              {slice.rpStyle === 'rp'
                ? (
                  <>
                    <T.Medium>Full RP</T.Medium>
                    <T.Small style="serif" weight="thin">Hosts who RP are able to act fully in-character with specified personalities and background lore. Full use of RP etiquette such as the following are required:
                      <ul>
                        <li>" " Quotation marks for any speech (eg. "Welcome to Alice in the Mist")</li>
                        <li>/em for actions (eg. /em takes a bite out of the candy)</li>
                        <li>(( )) Brackets for OOC chat (eg. ((Sorry, I'll have to BRB for a bit)) )</li>
                      </ul>
                    </T.Small>
                  </>
                )
                : (
                  <>
                    <T.Medium>Casual RP</T.Medium>
                    <T.Small style="serif" weight="thin">This refers to playing the role of a staff or a host, where conversations may cross between real life topics and in-game lore. This is a looser form of RP that requires little-to-no RP experience.</T.Small>
                  </>
                )
              }
              <span className={styles.buttonCloseRpInfo} onClick={this.closeRpInfo}>✕</span>
            </div>
          </dialog>
        )}
      </>
    )
  }
}
