import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut3D } from './Charts';
const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((acc, cur) => {
    const { language, stargazers_count } = cur;
    if (!language) return acc;
    if (!acc[language]) {
      acc[language] = { label: language, value: 1, stars: stargazers_count };
      return acc;
    }
    if (acc[language]) {
      acc[language] = {
        ...acc[language],
        value: acc[language].value + 1,
        stars: acc[language].stars + stargazers_count,
      };
      return acc;
    }
  }, {});

  const mostLang = Object.values(languages).sort((a, b) => b.value - a.value);

  const starsPerLang = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map(item => {
      return { ...item, value: item.stars };
    });

  const starAndForkPerRepo = repos.reduce((acc, cur) => {
    const { name, stargazers_count, forks_count } = cur;
    acc.push({
      starPerRepo: { label: name, value: stargazers_count },
      forkPerRepo: { label: name, value: forks_count },
    });
    return acc;
  }, []);

  const starsPerRepo = starAndForkPerRepo
    .map(row => {
      return row.starPerRepo;
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const forkPerRepo = starAndForkPerRepo
    .map(row => {
      return row.forkPerRepo;
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostLang} />
        <Column3D data={starsPerRepo} />
        <Doughnut3D data={starsPerLang} />
        <Bar3D data={forkPerRepo} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
