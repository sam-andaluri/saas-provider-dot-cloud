# stage1 - build react app first 
FROM node:15.4.0-alpine3.10 as build

ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_TENANT_API_CLIENT_ID
ARG REACT_APP_TENANT_API_CLIENT_SECRET
ARG REACT_APP_TENANT_API_AUDIENCE

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn --silent
COPY . /app

RUN echo "REACT_APP_AUTH0_DOMAIN=$REACT_APP_AUTH0_DOMAIN" > /app/.env.production && \
    echo "REACT_APP_AUTH0_CLIENT_ID=$REACT_APP_AUTH0_CLIENT_ID" >> /app/.env.production && \
    echo "REACT_APP_TENANT_API_CLIENT_ID=$REACT_APP_TENANT_API_CLIENT_ID" >> /app/.env.production && \
    echo "REACT_APP_TENANT_API_CLIENT_SECRET=$REACT_APP_TENANT_API_CLIENT_SECRET" >> /app/.env.production && \
    echo "REACT_APP_TENANT_API_AUDIENCE=$REACT_APP_TENANT_API_AUDIENCE" >> /app/.env.production

RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.20-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh 
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]


