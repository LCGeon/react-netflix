import React, { useRef } from 'react';
import { styled } from 'styled-components';
import useOnClickOutside from '../hooks/useOnclickOutside';

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const truncate = (str, n) => {
    // 특정 글자수가 넘어가면 자르기
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <S.ModalLayOut>
      <S.ModalWrapper>
        <S.Modal ref={ref}>
          <S.ModalClose onClick={() => setModalOpen(false)}>X</S.ModalClose>
          <S.ModalPosterImg
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt='modal__poster-img'
          />
          <S.ModalContents>
            <S.ModalDetail>
              <span style={{ color: 'green', paddingRight: '16px' }}>
                100% for you
              </span>
              {release_date ? release_date : first_air_date}
            </S.ModalDetail>
            <S.ModalTitle>{title ? title : name}</S.ModalTitle>
            <S.ModalOverView> 평점: {vote_average}</S.ModalOverView>
            <S.ModalOverView>{truncate(overview, 130)}</S.ModalOverView>
          </S.ModalContents>
        </S.Modal>
      </S.ModalWrapper>
    </S.ModalLayOut>
  );
}

const S = {
  ModalLayOut: styled.div`
    z-index: 1200;
    position: absolute;
  `,
  ModalWrapper: styled.div`
    position: fixed;
    inset: 0px;
    background-color: rgb(0 0 0 / 71%);
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
  `,
  Modal: styled.div`
    position: relative;
    max-width: 800px;
    height: 700px;
    margin-top: 30px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
    background: #111;
    overflow: hidden;
    border-radius: 8px;
    transition: all 400ms ease-in-out 2s;
    animation: fadeIn 400ms;
  `,
  ModalClose: styled.span`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 1000;
    color: white;
    font-size: 30px;
  `,
  ModalPosterImg: styled.img`
    width: 100%;
    height: 380px;
  `,
  ModalContents: styled.div`
    padding: 10px 30px;
    color: white;
  `,
  ModalDetail: styled.p`
    font-weight: 600;
    font-size: 18px;
  `,
  ModalTitle: styled.h2`
    padding: 0;
    font-size: 40px;
    margin: 10px 0;
  `,
  ModalOverView: styled.p`
    font-size: 20px;
    line-height: 1.5;
  `,
};
export default MovieModal;
