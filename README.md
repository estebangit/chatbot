# chatbot

  mongo:
    image: mongo:3.2
    restart: unless-stopped
    volumes:
     - ./data/db:/data/db
    command: mongod --smallfiles --oplogSize 128 --replSet rs0
  # This container's job is just run the command to initialize the replica set.
  # It will run the command and remove himself (it will not stay running)
  mongo-init-replica:
    image: mongo:3.2
    command: 'mongo mongo/rocketchat --eval "rs.initiate({ _id: ''rs0'', members: [ { _id: 0, host: ''localhost:27017'' } ]})"'
    depends_on:
      - mongo

  rocketchat:
    image: rocketchat/rocket.chat:latest
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads
    environment:
      - PORT=3000
      - ROOT_URL=http://localhost:3000
      - MONGO_URL=mongodb://mongo:27017/rocketchat
      - MONGO_OPLOG_URL=mongodb://mongo:27017/local
      - MAIL_URL=smtp://smtp.email
    depends_on:
      - mongo
    ports:
      - 3000:3000


  hubot-worker:
    image: rocketchat/hubot-rocketchat:latest
    restart: unless-stopped
    environment:
      - ROCKETCHAT_URL=rocketchat:3000
      - ROCKETCHAT_ROOM=GENERAL
      - BOT_NAME=hubot-worker
      - ROCKETCHAT_USER=hubot-worker
      - ROCKETCHAT_PASSWORD=****
      - ROCKETCHAT_AUTH=password
      # you can add more scripts as you'd like here, they need to be installable by npm
      - EXTERNAL_SCRIPTS=hubot-help,hubot-seen,hubot-links,hubot-diagnostics
    depends_on:
      - rocketchat
    volumes:
      - ./scripts-worker:/home/hubot/scripts
    # this is used to expose the hubot port for notifications on the host on port 3001, e.g. for hubot-jenkins-notifier
    ports:
      - 3002:8080
