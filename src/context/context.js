import React, { useState, useEffect } from 'react';
import { mockUser } from './mockData.js/mockUser';
import { mockRepos } from './mockData.js/mockRepos';
import { mockFollowers } from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);

  const getData = async () => {
    const userRes = await fetch('https://api.github.com/users/ddevtk');
    const userData = await userRes.json();
    const repoRes = await fetch(
      'https://api.github.com/users/ddevtk/repos?per_page=100'
    );
    const repoData = await repoRes.json();
    const followerRes = await fetch(
      'https://api.github.com/users/ddevtk/followers'
    );
    const followerData = await followerRes.json();
    setUser(userData);
    setRepos(repoData);
    setFollowers(followerData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GithubContext.Provider value={{ user, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
