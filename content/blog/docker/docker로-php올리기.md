---
title: Docker로 PHP올리기
date: 2021-09-07 22:09:83
category: docker
thumbnail: { https://cdn.pixabay.com/photo/2021/08/26/18/18/flower-6576831_960_720.jpg }
draft: false
---

참고 사이트: 

[docker 이미지로 apache및 php 개발환경 구축](https://velog.io/@wimes/docker-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A1%9C-apache%EB%B0%8F-php-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95)

일단 해당 php 프로젝트가 있는 폴더에서 Dockerfile을 생성한다.

```docker
FROM ubuntu:18.04

# Avoiding user interaction with tzdata
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y apache2 # install Apache web server (Only 'yes')
RUN apt-get install -y software-properties-common # php 5.6(이전버전) 설치를 위해
RUN add-apt-repository ppa:ondrej/php # For Installing PHP 5.6
RUN apt-get update
RUN apt-get install -y php5.6

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]
```

그리고 docker build를 진행한다.

```bash
docker build . -t my-php
```

그럼 도커 이미지가 만들어졌다.

그 이미지를 이용해서 컨테이너를 올리자.

```bash
docker run -d --name [name] -p 8080:80 -v /home/ubuntu/example/html:/var/www/html example
```

같은 식으로 실행한다.

성공적으로 컨테이너가 실행되었으면 `localhost:8080` 에 접속해보면 된다.