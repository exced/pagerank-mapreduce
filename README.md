# Pagerank
Pagerank algorithm with mapreduce mongoDB + nodeJS

## Install
### Using the Node Package Manager
```bash
npm install
```
### Using yarn
```bash
yarn install
```  

## Run Pagerank
To prepare databse
```bash
npm run build
```
To run the pagerank mapreduce algorithm and see the result in terminal
```bash
npm run start
```  

## Debugging
In mongo functions you can't access console var, but mongoDB provides us a print statement though:
print('statement')
To see the log file on Mac OS 
```bash
tail -f /usr/local/var/log/mongodb/mongo.log
```

Otherwise you can specify the log file path when starting mongo daemon (mongod) process 
```bash
mongod --logpath D:\path\to\log.txt
```  

## Datas
You have example of graph to generate in methods folder named 'genDatas'.
Run following to save in mongoDB
```bash
node methods/genDatas.js
```  
You can remove all datas with
```bash
node methods/removeDatas.js
``` 
