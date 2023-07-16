import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import axios from '../api/axios';
import styled from 'styled-components';

function Search() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(request.data.results);
      console.log(request);
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log(searchResults);

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <S.SearchLayout>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl =
              'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <S.SearchResult
                key={movie.id}
                onClick={() => navigate(`/${movie.id}`)}
              >
                <h3 style={{ color: 'white' }}>{movie.title}</h3>
                <img src={movieImageUrl} alt='movie' />
              </S.SearchResult>
            );
          }
        })}
      </S.SearchLayout>
    ) : (
      <S.SearchLayout>
        <S.SearchResultNone>
          <p>
            찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </S.SearchResultNone>
      </S.SearchLayout>
    );
  };

  return renderSearchResults();
}

const S = {
  SearchLayout: styled.section`
    display: flex;
    padding: 100px;
    flex-wrap: wrap;
  `,
  SearchResult: styled.div`
    padding: 20px;
  `,
  SearchResultNone: styled.div`
    width: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default Search;
