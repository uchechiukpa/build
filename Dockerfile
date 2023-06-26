FROM node:18.16.1-alpine3.18
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:app package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
