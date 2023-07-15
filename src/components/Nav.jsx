import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // scrollY를 50으로 내리면 nav에 백그라운드 색깔 지정
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  const handleLogo = () => {
    navigate('/');
  };

  return (
    <S.nav show={show}>
      <S.navLogo
        alt='Netflix logo'
        onClick={handleLogo}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
      />
      <S.navInput
        value={searchValue}
        onChange={handleChange}
        type='text'
        placeholder='영화를 검색해주세요.'
      />
      <S.navAvata
        alt='User Logged'
        src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
      />
    </S.nav>
  );
}

const S = {
  nav: styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    height: 30px;
    z-index: 1;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition-timing-function: ease-in;
    transition: all 0.5s;
    cursor: pointer;
    background-color: ${(props) => (props.show ? '#111' : 'none')};
  `,
  navAvata: styled.img`
    position: fixed;
    right: 40px;
    width: 30px;
    object-fit: contain;
  `,
  navLogo: styled.img`
    position: fixed;
    left: 40px;
    width: 80px;
    object-fit: contain;
    cursor: pointer;
  `,
  navInput: styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.582);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: none;
  `,
};

export default Nav;
