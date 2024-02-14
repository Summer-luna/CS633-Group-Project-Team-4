FROM node:18-alpine as builder

WORKDIR /usr/src/app

# Copy over the source
COPY package.json .
RUN npm install
COPY . . 

RUN npm run prisma:generate

RUN npm run build
ENV NODE_ENV production

FROM node:18-alpine as production

WORKDIR /usr/src/app

# Copy over the build
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/prisma ./prisma
# comment when push to github
# COPY --from=builder /usr/src/app/.env ./prisma

# Install production dependencies
RUN npm install --omit=dev
RUN npm run prisma:generate

# Expose the default port
EXPOSE 3000

CMD ["npm", "run", "start:deploy"]