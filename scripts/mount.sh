[[ args[0] == "-h" ]] && echo "Script para montar o boilerplate automaticamente, insira 2 argumentos, 1 = nome do projeto, 2 = url do repositorio online" && exit 1

[[ $# -lt 2 ]] && echo "numero insuficiente de argumentos" && exit 1

args=("$@")

npm i

cd ..
mv boilerplate-api-nodejs backend

cd backend/config/env
cp .env.example .env
git remote rm origin
git remote add origin ${args[1]}

cd ../..

echo "Boilerplate montado com Sucesso"

node server.js


