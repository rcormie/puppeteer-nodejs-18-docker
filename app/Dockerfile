# Puppeteer recommends using the Node LTS version, but you can choose what fits your needs
FROM node:lts-slim

# Create app directory
WORKDIR /app

# Install app dependencies
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install puppeteer, don't install Chromium as it will be installed manually later
RUN npm install puppeteer --no-install-recommends

# Copy app source to Docker environment
COPY . .

# You can expose any port your app is configured to use, like 8080 for example
EXPOSE 8080

# Installing Chromium dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fontconfig \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    locales \
    lsb-release \
    wget \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Run your application when container launches
CMD [ "node", "server.js" ]

