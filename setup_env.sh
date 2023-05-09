#!/bin/zsh

GREEN='\e[32m'
YELLOW='\e[33m'
RED='\e[31m'
NC='\e[0m'

MONGO_URI=""
PORT=4000
JWT_SECRET=""

function usage {
  echo "Utilisation: ./setup_env_and_launch.sh${NC} [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  ${YELLOW}--mongo${NC} MONGO_URI  MongoDB URI (${RED}requis${NC})"
  echo "  ${YELLOW}-p, --port${NC} PORT    Server port (default: 4000)"
  echo "  ${YELLOW}--jwt${NC} JWT_SECRET   JWT secret key (Optionnel)"
  echo "  ${YELLOW}-h, --usage${NC}        Affiche ce message d'aide"
  echo ""
  echo "Example:"
  echo "  ${GREEN}./setup_env_and_launch.sh${NC} ${YELLOW}--mongo${NC} mongodb+srv://me:10101010@mydatabase.exemple.mongodb.net ${YELLOW}--jwt${NC} MaCléSuperSecrète ${YELLOW}-p${NC} 4000"

}

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --mongo)
    MONGO_URI="$2"
    shift 
    shift 
    ;;
    -p|--port)
    PORT="$2"
    shift 
    shift 
    ;;
    --jwt)
    JWT_SECRET="$2"
    shift # past argument
    shift # past value
    ;;
    -h|--usage)
    usage
    exit 0
    ;;
    *)
    echo "${RED}Argument inconnu: $1${NC}"
    usage
    exit 1
    ;;
esac
done

if [[ -z "$MONGO_URI" ]]
then
    echo "${RED}Arguments non défini: --mongo${NC}"
    echo ""
    usage
    exit 1
fi

export MONGO_URI="$MONGO_URI"
export PORT="$PORT"
export JWT_SECRET='$Gm69MI2eUuPC41cW/Nv6UV4Iq52Cx5AqE6lHDeNqkw4='

function cleanup {
    echo 'Shutting down server...'
    kill $SERVER_PID
    exit
}


trap cleanup EXIT

node Backend/server.js & SERVER_PID=$!
wait $SERVER_PID