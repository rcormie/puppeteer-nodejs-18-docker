# puppeteer-nodejs-18-docker

This repository contains a Docker Compose setup for running a Puppeteer application in a Docker container.

## Prerequisites

Before using this Docker Compose setup, ensure that you have Docker and Docker Compose installed on your system.

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Usage

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/rcormie/puppeteer-nodejs-18-docker.git
   ```

2. Navigate to the repository directory:

   ```bash
   cd puppeteer-nodejs-18-docker
   ```

3. Start the Docker containers:

   ```bash
   docker-compose up
   ```

   This command will build the Docker image (if not already built) and start the containers based on the configuration specified in the `docker-compose.yml` file.

4. Access the application:

   Once the containers are up and running, you can access the Puppeteer application by opening your web browser and navigating to [http://localhost:8080](http://localhost:8080).

   You should see the output of your Puppeteer application or any other defined behavior.

5. Clean up:

   To stop and remove the Docker containers, use the following command:

   ```bash
   docker-compose down
   ```

   This will stop and remove the containers while preserving the application data in the `./app` directory.

## Customization

- **Docker Image**: The `docker-compose.yml` file uses the `rcormie/puppeteer-nodejs-18:v1.0.0` image by default. If you want to use a different Puppeteer image or specify additional configuration options, you can modify the `image` and other relevant properties in the `docker-compose.yml` file.

- **Application Code**: Place your application code inside the `app` directory. The `index.js` and `server.js` files are provided as examples. Customize them according to your needs or replace them with your own files.

- **Ports**: By default, the application is accessible on port 8080. If you need to change the port mapping, modify the `ports` section in the `docker-compose.yml` file.

- **Additional Services:** If your application requires additional services or containers, you can define them in the docker-compose.yml file, under the services section.

## License

These scripts are released under the Apache License, Version 2.0. For more information, see the LICENSE.txt file in the root directory of this repository.
