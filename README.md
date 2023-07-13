# Environment Sensor
A project that demonstrates how to get environment information from a computing device.

This project has two components, a Dispatcher which gathers environment information and a MockServer to which the Dispatcher sends environment information for subsequent processing.

**Be advised** that this code needs to run directly on a host machine in order to access temperature data.

## (1) Install the TypeScript runtime libraries

`sudo npm install -g typescript  && npm install -g ts-node`

## (2) Clone the source code

`git clone https://github.com/reselbob/environmentsensor.git`

## (3) Go to the working directory

`cd environmentsensor`

## (4) Install the dependencies

`npm install`

## (5) Start the mock server

`ts-node tests/mockServer.ts`

## (6) Start the `dispatch_runner` that reports environment data to the mock server

Run the following command in a separate terminal window.

`cd environmentsensor`

`ts-node src/dispatch_runner.ts`


# Setting the `dispatch_runner` to report cpu temperature

The `dispatch_runner` can report cpu temperature when running on non-virtual, physical hardware. To configure the `dispatch_runner` to report temperature set the environment variable  in the `.env` file as follows:

```text
DEVICE_INFO_TYPE=TEMPERATURE
```
