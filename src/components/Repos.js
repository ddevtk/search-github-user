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
  console.log(languages);

  const mostLang = Object.values(languages).sort((a, b) => b.value - a.value);
  const starsPerLang = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map(item => {
      return { ...item, value: item.stars };
    });
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostLang} />
        <div></div>
        <Doughnut3D data={starsPerLang} />
        <div></div>
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
