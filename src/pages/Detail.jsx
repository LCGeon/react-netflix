import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import styled from 'styled-components';
const S = {
  DetailSection: styled.section``,
  DetailImg: styled.img`
    width: 100%;
    height: 100%;
  `,
  DetailInfo: styled.div`
    background-color: #757575;
    position: absolute;
    top: 200px;
    left: 240px;
    border-radius: 15px;
    color: white;
    opacity: 0.9;
    max-width: 900px;
  `,
  InfoTitle: styled.h1`
    font-size: 37px;
  `,
  InfoOverview: styled.div``,
};

export default function Detail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  console.log(movie);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <div>...loading</div>;

  return (
    <S.DetailSection>
      <S.DetailImg
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='poster'
      />
      <S.DetailInfo>
        <S.InfoTitle>{movie.title}</S.InfoTitle>
        <S.InfoOverview>{movie.overview}</S.InfoOverview>
      </S.DetailInfo>
    </S.DetailSection>
  );
}
