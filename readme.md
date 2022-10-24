
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/osamhack2022/WEB_Connectogram_ACOC">
    <img src="https://godbell.kr/content/images/2022/10/logo.JPG" alt="Logo" width="300" height="300">
  </a>

<h3 align="center">Connectogram</h3>

  <p align="center">
    軍 사이버 보안의 미래
    <br />
    <a href="https://www.figma.com/file/w4HFPuxqQCViAglWjtuOTC/Connectogram?node-id=179%3A740">View Design Page</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
1. [Connectogram이란?](#connectogram이란?)
	1-1.  [Built With](#built-with)
3. [프로젝트 시작하기](#프로젝트-시작하기)
4. [기능](#기능)
5. [Roadmap](#roadmap)
6. [License](#license)
7. [Contact: Team ACOC](#contact--team-acoc)



<!-- ABOUT THE PROJECT -->
## Connectogram이란?

Connectogram은 軍 사이버 자산들 사이에 일어나는 통신을 시각화하여 분석하는 사이버 위협 분석 도구입니다. 

軍 네트워크를 사용하는 모든 자산의 통신 형태를 분석, 잠재적인 위협과 개선점을 찾아낼 수 있도록 합니다. 본 시스템의 이용자는, 특정 사이버 자산의 통신 기록과 각종 행위를 시각화한 자료를 제공받으며 이를 통해 더욱 빈틈없는 사이버 보안을 구축할 수 있습니다.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
 [![React][React.js]][React-url]
 [![NodeJS][Node.js]][Node-url]
 [![MariaDB][MariaDB]][MariaDB-url]
 [![MySQL][MySQL]][MySQL-url]
 [![Nginx][Nginx]][Nginx-url]
 
 다음과 같은 조건 하에 사용할 수 있습니다.
 - EMCAScript 6 지원 브라우저 (Chrome 77버전 이상 권장)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## 프로젝트 시작하기

개발 환경 조성을 위해 다음과 같은 사전 작업이 필요합니다.
 1. Repository Clone
   ```sh
   git clone https://github.com/osamhack2022/WEB_Connectogram_ACOC.git
   ```
2.1. Front-End NPM 패키지 설치
   ```sh
   cd frontend
   npm install
   ```
2.2. Front-End 실행 (frontend 디렉토리 내에서)
   ```sh
   npm start
   ```
3.1. Back-End NPM 패키지 설치
   ```sh
   cd backend
   npm install
   ```
3.2. Back-End 실행 (backend 디렉토리 내에서)
   ```sh
   pm2 start server.js
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## 기능

* 軍 사이버 통신 상태를 한 눈에 점검할 수 있는 메인 대시보드
	* 현재 접속 중인 장비 수
	* 서버에 등록된 육군 자산 수
	* 유해 및 경고 로그 수
	* 접속자 수 상위 20개 체계 목록
	* 통신 프로토콜 그래프

<img src="https://godbell.kr/content/images/2022/10/Screenshot_20221018-151500_Chrome.jpg">

* 유해 통신 로그 관제
	* 통신 IP 평판조회 및 유해 여부 판단
	* 통신 로그를 기록하여 분석에 사용
	* 장비 정보와 연결 정보를 조회

<img src="https://godbell.kr/content/images/2022/10/0cc5ad22-fdf1-4cd6-8380-8368bab480e1.png">


<!-- ROADMAP -->
## Roadmap

- [x] 인프라 구축
- [x] 기획 및 디자인
- [ ] 기본 기능 개발
	- [x] 로그인 구현
	- [x] 회원가입 구현
	- [ ] 권한 설정 구현
- [ ] 핵심 기능: Connecto-map 개발
	- [ ] 통신 시각화
	- [ ] 통신 데이터 표시
- [ ] 로그 수집 프로그램 개발
- [ ] 로그 수신 기능 개발
- [ ] 메인 대시보드 개발
	- [x] 대시보드 템플릿 구성
	- [ ] 로그 기반 값 표시
	- [ ] Node 검색 기능
- [ ] 자산 관리 대시보드 개발
	- [ ] 대시보드 템플릿 구성
	- [ ] 로그 기반 값 표시

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

MIT License를 따릅니다. 자세한 사항은 `LICENSE` 파일을 참고해 주시기 바랍니다. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact: Team ACOC
팀장 
- 김종하 - 12191579@inha.edu

팀원
- 박길선
- 신현규
- 김경환

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/osamhack2022/WEB_Connectogram_ACOC.svg?style=for-the-badge
[contributors-url]: https://github.com/osamhack2022/WEB_Connectogram_ACOC/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/osamhack2022/WEB_Connectogram_ACOC.svg?style=for-the-badge
[forks-url]: https://github.com/osamhack2022/WEB_Connectogram_ACOC/network/members
[stars-shield]: https://img.shields.io/github/stars/osamhack2022/WEB_Connectogram_ACOC.svg?style=for-the-badge
[stars-url]: https://github.com/osamhack2022/WEB_Connectogram_ACOC/stargazers
[issues-shield]: https://img.shields.io/github/issues/osamhack2022/WEB_Connectogram_ACOC.svg?style=for-the-badge
[issues-url]: https://github.com/osamhack2022/WEB_Connectogram_ACOC/issues
[license-shield]: https://img.shields.io/github/license/osamhack2022/WEB_Connectogram_ACOC.svg?style=for-the-badge
[license-url]: https://github.com/osamhack2022/WEB_Connectogram_ACOC/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=Node.js
[Node-url]: https://nodejs.org/
[MariaDB]: https://img.shields.io/badge/MariaDB-20232A?style=for-the-badge&logo=MariaDB
[MariaDB-url]: https://mariadb.org/
[MySQL]: https://img.shields.io/badge/MySQL-20232A?style=for-the-badge&logo=MySQL
[MySQL-url]: https://www.mysql.com/
[Nginx]: https://img.shields.io/badge/Nginx-20232A?style=for-the-badge&logo=Nginx
[Nginx-url]: https://www.nginx.com/
