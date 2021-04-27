# stage1 - build react app first 
FROM node:15.4.0-alpine3.10 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn --silent
COPY . /app
RUN touch .env && echo $REACT_APP_AUTH0_DOMAIN > /app/.env \
               && echo $REACT_APP_AUTH0_CLIENT_ID >> /app/.env \
               && echo $REACT_APP_TENANT_API_CLIENT_ID >> /app/.env \
               && echo $REACT_APP_TENANT_API_CLIENT_SECRET >> /app/.env \
               && echo $REACT_APP_TENANT_API_AUDIENCE >> /app/.env

RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.19.5-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh 
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]


