# Kiosk MONGODB Ver

Kiosk 프로젝트를 위해 만든 간단한 CRUD API 입니다.
AWS MySQL 호스팅 만료가 가까워 짐에 따라 MongoDB로의 프로젝트 이전.

## 사용법

```bash
  git clone https://github.com/ldy9212/KioskB

  cd kioskb

  npm i  ## (node v16.13.1 LTS)

  npm run start:dev
```

## .env

root 폴더에 .env를 만들고 해당 사항을 넣어야 정상 작동합니다.

```
PORT=8000

MYSQL_ID = ''

MYSQL_PW = ''

MYSQL_PORT =

MYSQL_HOST = ''

MYSQL_DATABASE = ''
```

## Swagger

Swagger Module을 이용해 문서화 했기 때문에 작동 이후

http://localhost:8000/docs 에서 작동시킬수 있습니다.
