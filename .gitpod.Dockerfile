FROM gitpod/workspace-full

# Install Docker and Docker Compose
RUN sudo apt-get update && \
    sudo apt-get install -y docker.io docker-compose && \
    sudo rm -rf /var/lib/apt/lists/*

# Install MySQL client
RUN sudo apt-get update && \
    sudo apt-get install -y mysql-client && \
    sudo rm -rf /var/lib/apt/lists/*