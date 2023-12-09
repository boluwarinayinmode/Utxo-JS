# UTXO lenses BE

## Prequisites
1. Node - 21.x.x
2. NPM - 10.x.x

## How to setup
1. Clone Repository
2. Install dependencies ```npm install``` or ```yarn install```
3. Run ```npm run start``` or ```yarn start```
4, Now you can call endpoints

## Endpoints
1. ```/api/v1``` - Get all Transactions
2. ```/api/v1?startTime:{ISO-Timestamp}&endTime:{ISO-Timestamp}``` - Get Transaction between start and end time

## Special setup for development (Connect with ResillientDB Instance)
1. If you want to start fetching new data from ResillientDB and you want to have live connection you have to do some additional steps.
2. In ```index.js``` uncomment line which make ```transactionPolling``` function call.
3. In ```helpers/resilient_db_fetch.js``` change the variable named ```resilliendb_url``` and replace it with your ResillientDB instance url.
4. Now if you run ```npm run start``` or ```yarn start``` you should see in console that you are fetching data from ResillientDB instance.
