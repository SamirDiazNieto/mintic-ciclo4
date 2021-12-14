from node:16-alpine
WORKDIR /user/src/app
copy package*.json ./
RUN npm install react-scripts@4.0.3 
run npm install 
ENV URL_PATH=http://3.13.152.194:5010/graphql
copy . .
EXPOSE 3001
CMD [ "npm", "start"]