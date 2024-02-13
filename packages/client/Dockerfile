FROM node:latest as builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
RUN npm run build

FROM nginx as prod

EXPOSE 80
# Copy your custom nginx.conf file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy React Build into html folder
COPY --from=builder /app/dist /usr/share/nginx/html
COPY generate_env.sh /

RUN chmod +x /generate_env.sh
# Execute shell script and start Nginx
CMD ["/bin/bash", "-c", "/generate_env.sh && nginx -g 'daemon off;'"]