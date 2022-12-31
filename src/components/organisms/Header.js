import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import korLogo from "../../static/logo/ua_logo_kor.png";
import engLogo from "../../static/logo/ua_logo_eng.png";
import "./Header.scss";

import * as authAPI from "../../lib/api/auth";

import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

const Header = ({ history, ...props }) => {
  const { t, i18n } = useTranslation(["Header", "Label"]);

  const [hover1, setHover1] = useState(<div />);
  const [hover2, setHover2] = useState(<div />);
  const [hover3, setHover3] = useState(<div />);
  const [hover4, setHover4] = useState(<div />);
  const [hover5, setHover5] = useState(<div />);
  const [hover6, setHover6] = useState(<div />);
  const [hover7, setHover7] = useState(<div />);
  const [authButtonBar, setAuthButtonBar] = useState(<div />);
  const target = useRef(null);

  const { auth, name } = useSelector(state => state.auth);
  const [lang, setLang] = useState(i18n.language);
  const toggleLang = () => {
    const newLang = lang === "ko" ? "en" : "ko";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const active = (
    <div
      style={{
        height: "2px",
        backgroundColor: "#444",
        marginTop: "-2px"
      }}
    />
  );

  const enter = <div className="tab-hover-enter" />;
  const leave = <div className="tab-hover-leave" />;

  useEffect(() => {
    const state = {
      redirect: window.location.href
    };
    const tryLogout = () => {
      authAPI.logout().then(res => {
        window.location.reload(false);
      });
    };
    if (auth === "admin")
      setAuthButtonBar(
        <>
          <Nav.Link className="header-admin-logout" onClick={tryLogout}>
            {t("어드민 로그아웃")}
          </Nav.Link>
          <Nav.Link className="header-admin-adminpage" href="/web/admin">
            {t("관리 페이지")}
          </Nav.Link>
        </>
      );
    else if (auth === "student")
      setAuthButtonBar(
        <NavDropdown alignRight title={t("name", { name })} id="user-name">
          <NavDropdown.Item as={Link} to="/web/user/studentFee">
            {t("학생회비")}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={tryLogout} className="header-logout">
            {t("로그아웃")}
          </NavDropdown.Item>
        </NavDropdown>
      );
    else
      setAuthButtonBar(
        <>
          <Nav.Link
            className="header-login"
            href={`${process.env.REACT_APP_SSO}?client_id=${process.env.REACT_APP_CLIENT_ID
              }&state=${JSON.stringify(state)}
            &redirect_url=${encodeURI(
                `${process.env.REACT_APP_API_URL}/auth/signup`
              )}`}
          >
            {t("로그인")}
          </Nav.Link>
          <Nav.Link className="header-login" href="/web/auth/agreement">
            {t("회원가입")}
          </Nav.Link>
        </>
      );
  }, [auth, name, t]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Navbar as={Container} collapseOnSelect expand="lg">
        <Navbar.Brand href="/web/main">
          <img
            src={lang === "ko" ? korLogo : engLogo}
            width={t("logoWidth")}
            style={{ padding: "10px 0px" }}
            alt="UA_logo"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="header-item"
              href="/web/introduction"
              onMouseEnter={() => setHover1(enter)}
              onMouseLeave={() => {
                setHover1(leave);
              }}
            >
              {t("총학 소개")}
              {props.active === "0" ? active : hover1}
            </Nav.Link>
            <Nav.Link
              className="header-item"
              href="/web/rule"
              onMouseEnter={() => setHover7(enter)}
              onMouseLeave={() => {
                setHover7(leave);
              }}
            >
              {t("학생회칙")}
              {props.active === "rule" ? active : hover7}
            </Nav.Link>
            <Nav.Link
              ref={target}
              className="header-item"
              href="/web/petition"
              onMouseEnter={() => setHover2(enter)}
              onMouseLeave={() => {
                setHover2(leave);
              }}
            >
              {t("학생청원")}
              {props.active === "petition" ? active : hover2}
            </Nav.Link>
            <Nav.Link
              className={`header-item ${props.notice}`}
              href="/web/board/1"
              onMouseEnter={() => setHover3(enter)}
              onMouseLeave={() => {
                setHover3(leave);
              }}
            >
              {t("공지사항")}
              {props.active === "1" ? active : hover3}
            </Nav.Link>
            <Nav.Link
              className="header-item"
              href="/web/welfare"
              onMouseEnter={() => setHover4(enter)}
              onMouseLeave={() => {
                setHover4(leave);
              }}
            >
              {t("학생 복지")}
              {props.active === "welfare" ? active : hover4}
            </Nav.Link>
            <Nav.Link
              className="header-item"
              href="https://cov.kaist.ac.kr/"
              onMouseEnter={() => setHover5(enter)}
              onMouseLeave={() => {
                setHover5(leave);
              }}
            >
              {t("COVID19")}
              {props.active === "covid19" ? active : hover5}
            </Nav.Link>
            <Nav.Link
              className="header-item"
              href="https://drive.google.com/drive/folders/1aYumUwQ5iWFOpxyq5Sk8HhdE8Jj_HinL?usp=sharing"
              onMouseEnter={() => setHover6(enter)}
              onMouseLeave={() => {
                setHover6(leave);
              }}
            >
              {t("예결산안")}
              {hover6}
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text onClick={toggleLang}>
              <span className="language-selector">
                {t("Label:label", { kor: "ENG", eng: "KOR" })}
              </span>
              |
            </Navbar.Text>
            {authButtonBar}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: "1px", backgroundColor: "#ddd" }} />
    </div>
  );
};

export default withRouter(Header);
