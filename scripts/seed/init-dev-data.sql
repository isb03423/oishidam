-- PostgreSQL 공식 이미지가 빈 데이터 볼륨을 초기화할 때 한 번 실행한다.
SET oishidam.seed_environment = 'development';
\ir /opt/oishidam/seed/docker-dev.sql
