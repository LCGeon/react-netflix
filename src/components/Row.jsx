import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import styled from 'styled-components';
import MovieModal from './MovieModal.jsx';

function Row({ title, id, fetchUrl, isLarge }) {
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
      <h2>{title}</h2>
      <div>
        <div>
          <span>{'<'}</span>
        </div>
        <div id={id}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              alt={movie.name}
              src={`https://image.tmdb.org/t/p/original/${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              onClick={() => handleClick(movie)}
              style={{ width: '260px' }}
            />
          ))}
        </div>
        <div>
          <span>{'<'}</span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </S.RowContainer>
  );
}
const S = {
  RowContainer: styled.section`
    margin-left: 20px;
    color: black;
  `,
};
export default Row;
