# [PTG Back-Office]
- Author: Phaney Phin
- UI component: [React Strap](https://reactstrap.github.io/), [Ant Design](https://ant.design/docs/react/introduce)
- Using React Context and Hooks

#Sample Page
![Alt text](screenshots/login_page.png?raw=true "Login Page")

## Install Project
- clone project: ```git clone git@gitlab.com:PhaneyPhin/ptg_back-office.git```
- run: ```yarn install```
- run: ```yarn start```
- build: ```yarn build```
- install and run: ```yarn install:clean```

## Login
- username: superad, password: 1334

## Configuration
### API url: change in src/services/callAPI.js
- make change at this code ```const baseUrl = 'https://asv-ptgenergy-backoffice-api-devuat.azurewebsites.net/api/';```
- add routes in routes.js
```
    var routes = [
      {
        path: "/home",
        name: "หน้าแรก",
        icon: "ni ni-tv-2 text-primary",
        antIcon:<HomeOutlined className="text-green" />,
        component: Trees,
        layout: "/admin",
        
      },
      ....
      {
        path: "/yourpath",
        name: "your slug name",
        icon: "your icon",
        component: Year compoent,
        layout: "/admin"
      },
      ...
     ]
```

## Development mode
- git pull --rebase origin dev
- run: yarn install
- run: yarn start
## Build and Deploy
- run ```yarn build```
- copy your dist directory to your server path (make sure you have config to single file call for all the path)
### example deploy in express
```
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req,res,next)=>{
  res.sendFile(path.join(__dirname,'build/index.html'));
});
app.listen(port)


```
## library using
| library | version |
| ------ | ------ |
| @aspnet/signalr | 1.1.4|
| @fortawesome/fontawesome-free | 5.12.1 |
| antd | ^4.2.4|
| antd-img-crop | 3.2.0 |
|axios | | 0.19.2 |
| chart.js | 2.9.3 |
| classnames| 2.2.6|
|moment| 2.24.0|
|node-sass |4.13.1|
|nouislider |14.1.1|
|react |16.12.0|
|react-chartjs-2 |2.9.0|
|react-chat-widget |^3.0.3|
|react-copy-to-clipboard |5.0.2|
|react-datetime |2.16.3|
|react-dom |16.12.0|
|react-google-maps |9.4.5|
|react-router-dom |5.1.2|
|react-scripts |3.4.0|
|react-treebeard |^3.2.4|
|reactstrap |8.4.1|
|sweetalert2-react |^0.8.3|
|treeview-react-bootstrap |^0.4.6|
|@types/googlemaps |3.39.2|
|@types/markerclustererplus |2.1.33|
|@types/react |16.9.19|
|eslint-plugin-flowtype |3.13.0|
|gulp |4.0.2|
|gulp-append-prepend |1.0.8|
|jodit-react |^1.0.42|
|react-helmet |^6.1.0|
|typescript |3.7.5|#   B a c k O f f i c e - F r o n t  
 #   B a c k O f f i c e - F r o n t  
 #   B a c k O f f i c e - F r o n t  
 