const {config} = require('dotenv')
const bcrypt = require('bcrypt-nodejs')

config({ path: '../config/env/.env' })

const
    { argv } = process,
    { APP_SECRET } = process.env;

if (argv.length !== 3)
    return console.log('Por favor passe a senha como argumento!');

if (!APP_SECRET || APP_SECRET === '')
    return console.log('APP_SECRET não definido como variável de ambiente (env)');

const senha = argv[2];

console.log('Gerando hash...');

const hash = bcrypt.hashSync(senha + process.env.APP_SECRET);

console.log('Hash: ', hash);
