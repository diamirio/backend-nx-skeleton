FROM node:14-alpine

WORKDIR /data/app
COPY . /data/app

# copy transpiled files to the main root and remove the dist folder
RUN cp -rpf ./dist/* ./ && rm -rf ./dist

# install dependencies in a separate step so docker build process will use cached layers if package.json remains unchanged
COPY package.json yarn.lock ../
RUN cd ../ && yarn --production --frozen-lockfile

# create node_modules symlink reuired for typescript (typeorm) migrations and seeds
RUN ln -s ../node_modules ./node_modules

# Start app (service is determined by NODE_SERVICE env var)
# Note: we do not provide a default value for NODE_SERVICE on purpose, since this could lead to subtle bugs (for instance - forget to
# set NODE_SERVICE=task and all of a sudden your task container is a server instead, without any errors)
CMD yarn start

