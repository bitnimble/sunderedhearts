import { observer } from 'mobx-react';
import { HomePage } from 'pages/sunderedhearts/content/home/home';
import { FlexiPageViewLoader } from 'pages/sunderedhearts/prismic/flexi_page';
import { NotFound } from 'pages/sunderedhearts/router/not_found';
import { Skeleton } from 'pages/sunderedhearts/skeleton/skeleton';
import React from 'react';

export function createApp() {
  const InfoPage = () => <div></div>;
  const MenuPage = () => <div></div>;
  const SchedulePage = () => <div></div>;

  const VenuePage = () => <FlexiPageViewLoader id="venue_page"/>;
  const StaffPage = () => <FlexiPageViewLoader id="staff_page"/>;

  return observer(() => (
    <Skeleton
        HomePage={HomePage}
        InfoPage={InfoPage}
        MenuPage={MenuPage}
        StaffPage={StaffPage}
        VenuePage={VenuePage}
        SchedulePage={SchedulePage}
        NotFound={NotFound}
    />
  ));
}
