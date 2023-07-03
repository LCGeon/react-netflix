import axios from '../api/axios.js';
import React, { useState, useEffect } from 'react';
import requests from '../api/requests';
import styled from 'styled-components';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // 현재 상영중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    // 영화 데이터 중 랜덤으로 ID 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 가져온 영화의 상세한 정보 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  };
  const truncate = (str, n) => {
    // 특정 글자수가 넘어가면 자르기
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };
  if (!isClicked) {
    return (
      <S.banner
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <S.content>
          <S.title> {movie.title || movie.name || movie.original_name}</S.title>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <S.button
              background={'rgb(216, 37, 37)'}
              color={'black'}
              onClick={() => setIsClicked(true)}
            >
              Play
            </S.button>
            <S.button
              background={' rgba(109, 109, 110, 0.7)'}
              hover={'rgb(74, 74, 74)'}
            >
              More Information
            </S.button>
          </div>
          <S.description>{truncate(movie.overview, 150)}</S.description>
        </S.content>
        <S.fadeBottom />
      </S.banner>
    );
  } else {
    return (
      // play 버튼이 클릭 되었을때
      <S.container>
        <S.homeContainer>
          <S.frame
            width='640'
            height='360'
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
            ?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
            title='YouTube video player'
            frameborder='0'
            allow='autoplay; fullscreen'
          ></S.frame>
        </S.homeContainer>
      </S.container>
    );
  }
}
const S = {
  banner: styled.header`
    color: white;
    object-fit: contain;
    height: 448px;
    @media screen and (min-width: 1500px) {
      position: relative;
      height: 600px;
    }
  `,
  content: styled.div`
    margin-left: 40px;
    padding-top: 140px;
    height: 190px;
    @media screen and (max-width: 768px) {
      width: min-content !important;
      padding-left: 2.3rem;
      margin-left: 0px !important;
    }
  `,
  button: styled.button`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 0.2vw;
    padding: 0.4rem 1.8rem 0.4rem 1rem;
    margin-right: 1rem;
    background-color: ${({ background }) => background || 'white'};
    color: ${({ color }) => color || 'white'};

    &:hover {
      color: white;
      background-color: ${({ hover }) => hover || 'rgba(170, 170, 170, 0.9)'};
      transition: all 0.2s;
    }
  `,
  title: styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.5rem;
  `,
  description: styled.h1`
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-weight: 500;
    font-size: 1rem;
    max-width: 400px;
    height: 80px;

    @media (max-width: 768px) {
      font-size: 0.8rem !important;
      width: auto !important;
    }
  `,
  fadeBottom: styled.div`
    height: 7.4rem;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
    @media (min-width: 1500px) {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 10rem;
    }
  `,

  frame: styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    border: none;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `,
  container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 97vh;
  `,
  homeContainer: styled.div`
    width: 100%;
    height: 100%;
  `,
};

export default Banner;
