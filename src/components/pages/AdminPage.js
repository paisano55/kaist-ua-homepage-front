import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import ReactFileReader from "react-file-reader";
import { Header, Footer, CustomModal } from "../organisms";
import { withRouter } from "react-router-dom";
import { BoardHeader } from "../molecules";

import * as paymentAPI from "../../lib/api/payment";
import * as bannerAPI from "../../lib/api/banner";


// Site Management page for admin

const AdminPage = () => {
  const [idList, setIdList] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState(null);
  const [mainBannerList, setMainBannerList] = useState(null);

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

  const handleYoutubeToggle = (enable) => {
    /*
    1. Check YT banner exists
    2. If exists, set to {enable}
    */
    bannerAPI.list().then(res => {
      const ytBanner = res.data.filter(banner => banner.image === "Youtube Livestream (EMBED)");
      if (ytBanner.length) {
        bannerAPI.update(ytBanner[0].id, { isActive: enable }).then(res => {
          console.log(res);
        });
      } else {
        bannerAPI.create({ image: "Youtube Livestream (EMBED)", link: "https://www.youtube.com/channel/UCOyNLfCKA5k0PotGj4xTPmg", isActive: enable });
      }
    }).catch(err => {
      console.warn(err);
    });
  };

  const handleBannerListSubmit = (bannerListStr) => {
    /*
    1. Get all banners
    2. Compare with bannerListStr
    3. Set isActive accordingly
    */
    const bannerList = bannerListStr.split("\n");
    bannerAPI.list().then(res => {
      res.data.forEach(banner => {
        const bannerIndex = bannerList.indexOf(banner.image);
        const isActive = bannerIndex > -1;
        bannerAPI.update(banner.id, { isActive }).then(res => {
          console.log(res);
        }).catch(err => {
          console.warn(err);
        });
      });
    });
  };

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
        <Form>
          <Form.Group>
            <Form.Label>유튜브 링크</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://www.youtube.com/embed/live_stream?channel=UCOyNLfCKA5k0PotGj4xTPmg"
              value={youtubeLink}
              onChange={e => setYoutubeLink(e.target.value)}
            />
            <Form.Text className="text-muted">
              유튜브 라이브 스트리밍용 링크를 입력해주세요.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Button
              disabled={youtubeLink ? false : true}
              onClick={() => handleYoutubeToggle()}
            >
              등록
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Container className="flex-grow-1 p-3">
        <BoardHeader title="이미지 배너 관리" />
        <Form>
          <Form.Group>
            <Form.Label>메인 페이지 배너 목록</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={mainBannerList}
              onChange={e => setMainBannerList(e.target.value)}
            />
            <Form.Text className="text-muted">
              메인 페이지에 띄울 배너의 이미지 링크를 입력해주세요. <br />
              이미지 링크는 한 줄에 하나씩 입력해주세요.
            </Form.Text>
            <Button
              onClick={() => handleBannerListSubmit()}
            >
              등록
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default withRouter(AdminPage);
