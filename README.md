# Pagerank
Pagerank algorithm with mapreduce mongoDB + nodeJS

# Install
Using the Node Package Manager
```bash
npm install
```  

# Datas
You have examples of graph to generate in methods folder named 'genDatas' + x.
Run following to save in mongoDB
```bash
node methods/genDatas.js
```  
You can remove all datas with
```bash
node methods/removeDatas.js
```  

# Run Pagerank
To run the pagerank mapreduce algorithm and see the result in terminal
Don't forget to change the number of occurence of mapreduce if you don't want it to run with all datas stored in the Database 
```bash
node methods/pagerank.js
```  

# Run Graph rendering 
```bash
npm start
```  
