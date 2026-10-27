/*

git bash on vsCode : 
docker run -it --name test-container ubuntu bash
///? itratative mode  
///? ubunto is the imaege name (which is a linux distrebution)
///? also using --> bash --> which means bash gonna open 

now on bash tarminal: 
echo "this is important file" > mydatafile.txt
ls
cat mydatafile.txt
exit

docker ps
docker ps -a
docker container rm containerId 

docker run -it --name test-container ubuntu bash



containers aredesinged to be: 
> replacble 
> restartable 
> disposable 

now we can see our cerated file is gone 
so we need to make sure that we don't delete imortant file 

so we gonna use volume management 



----------------------------------------

Data catagory : 
               > App code 
                         > backed into the imgge 
                         > read-only layer
                         > replaced on rebuild
                          
               > Temp runtime data
                       > writable layer
                       > dies wiht container
                       > short-lived only
               > persiten data 
                       > needs a volume
                       > survives contere removal 
                       > shared across conatners



Type               lives where         lifecycle
app code           image               untile rebuild 
temp data          container layer     until contairne removed
persistent data    volume              long-term 


------------

docker volume create my-vol
docker volume ls
docker volume inspect my-vol


docker run -it --name vol-demo -v my-vol:/data ubuntu bash 
///? -v to connect a volume 
///? where conneting -> new container -> there will be a place  :/data 
///? which image -> ubuntu 


ls 
cd data
echo "loaded data" > message.txt 
ls
cat message.txt
cd..
exit 

docker ps
docker ps -a
docker rm containerId
docker volume ls
docker run -it --name vol-demo -v my-vol:/data ubuntu bash 

ls 
cd data
ls 
cat message.txt
exit


-----------
annoynomus volume 
named volume 


----
annoynomus volum :

docker run --rm -it -v /data ubuntu bash
/// ? when we exit form container it will gonna remove auto 
ls
exit 

docker volume ls
docker volume inspect id 


-----------------------------------------


docker volume create myData
docker volume ls
docker volume inspect myData
docker volume rm mydata
docker volume ls


--

docker run -it --name vol-test -v myData:/data ubuntu bash 
exit 
docker ps -a
docker container inspect vol-test 
docker volume ls 
docker volume create server1
docker volume create server2
docker volume prune 
///? unused volume will gonna remove
docker volume rm server2



///? remove  annoynomus volume using prune
docker run -it -v /data ubuntu bash 
ls
exit 
docker ps -a
docker container inspect containerId
docker container rm containerId 
docker volume ls 
docker volume prune 
///? delete all undused annoynumus volume 




-----------------------


Bind mount --> we use it on local development 


///?
on local codebase 
termeinal: 
pwd

then copy the path 

open windows power shell :
cd path 
docker run -it --name bind-demo -v "${PWD}:/app" -w /app -p 5000:5000 node:20-alpine sh -c "npm install -g nodemon && npm install && nodemon --watch /app --legacy-watch index.js"
///? pwd -> current path of working directory 
///? :/app -> bind wiht app folder 
///? so that if any cange on codebase then it can write auto 
///? -w /app -> mens woking directory is /app
///? sh -> shell mode 
///? -c -> to run command 
///? --watch /app --> to watch /app
///? --legacy-watch -> our host mechine is windows & container is running on linux
///? so we need to sync
///? index.js -> to run the file

///todo  now we can see code change on codebase is showing on live website 


---

node module problem without binding 

not written -> note


--------------------

how to use .env file on doker file 


+++++

add this to index.js :
const NODE_ENV = process.env.NODE_ENV

then use it using dynamic placement where we wnat : 
like : ${}

now on Dockerfile : 
Place below stuff : 
ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}
///? whinc mena when on terminal we gonna pass an ARG -> argument 
////? as APP_ENV

now on terminal : 
docker build --build-arg APP_ENV=testing -t my-app .
///? hrer t is tag or name
///? on code we cna see that -> ARG APP_ENV=development
///? but on terminal we passed -> testing 
///? so testing will gona overwite the devlopmnet and set testing as new value

docker images 
docker run -it --rm -p 5000:5000 my-app:latest

now we can chekk on website 

----

2nd method in-line env : 

on index.js: 
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV

terminal: 
docker run -it --rm -p 5000:5000 -e PORT=5000 NODE_ENV=production my-app:latest
///? here -e is env 

------ 
3rd method: 


create .env file on root folder :
place value : 
PORT=5000
NODE_ENV=staging


now on terminal:
docker run -it --rm --env-file .env -p 5000:5000 my-app:latest



-----------------------

on terminal : 
docker build -t my-app .
docker images 
docker run -it -p 5000:5000 my-app:latest sh
ls 
cat .env
///? now we can see .env file data
exit 



now create a .dockerigonre file on root
now add : 
node_modules
.env
Dockerfile



now on terminal : 
docker build -t my-app .
docker run -it -p 5000:5000 my-app:latest sh
ls -la

now we can see the node-module still exist : 
cause node module need when ruinng node stuff 
thats why node envrionmen is need 


then why we are igonring whne build  -> node-module
cause to make fast and to keep image size small










*/