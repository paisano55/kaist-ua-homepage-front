import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import ReactFileReader from "react-file-reader";
import { Header, Footer, CustomModal } from "../organisms";
import { withRouter } from "react-router-dom";
import { BoardHeader } from "../molecules";
import DatePicker from "react-datepicker";

import * as paymentAPI from "../../lib/api/payment";
import * as bannerAPI from "../../lib/api/banner";
import * as adminsAPI from "../../lib/api/admin";


// Site Management page for admin

const AdminPage = () => {
  const [idList, setIdList] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("https://www.youtube.com/embed/live_stream?channel=UCOyNLfCKA5k0PotGj4xTPmg");
  const [youtubeBannerActive, setYoutubeBannerActive] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [bannerid, setBannerid] = useState(1);
  const [init, setInit] = useState(false);

  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [year, setYear] = useState(2023);
  const [semester, setSemester] = useState("spring");
  const [deadlineYear, setDeadlineYear] = useState(2023);
  const [deadlineSemester, setDeadlineSemester] = useState("spring");
  const [studentFeeDeadline, setStudentFeeDeadline] = useState(new Date());

  const [showUploadConfirmModal, setShowUploadConfirmModal] = useState(false);
  const [showUploadSuccessModal, setShowUploadSuccessModal] = useState(false);
  const [showUploadFailModal, setShowUploadFailModal] = useState(false);

  const handleUploadModalClose = () => handleUploadModalOpen("");
  const handleUploadModalOpen = current => {
    setShowUploadConfirmModal(current === "confirm");
    setShowUploadSuccessModal(current === "success");
    setShowUploadFailModal(current === "fail");
  };

  const verifyIdList = fileContent => {
    const studentDataCollection = [];
    for (var i = 3; i < fileContent.length - 1; i++) {
      const currentRow = fileContent[i].split(",");
      const studentId = currentRow[1].trim();
      const studentData = [studentId];
      for (var j = 13; j < currentRow.length; j++) {
        const currentValue = currentRow[j].trim();
        studentData.push(currentValue);
      }
      studentDataCollection.push(studentData);
    }
    return studentDataCollection;
  };

  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      setIdList(verifyIdList(reader.result.split("\n")));
    };
    setFileName(files[0].name);
    reader.readAsText(files[0]);
  };

  const submitBanner = (e) => {
    /* get all banners */
    /* if banner with id exists, update it */
    /* if banner with id does not exist, create it */
  }
  const deleteBanner = (index) =>
    setBannerList(bannerList.filter((item, i) => i !== index));

  const addNewBanner = () => {
    console.log(bannerid, [...bannerList, { index: bannerid, image: "", link: "", isActive: false }]);
    setBannerList([...bannerList, { index: bannerid, image: "", link: "", isActive: false }]);
    setBannerid(bannerid + 1);
  }

  const renderBannerList = bannerList.map((banner, index) =>
    <Row key={index + 1}>
      <Col>
        <Form.Control
          type="text"
          value={banner.image}
          onChange={e => setBannerList(bannerList.map((item, i) => i === index ? { ...item, src: e.target.value } : item))}
          label={"새 배너 이미지"}
        />
      </Col>
      <Col>
        <Form.Control
          type="text"
          value={banner.link}
          onChange={e => setBannerList(bannerList.map((item, i) => i === index ? { ...item, href: e.target.value } : item))}
          label={"새 배너 링크 대상"}
        />
      </Col>
      <Col>
        <Form.Check
          type="switch"
          value={banner.isActive}
          onChange={e => setBannerList(bannerList.map((item, i) => i === index ? { ...item, isActive: e.target.checked } : item))}
          label={"메인에 보이기"}
        />
      </Col>
      <Col>
        <Button variant="danger" onClick={e => deleteBanner(index)}>X</Button>
      </Col>
    </Row>
  )

  const createYoutubeBanner = () => {
    bannerAPI.create({ image: "Youtube Livestream (EMBED)", link: youtubeLink, isActive: false }
    ).catch(err => {
      console.warn(err);
    });
  }

  const handleYoutubeToggle = () => {
    /*
    1. Check YT banner exists
    2. If exists, set to {youtubeBannerActive}
    */
    bannerAPI.list().then(res => {
      const ytBanner = res.data.filter(banner => banner.image === "Youtube Livestream (EMBED)");
      if (ytBanner.length) {
        bannerAPI.update(ytBanner[0].id, { image: "Youtube Livestream (EMBED)", link: youtubeLink, isActive: youtubeBannerActive }).then(res => {
          console.log(res);
        });
      } else {
        bannerAPI.create({ image: "Youtube Livestream (EMBED)", link: youtubeLink, isActive: youtubeBannerActive });
        console.log("NO BANNER!", youtubeLink, youtubeBannerActive);
      }
    }).catch(err => {
      console.warn(err);
    });
  };

  useEffect(() => {
    bannerAPI.list().then(res => {
      const ytBanner = res.data.filter(banner => banner.image === "Youtube Livestream (EMBED)");
      if (ytBanner.length) {
        setYoutubeLink(ytBanner[0].link);
        setYoutubeBannerActive(ytBanner[0].isActive);
      }
    }).catch(err => {
      console.warn(err);
    });
    console.log("INIT");
  }, [init]);

  useEffect(() => {
    handleYoutubeToggle();
  }, [youtubeBannerActive]);


  const getStudentFeePayerList = ({ year, semester }) => {
    /*
    TODO : Export Excel/CSV from API response
    paymentAPI.getAll().then(res => {
      const studentDataCollection = res.data.map(payment => {
        return [payment.studentId, payment.paymentDate, payment.amount];
      });
   
    }).catch(err => {
      console.warn(err);
    });
    */
  }

  const submitDeadline = () => {
    console.log("SUBMIT-DEADLINE WIP");
    console.log(studentFeeDeadline, deadlineYear, deadlineSemester);
  }

  const handlePaymentCSV = () => {
    const body = {
      studentDataCollection: idList
    };
    paymentAPI
      .bulkUpload(body)
      .then(res => {
        handleUploadModalOpen("success");
      })
      .catch(err => handleUploadModalOpen("fail"));
  };

  const addAdmin = e => {
    e.preventDefault();
    adminsAPI
      .register({ newEmail, newPassword, adminKey })
      .then(res => {
        handleUploadModalOpen("success");
      })
      .catch(err => handleUploadModalOpen("fail"));
  };

  return (
    <div
      style={{ minHeight: "100vh", fontFamily: "NanumSquare" }}
      className="d-flex flex-column"
    >

      <CustomModal
        title={`학생회비 납부 기록`}
        body={`${fileName}를 등록하시겠습니까?`}
        show={showUploadConfirmModal}
        handleConfirm={handlePaymentCSV}
        handleClose={handleUploadModalClose}
        closeMessage="취소"
        confirmMessage="확인"
      />
      <CustomModal
        title={`등록이 완료되었습니다.`}
        show={showUploadSuccessModal}
        handleConfirm={handleUploadModalClose}
        confirmMessage="확인"
      />
      <CustomModal
        title={`⚠️등록 중 오류가 발생했습니다.`}
        show={showUploadFailModal}
        handleConfirm={handleUploadModalClose}
        confirmMessage="확인"
      />
      <Header />
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="학생회비 납부자 등록" />
        <Form>
          <Form.Group>
            <Form.Label>파일 선택</Form.Label>
            <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
              <Button variant="outline-primary">업로드</Button>
            </ReactFileReader>
            <Form.Text className="text-muted">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/spreadsheets/d/1bZ2ED5DMh4NHTSkaYJ7MRE6egMOi6Ms3yjYUKFEGnw0/edit#gid=0"
              >
                이 파일
              </a>
              과 같은 형식을 .csv로 저장한 뒤 올려주세요. <br />새 학기에 대한
              납부 정보를 추가 할 경우, 맨 오른쪽에 열을 추가해주세요.
            </Form.Text>
            <Form.Text className="text-muted">
              {fileName
                ? `선택된 파일: ${fileName}, 납부자 총 ${idList.length}명`
                : "선택된 파일 없음"}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Button
              disabled={fileName ? false : true}
              onClick={() => handleUploadModalOpen("confirm")}
            >
              등록
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="유튜브 배너 활성화" />
        <form>
          <Form.Group>
            <Form.Label>유튜브 링크</Form.Label>
            <Form.Control
              type="text"
              value={youtubeLink}
              onChange={e => setYoutubeLink(e.target.value)}
            />
            <Form.Text className="text-muted">
              유튜브 라이브 스트리밍용 링크를 입력해주세요. 변경 후 꼭 새로고침하여 확인해 주세요.
            </Form.Text>
            <Button
              disabled={youtubeLink ? false : true}
              onClick={() => { createYoutubeBanner(youtubeLink) }}
            >
              등록
            </Button>
            <Button
              onClick={() => { setYoutubeBannerActive(true); handleYoutubeToggle() }}
              disabled={youtubeBannerActive === true}
            >
              활성화
            </Button>
            <Button
              onClick={() => { setYoutubeBannerActive(false); handleYoutubeToggle() }}
              disabled={youtubeBannerActive === false}
            >
              비활성화
            </Button>
          </Form.Group>
        </form>
      </Container>
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="학생회비 납부명단" />
        <Form>
          <Form.Group>
            <Form.Label>
              연도 입력 (예: 2020년도 1학기의 경우 2020)
            </Form.Label>
            <Form.Control
              type="text"
              onChange={value => setYear(value.target.value)}
            />
            <Form.Label>학기 선택</Form.Label>
            <Form.Control
              as="select"
              value={semester}
              onChange={e => setSemester(e.target.value)}
            >
              <option value="spring">봄학기</option>
              <option value="fall">가을학기</option>
            </Form.Control>
            <Button onClick={getStudentFeePayerList({ year, semester })}>다운로드</Button>
            <Form.Text className="text-muted">
              *제작 시각, IP, 이용자 ID가 기록됩니다.
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="이미지 배너 관리" />
        <form onSubmit={submitBanner}>
          <Form.Group>
            <Form.Label>메인 페이지 배너 목록</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Label>이미지 링크</Form.Label>
                </Col>
                <Col>
                  <Form.Label>링크 대상</Form.Label>
                </Col>
                <Col>
                  <Form.Label>   </Form.Label>
                </Col>
              </Row>
              {renderBannerList}
              <Row>
                <Button onClick={addNewBanner}>+</Button>
                <Button type="submit">저장</Button>
              </Row>
            </Container>
          </Form.Group>
        </form>
      </Container>
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="학생회비 납부기한" />
        <form onSubmit={submitDeadline()}>
          <Form.Group>
            <Form.Label>
              연도 입력 (예: 2020년도 1학기의 경우 2020)
            </Form.Label>
            <Form.Control
              type="text"
              onChange={value => setDeadlineYear(value.target.value)}
            />
            <Form.Label>학기 선택</Form.Label>
            <Form.Control
              as="select"
              value={semester}
              onChange={e => setDeadlineSemester(e.target.value)}
            >
              <option value="spring">봄학기</option>
              <option value="fall">가을학기</option>
            </Form.Control>

            <Form.Label>납부기한</Form.Label>
            <DatePicker selected={studentFeeDeadline} onChange={date => setStudentFeeDeadline(date)} />

          </Form.Group>
        </form>
      </Container>
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="어드민 계정 관리" />
        <form className="login-form" onSubmit={addAdmin}>
          <Form.Label>어드민 계정 추가</Form.Label>
          <Form.Group>
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              onChange={value => setEmail(value.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="text"
              onChange={value => setPassword(value.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>어드민 생성 키</Form.Label>
            <Form.Control
              type="text"
              onChange={value => setAdminKey(value.target.value)}
            />
          </Form.Group>
          <Button type="submit">
            계정 추가
          </Button>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default withRouter(AdminPage);
