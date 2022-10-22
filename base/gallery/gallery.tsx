import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './gallery.css';

type GalleryProps = {
  images: string[];
  enableKenBurns?: boolean;
}

@observer
export class Gallery extends React.Component<GalleryProps> {
  private activeIndex = 0;

  constructor(props: GalleryProps) {
    super(props);
    makeObservable<Gallery, 'activeIndex' | 'advanceImage'>(this, {
      activeIndex: observable,
      advanceImage: action.bound,
    });
    setInterval(this.advanceImage, 7000);
  }

  private advanceImage() {
    this.activeIndex = (this.activeIndex + 1) % this.props.images.length;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.images.map((url, i) => (
          <img key={i} className={styles.image} src={url} style={{ opacity: this.activeIndex === i ? '1' : '0' }}/>
        ))}
      </div>
    );
  }
}
