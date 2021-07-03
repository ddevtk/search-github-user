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
  const [requests, setRequests] = useState(60);
  const [error, setError] = useState({ isShow: false, msg: '' });

  const searchUser = async user => {
    try {
      const res = await fetch(`${rootUrl}/users/${user}`);
      const userData = await res.json();
      if (userData.message) {
        throw new Error('There is no user with that input');
      }
      const reposData = await axios(
        `${rootUrl}/users/${user}/repos?per_page=100`
      );
      const followersData = await axios(`${rootUrl}/users/${user}/followers`);

      setUser(userData || {});
      setRepos(reposData.data || []);
      setFollowers(followersData.data || []);
    } catch (error) {
      console.log(error.message);
      setError({ isShow: true, msg: 'There is no user with that input' });
    }
  };

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

  const checkRequest = async () => {
    try {
      const { data } = await axios(`${rootUrl}/rate_limit`);
      let {
        rate: { remaining },
      } = data;
      setRequests(remaining);
      if (remaining === 0) {
        setError({
          isShow: true,
          msg: 'Sorry! You have exeeded your hourly rate limit 😅😅😅',
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
    checkRequest();
  }, []);
  useEffect(() => {
    checkRequest();
  }, [user]);

  return (
    <GithubContext.Provider
      value={{ user, repos, followers, requests, error, setError, searchUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
