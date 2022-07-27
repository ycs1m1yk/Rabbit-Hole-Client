![header](https://capsule-render.vercel.app/api?&type=waving&color=0:6F52D9,100:6700E6&height=300&section=header&text=Rabbit-Hole&desc=Team%208&descSize=35&descAlign=67&fontSize=90&fontAlign=50&fontAlignY=45&fontColor=fff&animation=twinkling)


# 🐇 Rabbit-Hole: 엘리스 레이서 커뮤니티 서비스 
> 레이서들의 원활한 레이스를 위한<br />
> 레이서들의 참담한 앞길에 한 줄기 빛이 될<br />
> 보다 효율적인 학습을 위한<br />
> 레이서의, 레이서에 의한, 레이서를 위한<br />
> 엘리스 레이서 지망생 및 수강생의 정보 공유 및 네트워킹을 위한 커뮤니티 서비스입니다.

<br />

##  :book: 프로젝트 소개
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :rabbit: Rabbit-hole은 이상한 나라의 엘리스의 첫번째 챕터 'Down the Rabbit-Hole'에서 왔습니다. <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :checkered_flag: 레이서들이 엘리스 트랙 첫번째 챕터부터 함께하는 커뮤니티가 되고자 합니다.

<br />
<br />

##  :bulb: 프로젝트 기획 의도

>후배 기수들에게 직접 의견을 구한 결과, 엘리스 커뮤니티의 필요성을 느꼈습니다.<br>
>저희가 했던 고민을 그들도 똑같이 하고 있기 때문에 우리가 해결해온 고민들을 공유하고, 더욱 더 빠른 성장을 이루어 낼 수 있을 것입니다.

- 레이서가 원활한 레이스를 펼칠 수 있도록, 졸업생 및 동료 레이서와 질의응답을 할 수 있습니다.

- ~~졸업생 레이서가 ‘당근’을 활용하여 저렴하고 실용적인 멘토링 서비스를 제공합니다.~~

- 레이서가 제작한 개인 / 팀 프로젝트를 게시하고 홍보할 수 있습니다.

<br />

##  :bulb: 프로젝트만의 차별점, 기대 효과

>그동안 레이서들이 가지고 있는 소통의 창구가 디스코드 채널 외에는 별다른 수단이 없었습니다.<br/>
>따라서 조금 더 흥미로운 컨텐츠를 제공해 레이서들의 다양한 니즈를 충족시킬 수 있는<br/>
>엘리스만의 커뮤니티 사이트를 만든다면 더욱 원활한 소통이 이루어질 수 있을 것입니다.

- 엘리스 코치님들이 부재중일때 선배기수들의 답변 가능 (늦은 밤, 새벽, 주말 등)

- 디스코드에서 질의응답을 하면 양질의 문답이 사라지는 단점이 있음. 레이서들은 커뮤니티에서 위키처럼 질문을 찾아보면서 궁금한 점을 즉시 해소할 수 있음

- 레이서들의 전반적인 성취도 향상

- 졸업생 - 레이서간 네트워킹을 활용하여 커리어 또는 프로젝트에 관한 조언을 얻을 수 있음
  
<br />

## :nut_and_bolt: 서비스 주요 기능

<br />

### 메인 기능
<br />

#### 커뮤니티 게시판(/board): 자유, 질의응답, 스터디 모집 게시판

- 검색 
- 정렬(최신순, 인기순) , 
- 페이지네이션 
- 게시글 등록
- 커뮤니티에 참여를 독려하기 위한 당근 시스템
#### 게시글 상세 (/board/detail)

- 게시글, 댓글 확인
- 게시글 조회수 확인
- 게시글, 댓글 좋아요
- 게시글 채택( 질의응답 게시판 )
- 댓글 등록 (게스트는 불가능)
- 댓글 수정, 삭제
- 게시글 수정, 삭제

#### 게시글 검색(/board/search)
#### 프로젝트 갤러리(/projects)
- 프로젝트 생성 및 프로젝트 Valitdation
- 프로젝트 목록 조회
- 정렬(최신순, 인기순)
- 개수별 모아보기
- 페이지네이션
#### 프로젝트 상세(/projects/detail)
- 프로젝트 수정 및 삭제
- 댓글 작성 및 삭제
- 마크다운 문법 지원
#### 프로젝트 검색(/projects/search)
#### 마이페이지(/mypage)
- 프로필 조회 및 수정
- 프로필 이미지 설정
- 게시글 및 프로젝트 관리
#### 관리자페이지(/admin)
- 역할별 모든 유저 조회
- 유저 강제 퇴장
- 레이서 인증 시스템 (guest->racer)
- 인증유저 메일 발송
- 게시판별 게시글 조회
- 게시글 강제 삭제
- 모든 프로젝트 조회
- 프로젝트 강제삭제
#### 프로필확인(/profile)
- 유저 프로필 조회
- 유저 블로그, 깃허브 페이지 조회 및 이동 가능


<br />

### 서브 기능
<br />

#### 회원가입(/github/register)
- Valitaion
#### 로그인(/github/logine)
- github OAuth를 통한 간편한 로그인
- 회원 정보 없을 경우 추가 정보 입력 후 가입
#### 채팅(/github/logine)
- 채팅방 설정가능(현재는 전체방만)
- 로그인 사용자만 이용가능
<br />

##  :newspaper: 프로젝트 구성도

### 프로젝트 구조도

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4dac4005-b11d-4b08-9a92-b1a765b2b832/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EA%B5%AC%EC%A1%B0%EB%8F%84.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220727%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220727T051603Z&X-Amz-Expires=86400&X-Amz-Signature=876cc96c96e9be23b98dccc0134da24df04916de3f0b8492a6d7dc515cc06ccf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25ED%2594%2584%25EB%25A1%259C%25EC%25A0%259D%25ED%258A%25B8%25EA%25B5%25AC%25EC%25A1%25B0%25EB%258F%2584.png%22&x-id=GetObject" width=1000/>
###  :tools: Tech

<br />

#### :hammer: 프론트엔드
<br />

![ReactJS](https://img.shields.io/badge/ReactJS-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)<br  />![Styled-Components](https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)<br  />![Recoil](https://img.shields.io/badge/Recoil-007af4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiMwMDdhZjQiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjkwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=&logoColor=white)  ![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=fff)<br  />![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

#### :wrench: 백엔드
<br />

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![express.js](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white)<br/>
![mongodb](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Amazon S3](https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white)<br/>
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white)<br/>
![nginx](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white)


<br />

###  와이어프레임

- [Rabbit-hole-Figma](https://www.figma.com/file/wATGGnMmpwqmi9sotr8CAM?embed_host=notion&kind=&viewer=1)

<br />

### ERD

- [Rabbit-hole-Schema.drawio](https://app.diagrams.net/#G1qNIzJQOb63OoJ2LYzeWAhqwIY7_L_KvA)

<br />

### API DOCS

- [Rabbit-hole-Postman.docs](https://documenter.getpostman.com/view/18759067/UzJJsGkX#960344b7-13d3-4c13-ad93-f7e01b97b33d)

<br />

##  :handshake: 프로젝트 팀원 역할 분담

<br />

| 이름 | 역할 |
| --- | :---: |
| 천현우 | 백엔드 / 팀장 |
| 김주현 | 프론트엔드 |
| 설재혁 | 프론트엔드 |
| 신윤수 | 백엔드 |
| 이승훈 | 프론트엔드 |
| 이혜성 | 프론트엔드 |
