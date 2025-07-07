FROM node:24.3-slim AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g corepack@latest &&\ 
    corepack enable &&\ 
    corepack prepare pnpm@latest --activate

# Receive values from docker-compose's "build.args"
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG BETTER_AUTH_URL
ARG BETTER_AUTH_SECRET

RUN echo "......................."
RUN echo "......................."
RUN echo ${DB_HOST}
RUN echo "......................."
RUN echo "......................."

# Make the ARGs available as env variables for RUN commands below
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}

RUN pnpm install --frozen-lockfile

COPY . .

# Make the entrypoint executable
RUN chmod +x ./entrypoint.sh

RUN pnpm build

ENV ORIGIN=${BETTER_AUTH_URL}

ENV NODE_ENV=production

# These are not necessary. Docker-compose settles it.
# ENV LISTEN_ADDR=localhost:3000
# EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["node", "build/index.js"]