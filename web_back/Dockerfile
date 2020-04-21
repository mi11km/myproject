FROM python:3.8-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app/

RUN apk update && \
    apk add --no-cache build-base mariadb-connector-c-dev libjpeg-turbo-dev

COPY requirements.txt .
RUN pip install -U pip && \
    pip install -r requirements.txt
