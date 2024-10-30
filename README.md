# Bootstrap

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The bootstrap of the project.

The bootstrap repository allows you to deploy *Let's Stream It* microservices at once: [`session-service`](https://github.com/LetsStreamIt/session-service), [`auth-service`](https://github.com/LetsStreamIt/auth-service), [`profile-service`](https://github.com/LetsStreamIt/profile-service), [`frontend-service`](https://github.com/LetsStreamIt/frontend-service).


## Prerequisites

- Make sure you have a running and active version of [Docker](https://docs.docker.com/engine/install/).

## Usage:

1. Clone the repository and change directory:
    ```bash
    git clone git@github.com:LetsStreamIt/bootstrap.git && cd bootstrap
    ```

2. Create a `.env` file in the root directory of the project with the following variables:
    1. `AKKA_LICENSE_KEY`: License key used by [`profile-service`](https://github.com/LetsStreamIt/profile-service). It is possible to generate a new key at https://akka.io/key;
    2. `JWT_SECRET`: Secret used to create tokens inside [`auth-service`](https://github.com/LetsStreamIt/auth-service). To generate a random secret, run the following command if you have NodeJs installed:
        ```bash
        node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
        ```
        Alternatively, either use another program to generate a random secret or choose one strong enough.
    3. `YOUTUBE_API_KEY`: Youtube API key. Follow the steps listed at https://developers.google.com/youtube/v3/getting-started to generate it.


    `.env` syntax should be:
    ```plaintext 
    AKKA_LICENSE_KEY=YOUR_LICENSE_KEY
    JWT_SECRET=YOUR_JWT_SECRET
    YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
    ```

4. Deploy *Let's Stream It*:
   ```bash
   docker compose up -d
   ```
   The [`frontend-service`](https://github.com/LetsStreamIt/frontend-service) will be published on the port `80` of the host (as default), thus navigate to http://localhost to interact with the Web application. Alternatevely, if you want to run the service in another port, change it from the Docker compose file.

## License

Bootstrap is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Authors

- Luca Fabri ([w-disaster](https://github.com/w-disaster))
- Simone Ceredi ([sceredi](https://github.com/sceredi))
