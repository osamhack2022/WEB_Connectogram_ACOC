## backend
* Framework : Node.js (Express)
* DB : Maria DB
* 디렉터리 구조
- src
	- config
		- global_config.js : Node 구동을 위한 설정값이 들어있음
	- db
		- querystore : 쿼리 모음집
		- execute-query.js : 쿼리를 실행하기 위한 로직
		- query-builder.js : 쿼리를 실행할수 있도록 쿼리를 만들어줌
		- sql-map.js : querystore에서 정의된 쿼리를 호출하는 로직
	- router
		- api-user-router.js : 회원가입, 로그인처리 등을 위한 router
		- api-extension-router.js : 크롬 확장기능에서 요청하는 request 처리를 위한 router

## chrome-extension
- 페이지를 이동하면 해당 페이지에서 요청하는 모든 네트워크 퍼포먼스를 서버에 전송하는 기능

## frontend
- main으로 merge 될때마다 pull 해서 관리 (터치 X)

## 브랜치관리
- 박길선