
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# 5174번 포트 노출
EXPOSE 5173

# npm start 스크립트 실행
CMD ["npm", "start"]

