# 책상 밑의 핸드폰

> React.js, NodeJS, Socket.io를 이용한 간단한 채팅앱

## Features

#### 구현이 완료된 기능

- 로그인, 회원가입 가능
- 로그인 이후 방 생성 혹은 방 입장 입력창이 나타남
- 방을 생성하거나 방 코드를 입력하고 해당 채팅방 입장
  <!-- - 해당 채팅방에 입장한 후 우측 사이드 바에서 채팅방에 있는 유저 목록 확인 가능 -->
- 하단의 채팅 입력창에 채팅을 입력하고 실시간으로 대화 가능
- 상단의 로그아웃 버튼을 눌러 채팅방에서 나감과 동시에 로그아웃 가능

- 유저가 방에 입장할 때 방 번호 유저 디비에 저장
- 방 번호가 같은 유저들 리스트 랜더링
- 내가 쓴 메세지는 오른쪽 정렬로 보이게 하기

#### 아직 구현이 덜 된 기능

- 유저가 나갔을 때 socket disconnect 인식
- 어드민 계정 만들고 어드민으로 유저 입장, 퇴장 시 환영 메세지 보내기
- 채팅이 쌓였을 경우 채팅창 하단으로 auto scroll 기능
- 로그아웃 하지 않고 채팅방만 나가는 기능

- 로그인 됐을 때만 소켓을 연결하도록 다시 설정하기

## What I learnt

- ❗Socket.io 라이브러리 활용해서 real time 채팅 앱 구현
- Client-side rendering으로 웹 서버, 웹 소켓 서버와 통신
- React.js에서 component 계층구조 연습
- MongoDB, Mongoose를 활용하여 데이터베이스 생성 및 관리
- Universal-cookie 라이브러리로 cookie 생성 및 관리

## Technologies

- Front-end: React.js, JavaScript
- Back-end: Express.js, NodeJS
- Database: MongoDB
- Libraries: Moment.js, Universal-cookie, Mongoose, Socket.io

<!--
Server -> Client

socket.emit() : Sends event to specific client
io.emit(): Sends every connected client
socket.broadcast.emit(): Send to every connected client except socket client itself


io.to(room).emit(): to sends everybody in specific room
socket.broadcast.to(room).emit(): same function as above but limited to specific room
-->
