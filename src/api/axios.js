import axios from 'axios';

const instance = axios.create({
  // api 키 인스턴스
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'f0a9fca9e7d831cd00821d928d43186e',
    language: 'ko-KR',
  },
});

export default instance;
