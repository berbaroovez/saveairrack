import { useAuth } from "../lib/auth";
import styled from "styled-components";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Arrow from "../lib/smooth-arrow.svg";
export default function Index() {
  // var docRef = db.collection("users").doc(auth.user.uid);

  const auth = useAuth();
  return (
    <>
      <StyledNav>
        <NavLogo>
          <Logo src="https://saveairrack.com/brand/logo.gif" />
          <LogoMSG>
            A drop by <a href="https://twitter.com/berbaroovez">Berbaroovez</a>
          </LogoMSG>
        </NavLogo>
        <NavMenu>
          <NavItem href="https://www.youtube.com/channel/UCyps-v4WNjWDnYRKmZ4BUGw">
            Youtube
          </NavItem>
          <NavItem href="https://www.instagram.com/airrack/?hl=en">
            Instagram
          </NavItem>
          <NavItem href="https://www.airrack.shop/">Merch</NavItem>
        </NavMenu>
      </StyledNav>
      <HeroContainer>
        <LeftColumn>
          <Title>
            <span className=".hash">#</span>SAVEAIRRACK
          </Title>
          <SubTitle>
            LETS PUSH AIRRACK TO A MILLION SUB BY TWEETING OUT HIS CHANNEL
            <span className=".hash"> #</span>SAVEAIRRACK
          </SubTitle>
        </LeftColumn>
        <RightColumn>
          <TWTbutton onClick={(e) => auth.signinWithTwitter()}>
            LOGIN WITH TWITTER
          </TWTbutton>
          <ArrowIMG src="https://saveairrack.com/vectors/smooth-arrow.svg" />
        </RightColumn>
      </HeroContainer>
      <Head>
        <title>#SaveAirrack</title>
      </Head>
    </>
  );
}

const StyledNav = styled.nav`
  width: 100vw;
  display: grid;
  grid-template-columns: auto auto;

  padding: 1rem;
  @media only screen and (max-width: 800px) {
    grid-template-columns: auto 250px;
  }
`;
const NavLogo = styled.div`
  display: grid;
  grid-template-columns: 120px auto;
  align-items: center;
`;
const Logo = styled.img`
  height: 45px;
`;
const LogoMSG = styled.h5`
  font-family: "Inter";
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.38);

  a {
    color: teal;
    text-decoration: underline;
  }
`;

const NavMenu = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  font-size: 1.5rem;
  @media only screen and (max-width: 800px) {
    justify-content: end;
    font-size: 1rem;
    gap: 30px;
    text-align: right;
  }
`;
const NavItem = styled.a`
  :hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const HeroContainer = styled.div`
  width: 100vw;

  display: grid;
  grid-template-columns: auto auto;
  padding: 0 calc((100vw - 1200px) / 2);

  @media only screen and (max-width: 800px) {
    grid-template-columns: auto;
  }

  @media only screen and (max-width: 1200px) {
  }
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;

  span {
    font-family: sans-serif;
  }
  /* @media only screen and (max-width: 800px) {
    justify-content: center;
  } */
`;
const RightColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto;
  align-items: center;

  gap: 0;

  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
`;
const Title = styled.h1`
  font-size: 130px;
  text-align: center;
  @media only screen and (max-width: 800px) {
    font-size: 80px;
  }
  @media only screen and (max-width: 1200px) {
    font-size: 90px;
  }
`;
const SubTitle = styled.h3`
  font-size: 50px;
  width: 500px;
  text-align: center;

  @media only screen and (max-width: 800px) {
    font-size: 40px;
    width: 350px;
  }
  @media only screen and (max-width: 1200px) {
    font-size: 40px;
    width: 450px;
  }
`;
const TWTbutton = styled.button`
  position: relative;
  border: none;
  background: #adf9f6;
  font-family: TrashHand;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  height: 100px;
  border-radius: 5px 20px;
  &:hover {
    background: #77fffa;
  }

  &:after {
    position: absolute;
    bottom: -110px;
    right: 35px;
    content: "we will tweet every 2 hours in support of airrack";
    font-size: 30px;
    line-height: 32px;
    text-align: center;
    width: 200px;

    color: rgba(0, 0, 0, 0.38);
  }

  @media only screen and (max-width: 800px) {
    font-size: 40px;
    width: 300px;
  }
  @media only screen and (max-width: 1200px) {
    font-size: 20px;
    width: 200px;

    &:after {
      position: absolute;
      bottom: -110px;
      right: 0px;
      font-size: 20px;

      width: 150px;
    }
  }
`;
const ArrowIMG = styled.img`
  height: 400px;
  width: 400px;
  position: absolute;
  transform: rotate(-80deg);
  bottom: -200px;
  left: -200px;

  @media (max-width: 800px) {
    height: 200px;
    width: 200px;
    bottom: -200px;
    left: -40px;
  }
  @media (max-width: 1200px) {
    height: 200px;
    width: 200px;
    bottom: -60px;
    left: -100px;
  }
`;
