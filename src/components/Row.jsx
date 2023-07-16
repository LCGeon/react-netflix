import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import styled from 'styled-components';
import MovieModal from './MovieModal.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    // MovieData 불러오기
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    // api request 받아오기
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    //영화 상세 정보
    setModalOpen(true);
    setMovieSelected(movie);
  };
  return (
    <S.RowContainer>
      <h1>{title}</h1>
      <Swiper
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 5, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 5, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        // navigation // arrow 버튼 사용 유무
        // pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <S.RowPosters id={id}>
          {movies.map((movie) => (
            <SwiperSlide style={{ display: 'flex' }} key={movie.id}>
              <S.RowPoster
                isLargeRow={isLargeRow}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </S.RowPosters>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </S.RowContainer>
  );
}
const S = {
  RowContainer: styled.section`
    margin-left: 20px;
    color: white;
  `,
  RowPosters: styled.div`
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px 0 20px 20px;
    scroll-behavior: smooth;
  `,
  RowPoster: styled.img`
    object-fit: contain;
    width: 100%;
    max-height: ${(props) => (props.isLargeRow ? '430px' : '244px')};
    margin-right: 10px;
    transition: transform 450ms;
    border-radius: 4px;
    padding: 25px 0px;

    &:hover {
      transform: scale(1.08);
    }
  `,
};
export default Row;
