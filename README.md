# environmentsensor
A project that demonstrates how to get environment information from a computing device

## Install the TypeScript runtime libraries

`npm install -g typescript  && npm install -g ts-node`

## Clone the source code

`git clone https://github.com/reselbob/environmentsensor.git`

## Go to the working directory

`cd environmentsensor`

## Install the dependencies

`npm install`

## Start the mock server

`ts-node tests/mockServer.ts`

## Start the Dispatcher that reports CPU Temperature data to the mock server

Run the following command in a separate terminal window.

`cd environmentsensor`

`ts-node src/index.ts`
