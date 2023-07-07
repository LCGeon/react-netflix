import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterLinkContainer>
          <S.FooterLinkTitle>넷플릭스 대한민국</S.FooterLinkTitle>
          <S.FooterLinkContent>
            <S.FooterLink href='https://help.netflix.com/ko/node/412'>
              넷플릭스 소개
            </S.FooterLink>
            <S.FooterLink href='https://help.netflix.com/ko'>
              고객 센터
            </S.FooterLink>
            <S.FooterLink href='https://help.netflix.com/ko/'>
              미디어 센터
            </S.FooterLink>
            <S.FooterLink href='https://help.netflix.com/ko/'>
              이용 약관
            </S.FooterLink>
          </S.FooterLinkContent>
          <S.FooterDescContainer>
            <S.FooterDescRights>Netflix Rights Reserved.</S.FooterDescRights>
          </S.FooterDescContainer>
        </S.FooterLinkContainer>
      </S.FooterContent>
    </S.FooterContainer>
  );
}

const S = {
  FooterContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    border-top: 1px solid rgb(25, 25, 25);
    width: 100%;
    position: relative;
    z-index: 100;

    @media (max-width: 769px) {
      padding: 20px 20px;
      padding-bottom: 30px;
    }
  `,
  FooterContent: styled.div``,
  FooterLinkContainer: styled.div`
    width: 500px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  FooterLinkTitle: styled.h1`
    color: gray;
    font-size: 17px;
  `,
  FooterLinkContent: styled.div`
    display: flex;
    justify-content: space-bewteen;
    flex-wrap: wrap;
    margin-top: 35px;

    @media (max-width: 768px) {
      margin-top: 26px;
    }
  `,
  FooterLink: styled.a`
    color: gray;
    font-size: 14px;
    width: 110px;
    margin-bottom: 21px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      margin-bottom: 16px;
    }
  `,
  FooterDescContainer: styled.div`
    margin-top: 30px;
    @media (max-width: 768px) {
      margin-top: 20px;
    }
  `,
  FooterDescRights: styled.h2`
    color: white;
    font-size: 14px;
    text-align: center;
  `,
};
