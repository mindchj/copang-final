import React from "react";
import logoImg from "../src/image/logo.png";

const Footer = () => {
  return (
    <div>
      <footer id="footer" class="footer_new">
        <div class="footer-layer1 is-narrowed">
          <a href="https://www.aboutcoupang.com/ko/" target="_blank">
            학원소개
          </a>
          <a href="https://rocketyourcareer.kr.coupang.com" target="_blank">
            인재채용
          </a>
          <a href="https://wing.coupang.com/vendor/joining/welcome?inflow=WEB_FOOTER_B">
            입점 / 제휴문의
          </a>
          <a href="https://csmessenger.coupang.com/cs-center/notice/main">
            공지사항
          </a>
          <a href="https://csmessenger.coupang.com/cs-center/voc/main">
            고객의 소리
          </a>
          <a href="/np/policies/terms">이용약관</a>
          <a href="/np/policies/privacy">
            <b>개인정보 처리방침</b>
          </a>
          <a href="https://rocketpay.coupang.com/rocketpay/operationTerms/coupangPcFooter">
            코팡페이 이용약관
          </a>
          <a href="https://rocketpay.coupang.com/rocketpay/coupangpay-terms-v2/privacy-policy">
            <b>코팡페이 개인정보처리방침</b>
          </a>
          <a href="/np/safety">신뢰관리센터</a>
          <a href="https://partners.coupang.com/" target="_blank">
            제휴마케팅
          </a>
          <a href="https://ads.coupang.com" target="_blank">
            광고안내
          </a>
        </div>
        <div class="footer-layer2">
          <h1>
            <a href="/" title="COPANG">
              <img src={logoImg} alt="logo" style={{ width: "204px" }} />
            </a>
          </h1>
          <div class="footer-content">
            <address>
              코팡(주) | 대표 : 추현진, 이성묵
              <br />
              서울시 강남대로 94번길 비트캠프 901호 <br />
              <a
                href="http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=1208800767"
                target="_blank"
                class="licensee"
                title="수강생 정보 확인"
              >
                사업자정보 확인 &gt;
              </a>
            </address>
            <div class="contact-info">
              <a
                href="https://csmessenger.coupang.com/cs-center/chat/main"
                class="call-center"
                title="365 고객센터"
              >
                <strong>365고객센터</strong> | 비트캠프
                <br />
                <em>901-901</em>
                서울시 강남대로 94번길 비트캠프 901호
                <br />
                <span class="contact-fax">email : help@copang.com</span>
              </a>
            </div>
            <p class="safe-service">
              <strong>비트캠프 수료증 안내</strong>
              <br />
              <span>
                당사는 고객님이 비트캠프 교육
                <br />
                수료한 사실에 대해 진심으로 <br />
                축하합니다.
                <br />
              </span>
              <a
                href="javascript:;"
                id="serviceCheck"
                class="service-check"
                title="서비스 가입사실 확인"
              >
                교육 수료확인 &gt;
              </a>
            </p>
          </div>
        </div>
        <div class="footer-layer3 slide-unit">
          <div
            class="certification-list"
            style={{
              width: "968px",
              height: "80px",
              margin: "0 auto",
              position: "relative",
              backgroundPosition: "-44px -92px",
              // background: url(//static.coupangcdn.com/image/coupang/common/footer_asset_v10.png) no-repeat
            }}
          ></div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
