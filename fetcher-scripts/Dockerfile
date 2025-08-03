# Start from a lightweight and stable base image
FROM debian:bullseye-slim

# Install all necessary dependencies
# - curl: for making HTTP requests
# - jq: for parsing JSON
# - default-mysql-client: to communicate with the database
# - ca-certificates & wget: needed to download pup
RUN apt-get update && apt-get install -y \
    curl \
    jq \
    default-mysql-client \
    wget \
    ca-certificates \
    unzip \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install pup for HTML parsing
RUN wget https://github.com/ericchiang/pup/releases/download/v0.4.0/pup_v0.4.0_linux_amd64.zip -O pup.zip && \
    unzip pup.zip -d /usr/local/bin/ && \
    rm pup.zip

# Set the working directory inside the container
WORKDIR /app

# Copy all the scripts from your local machine into the container's /app directory
COPY . .

# Make all shell scripts in the directory executable
RUN chmod +x ./*.sh

# This is the command that will run when the container starts
CMD ["./get_all_curl_data.sh"]