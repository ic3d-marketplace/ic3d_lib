fx_version 'cerulean'
game 'gta5'

author 'Rodrigo Lourenço <rodrigofplourenco2002@gmail.com>'
name 'ic3d_lib'
description 'A modular FiveM bridge library'
version '0.1.0'

shared_scripts {
  'dist/shared/main.js',
}

client_scripts {
  -- '@vrp/lib/utils.lua',
  'dist/client/main.js',
}

server_scripts {
  -- '@vrp/lib/utils.lua',
  'dist/server/main.js',
}

files {
  'dist/**/*.js'
}
