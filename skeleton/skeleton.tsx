import { routeFor, RoutePath, RouteSegments } from 'pages/sunderedhearts/router/routes';
import React from 'react';
import { Link, Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import styles from './skeleton.css';
import logo from './logo.png';
import cornerOrnament from './corner_ornament.png';
import classNames from 'classnames';
import { usePrismicPreviewResolver } from '@prismicio/react';

export class Skeleton extends React.Component<{
  HomePage: React.ComponentType,
  InfoPage: React.ComponentType,
  MenuPage: React.ComponentType,
  StaffPage: React.ComponentType<{ name?: string }>,
  VenuePage: React.ComponentType,
  SchedulePage: React.ComponentType,
  NotFound: React.ComponentType,
}> {
  renderRoute(segments: RouteSegments, Component: React.ComponentType) {
    return (
      <Route path={routeFor(segments)} element={<Component/>}/>
    );
  }

  render() {
    const { HomePage, InfoPage, MenuPage, StaffPage, VenuePage, SchedulePage, NotFound } = this.props;
    return (
      <BrowserRouter>
        <div className={styles.skeleton}>
          <Link to={routeFor([RoutePath.HOME])}><div className={styles.logo}><img src={logo}/></div></Link>
          <div className={classNames(styles.corner, styles.tl)}><img src={cornerOrnament}/></div>
          <div className={classNames(styles.corner, styles.tr)}><img src={cornerOrnament}/></div>
          <div className={classNames(styles.corner, styles.bl)}><img src={cornerOrnament}/></div>
          <div className={classNames(styles.corner, styles.br)}><img src={cornerOrnament}/></div>
          <div className={styles.content}>
            <Routes>
              <Route path={routeFor([RoutePath.HOME])} element={<HomePage/>}/>
              <Route path={routeFor([RoutePath.INFO])} element={<InfoPage/>}/>
              <Route path={routeFor([RoutePath.MENU])} element={<MenuPage/>}/>
              <Route path={routeFor([RoutePath.VENUE])} element={<VenuePage/>}/>
              <Route path={routeFor([RoutePath.SCHEDULE])} element={<SchedulePage/>}/>
              <Route path={routeFor([RoutePath.STAFF])} element={<StaffPage/>}/>
              <Route path={routeFor([RoutePath.STAFF, ':name'])}>
                {({ match }: { match: any }) => (
                  match && match.params.name != null && <StaffPage name={match.params.name}/>
                )}
              </Route>
              <Route path="/preview" element={<Preview/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const Preview = () => {
  const navigate = useNavigate();
  usePrismicPreviewResolver({ navigate });
  return null;
}
