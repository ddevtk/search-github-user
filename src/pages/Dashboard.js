import React, { Fragment, useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);
  return (
    <main>
      {/* <Navbar /> */}
      <Search />
      {isLoading ? (
        <img src={loadingImage} alt='loading' className='loading-img' />
      ) : (
        <Fragment>
          <Info />
          <User />
          <Repos />
        </Fragment>
      )}
    </main>
  );
};

export default Dashboard;
