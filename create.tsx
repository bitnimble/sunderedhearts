import { observer } from 'mobx-react';
import { HomePage } from 'pages/sundered_hearts/content/home/home';
import { FlexiPageViewLoader } from 'pages/sundered_hearts/prismic/flexi_page';
import { NotFound } from 'pages/sundered_hearts/router/not_found';
import { Skeleton } from 'pages/sundered_hearts/skeleton/skeleton';
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
