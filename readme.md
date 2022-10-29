
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
> 1-1.  [Built With](#built-with)
2. [프로젝트 시작하기](#프로젝트-시작하기)
3. [기능](#기능)
4. [Roadmap](#roadmap)
5. [License](#license)
6. [Contact: Team ACOC](#contact--team-acoc)



<!-- ABOUT THE PROJECT -->
## 🌐 Connectogram 이란?

### 軍 사이버 보안의 미래, Connectogram

커넥토그램은<br />
관제와 위협 분석 지원에 집중합니다.

軍 네트워크를 사용하는 모든 자산의<br />
통신 형태를 분석하여<br />
위협에 노출된 자산과 위협의 종류를<br />
알아낼 수 있도록 합니다.

커넥토그램을 사용하는 사이버 분석팀은<br />
특정 사이버 자산의 통신 기록과 각종 행위를 시각화한 자료를 제공받아<br />
더욱 빈틈없는 사이버 보안을<br /> 
구축할 수 있습니다.

### 왜 커넥토그램인가?

#### 모래 속 바늘

위협이 감지되었을 때,<br />
보안 전문가들은 공격자와 피해자의 행위에 집중합니다.<br />
이때 행위란, 누구와 어떤 내용으로 통신을 주고받았는지를 뜻합니다.

행위 분석은 피곤한 작업입니다. 이러한 문제의 원인은 다음과 같습니다.

- 수많은, 가독성 떨어지는 로그 목록
- 특정한 개체의 행위에 주목한 시스템의 부재

이 때문에 문제를 콕 집어내기란 정말 어려운 일입니다.

#### 행위 분석을 위한 도구의 필요성

軍 내외로 오고가는 수많은 데이터…<br />
만약, 이 모든 통신을 한 눈에 볼 수 있다면 어떨까요?<br />
위협에 처해 있는 단말을 바로 파악할 수 있다면?

#### 그래서 커넥토그램이 제공합니다.

- 모든 자산의 위협 노출 여부를 표시하는 대시보드
- 특정 자산을 대상으로 행위 시각화 자료 생성

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
## ⭐ 프로젝트 시작하기

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
## 🖧 기능

<div align="center">
	<img src="https://user-images.githubusercontent.com/59403191/198613917-f0718996-d754-48ad-9de5-1dec07d9930d.PNG" width="480">
	<img src="https://user-images.githubusercontent.com/59403191/198634845-26288606-61bb-4135-9c83-fbb12baba54f.PNG" width="480">
</div>


* 로그인 및 회원가입
	* 해당 기능을 통해 계정 등록 신청을 할 수 있습니다.
	* 승인된 사용자만 커넥토그램을 이용할 수 있습니다.

<br />

<div align="center">
	<img src="https://user-images.githubusercontent.com/59403191/198637995-faa85945-9b82-4aa9-8d83-e17925c5dbbf.PNG" width="960">
</div>


* 軍 사이버 통신 상태를 한 눈에 점검할 수 있는 메인 대시보드
	* 서버에 등록된 자산을 한 눈에 확인 가능
	* 유해한 자산 확인 가능
	* 자동 새로고침 기능을 통해 실시간 모니터링 가능
	* 금일 사이버 대외기관 동향 확인 가능

<br />

<div align="center">
	<img src="https://user-images.githubusercontent.com/59403191/198642768-40922b07-e03a-440d-a38d-105ee85a27b5.PNG" width="960">
</div>

* 특정 자산의 통신 데이터를 시각화한 상세 대시보드

<br />

<div align="center">
	<img src="https://user-images.githubusercontent.com/59403191/198642802-b2edb3c7-f133-4597-b581-d1302d85cd5b.PNG" width="960">
</div>

* 특정 자산의 통신 데이터를 기반으로 위협 분석 보고서 생성 기능


<!-- ROADMAP -->
## 🗺️ Roadmap

- [x] 인프라 구축
- [x] 기획 및 디자인
- [x] 기본 기능 개발
	- [x] 로그인 구현
	- [x] 회원가입 구현
	- [x] 권한 설정 구현
- [x] 메인 페이지 개발
	- [x] 연결된 디바이스 시각화 기능 구현
	- [x] 자동 새로고침 기능 구현
	- [x] 대외기관 동향 분석 및 시각화
- [x] 핵심 기능: Connecto-map 개발
	- [x] 통신 시각화
	- [x] 통신 데이터 표시
	- [x] 그래프 활용한 부가적인 기능 구현
- [x] 핵심 기능: 위협 분석 보고서 개발
	- [x] 보고서 템플릿 구성
	- [x] 국가별 연결 시각화
	- [x] IP, 프로세스, 프로토콜별 연결 시각화
	- [x] 연결 데이터 기반 클라이언트 위험 척도 개발
- [x] 로그 수집 프로그램 개발
- [x] 로그 수신 기능 개발

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## 📝 License

MIT License를 따릅니다. 자세한 사항은 `LICENSE` 파일을 참고해 주시기 바랍니다. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TEAM INFO -->
## 👥 About Team ACOC
<br>
<table align="left" width="788">
<thead>
<tr>
<th width="130" align="center">📝 NAME</th>
<th width="150" align="center">🚩 ROLE</th>
<th width="150" align="center">🐱 GITHUB</th>
<th width="190" align="center">📩 EMAIL</th>
</tr> 
</thead>
<tbody>
<tr>
<td width="130" align="center">(팀장) 김종하</td>
<td width="150" align="center">FE</td>
<td width="150" align="left">
	<a href="https://github.com/Godbell">
		<img src="http://img.shields.io/badge/Godbell-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="190" align="left">
	<a href="mailto:12191579@inha.edu">
		<img src="https://img.shields.io/badge/12191579@inha.edu-655ced?style=social&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUnv//O4/V2ueOZyOomo9qr0e73+v0nv/8io9r///+dyuqbyeqmzuxotOHt9fxutuL+/v/Z6ff8/v+41/Bbr981pttCqdzM4vSv0u682fD1+v30+f2Pw+dHqt1Srd7a6vjF3/Pg7fljsuBRrd71WwlTAAAACHRSTlPP////////KRn8dkgAAABvSURBVBjTXc/JDoMwDARQA4EwpGXpwtay//8/gn2IYuYQyU/JRCZLeRCyJPNUpFceLDLPP3AyucNHjzFV0GEwCiIUDCgrD04AsYeEoW6e+knY4e6Q6I5Fw74Bf4bX+yMQA6tpfQflh7t++/rl7uufqGgI5kfAXmcAAAAASUVORK5CYII="/>
	</a>
</td>
</tr>
<tr>
<td width="130" align="center">김경환</td>
<td width="150" align="center">FE</td>
<td width="150" align="left">
	<a href="https://github.com/KyoungHwanKim">
		<img src="http://img.shields.io/badge/KyoungHwanKim-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="190" align="left">
	<a href="mailto:kyounghwankim@pusan.ac.kr">
                <img src="https://img.shields.io/badge/kyounghwankim@pusan.ac.kr-655ced?style=social&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABXFBMVEUAAAAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAAW5IAXZAAX44AV5YAV5UAmVMATaAATaAATaAAmVMAmVMAmVMAmVMAmVMAmVMATaAATaAAmVMAmVMAmVMAmVMAmVMAmVMAmVMATaAATaAATaAATaAAmVMAmVMAmVMAmVMAmVMATaAAaIUAmVMAmVMAmVMAmVMAZ4UATaAATaAATaAATaAAUZwAmVMAmVMAmVMAmVMAmVMAUZwATaAATaAATaAATaAATaAATaAATaAATaAATaAATaAATaD///+4w70AAAAAc3RSTlMAAB0vJVVjIzkeCyo+UgQxaGlaRxArIi4kOycFRAwycUxcMw53YiB8i3gPHxFrOn9kUA1OLQSMfYF+AUpLQgaRS0xvlU1tY02FU4ZtaE9JPFmLvbTAbkERLDZJUBFdLDUpOnFgdHZyOVg9RjZeN1tlQxVIrUMxRgAAAAFiS0dEc0EJPc4AAAAHdElNRQfmCh0FAxjagMyiAAAA/klEQVQY02NgYGBgZGJmYWVj5+BkZAADLm4eXj5+AUZBIW4uMF9YhJNXVExcQlJKWkYWqF5OXkEUIiMqpKjEyMCkrMyvoqqmriHKpsmhpczEwKKlraOrp29gqM8hb6StxcKgZGxiamZubmFpbm5mJWqtxGBjK2Zn7+Do5OTo4Gwn4aLHYOzKYufm7uHp6eXtYyfh68fgHyBu5xYYFBwcEupjx69qyyCqGhbuExEZFR0ZERrjEhvHwBSfkJiUnJySmpyclp6RycTAKGrtFw9xWHyWLT/QO1zZOYZZchLs3LnGrHIQGSX+PJd83oLCInEuiHcZmcT9FTKFTZhA3gcA82Uo/f6a4+MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTAtMjlUMDU6MDM6MjQrMDA6MDAOniFTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEwLTI5VDA1OjAzOjI0KzAwOjAwf8OZ7wAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMi0xMC0yOVQwNTowMzoyNCswMDowMCjWuDAAAAAASUVORK5CYII="/>
	</a>
</td>
</tr>
<tr>
	<td width="130" align="center">신현규</td>
	<td width="150" align="center">FE<br></td>
	<td width="150" align="left">
		<a href="https://github.com/stanaly">
			<img src="http://img.shields.io/badge/stanaly-655ced?style=social&logo=github"/>
		</a>
	</td>
	<td width="190" align="left">
		<a href="mailto:tlsgusrb70@jejunu.ac.kr">
			<img src="http://img.shields.io/badge/tlsgusrb70@jejunu.ac.kr-655ced?style=social&logo=data:image/png;base64,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"/>
		</a>
	</td>
	</tr>
<tr>
<td width="130" align="center">박길선</td>
<td width="150" align="center">BE<br></td>
<td width="150" align="left">
	<a href="https://github.com/ksparkbr">
		<img src="http://img.shields.io/badge/ksparkbr-655ced?style=social&logo=github"/>
	</a>
</td>
<td width="190" align="left">
	<a href="mailto:ksparkbr@gmail.com">
		<img src="http://img.shields.io/badge/ksparkbr@gmail.com-655ced?style=social&logo=gmail"/>
	</a>
</td>
</tr>
</tbody>
</table>
<br>


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
