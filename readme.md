## 프로젝트 소개
- 커넥토그램은 군 내 사이버 자산들 사이에 일어나는 통신을 시각화하여 분석하는 사이버 위협 분석 도구입니다. 군 네트워크를 사용하는 모든 자산의 통신 형태를 분석, 잠재적인 위협과 개선점을 찾아낼 수 있도록 합니다.
본 시스템의 이용자는, 특정 사이버 자산의 통신 기록과 각종 행위를 시각화한 자료를 제공받으며 이를 통해 더욱 빈틈없는 사이버 보안을 구축할 수 있습니다.


## 기능 설명
- 수월해진 로그 수집과 시각화
	- 기존의 위협 분석은 군에서 사용하는 각종 보안 장비들에 기록된 내용을 취합하는 과정에서 시작합니다. 특정 IP로부터의 공격이 의심된다면 보안 장비들에 기록된 통신 기록들 중 해당 IP가 포함된 기록을 모두 검색해야 합니다. 이러한 수집 과정은 매우 번거로우며 결과물도 직관적이지 않아 정확한 분석을 하려면 도식화까지 해야 합니다.
커넥토그램은 상기한 모든 과정을 자동으로 수행합니다. 사용자는 그저 조회할 행위자만 정하면 됩니다.

- 위협 분석의 자동화
	- 커넥토그램은 한 발 더 나아갑니다. 시각화된 자료를 제공하는 것에서 그치지 않고, 이러한 자료가 실질적으로 가지는 의미를 제공합니다. 도식화된 그래프의 형태와 통신 빈도수 등의 자료를 바탕으로 특정 행위자의 행위를 분석하여 의심되는 공격 유형을 제시합니다.

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 

### Back-end
 - Node.js 16.17.0 LTS version
 - Node Express
 - Mysql2/Promise Library
 - Mysql Session Library

### Front-end
 - React
 - Redux
 - MUI (Material UI) : React Component Library

 ### Server
 - Oracle Cloud 2 Instances
 - MariaDB
 - pm2 (Back-end 구동 用)
 - nginx (Front-end 구동 用)

### Communications
 - Notion
 - Figma

## 설치 안내 (Installation Process)
```bash
$ git clone https://github.com/osamhack2022/WEB_Connectogram_ACOC.git
$ cd [백엔드/프론트엔드 디렉터리]
$ npm install
```

## 백엔드 구동 절차
```bash
$ pm2 start server.js
```

## Team Info
- 김종하
- 신현규
- 김경환
- 박길선

## Copyleft / End User License
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

※ [라이선스 비교표(클릭)](https://olis.or.kr/license/compareGuide.do)

※ [Github 내 라이선스 키워드(클릭)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

※ [\[참조\] Github license의 종류와 나에게 맞는 라이선스 선택하기(클릭)](https://flyingsquirrel.medium.com/github-license%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EB%82%98%EC%97%90%EA%B2%8C-%EB%A7%9E%EB%8A%94-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0-ae29925e8ff4)