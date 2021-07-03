import React, { useState, useEffect } from 'react';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [requests, setRequests] = useState(60);
  const [error, setError] = useState({ isShow: false, msg: '' });
  const [isLoading, setIsLoading] = useState(false);

  const searchUser = async user => {
    try {
      setIsLoading(true);
      const res = await fetch(`${rootUrl}/users/${user}`);
      const userData = await res.json();
      if (userData.message) {
        setIsLoading(false);
        throw new Error('There is no user with that input');
      }
      const reposData = await axios(
        `${rootUrl}/users/${user}/repos?per_page=100`
      );
      const followersData = await axios(`${rootUrl}/users/${user}/followers`);

      setIsLoading(false);

      setUser(userData || {});
      setRepos(reposData.data || []);
      setFollowers(followersData.data || []);
    } catch (error) {
      console.log(error.message);
      setError({ isShow: true, msg: 'There is no user with that input' });
    }
  };

  const getData = async () => {
    setIsLoading(true);
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

    setIsLoading(false);

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
      value={{
        user,
        repos,
        followers,
        requests,
        error,
        setError,
        searchUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
