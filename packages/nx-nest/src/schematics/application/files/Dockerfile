FROM node:14-alpine

# Workdir for node package
WORKDIR /data/app

COPY . /data/app

# Install Tini
RUN apk --no-cache --no-progress add tini

# Create custom entrypoint supports environment variables
RUN printf "#!/bin/ash\nyarn start" > /entrypoint.sh && \
  chmod +x /entrypoint.sh

# Install Node packages, can not use lock file because of NX
RUN yarn --production

ENTRYPOINT ["/sbin/tini", "-vg", "--", "/entrypoint.sh"]
