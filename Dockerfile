FROM node:14.14.0-alpine3.12

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . ./

RUN apk add --update --no-cache curl \
  python3 && ln -sf python3 /usr/bin/python

RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Downloading gcloud package
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz

# Installing the package
RUN mkdir -p /usr/local/gcloud \
  && tar -C /usr/local/gcloud -xvf /tmp/google-cloud-sdk.tar.gz \
  && /usr/local/gcloud/google-cloud-sdk/install.sh

# Adding the package path to local
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

CMD gcloud auth activate-service-account --key-file=/app/service-account/firebase-adminsdk.json \
  && GOOGLE_APPLICATION_CREDENTIALS=/app/service-account/firebase-adminsdk.json yarn start
