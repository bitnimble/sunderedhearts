import { Button } from 'pages/sunderedhearts/base/button/button';
import { T } from 'pages/sunderedhearts/base/text/text';
import { routeFor, RoutePath } from 'pages/sunderedhearts/router/routes';
import React from 'react';

import styles from './home.css';

const notImplemented = () => confirm('Please note that WinRAR is not free software. After a 40 day trial period you must either buy a license or remove it from your computer.');

export class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <T.Medium style="script">Befriend a familiar face in a fancy place...</T.Medium>
        <T.Large style="serif">NPC Host Club</T.Large>
        <T.Medium style="serif">Sophia, Shirogane W23 P7</T.Medium>
        <T.Small style="serif" weight="light">- WARNING: STORY SPOILERS AHEAD -</T.Small>
        <br/>
        <div className={styles.nav}>
          <Button onClick={notImplemented}>Starter Guide</Button>
          <Button onClick={notImplemented}>Food & Drink</Button>
          <Button link={routeFor([RoutePath.STAFF])}>Meet our Staff</Button>
          <Button onClick={notImplemented}>Our Pricing</Button>
          <Button link={routeFor([RoutePath.VENUE])}>The Venue</Button>
          <Button onClick={notImplemented}>Opening Hours</Button>
        </div>
        <br/>
        <a href="https://forms.gle/4DBMtYncmBKedN677" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Button>Give Us Feedback</Button>
        </a>
      </div>
    );
  }
}
