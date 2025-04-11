# ic3d_lib

A modular and framework-agnostic TypeScript library for **FiveM**, providing seamless integration with common frameworks. Includes a bridge for essential functions like player management, jobs, inventory handling, and more.

## 🚀 Features

- ✅ **Supports multiple frameworks**: ESX, QBCore, QBOX and vRP
- ✅ **Supports multiple targets**: OX Target, QB Target
- ✅ **Modular design**: Uses **interfaces, classes, and dependency injection** for flexibility.
- ✅ **Simple API**: Get players, jobs, inventories, and manage items with ease.
- ✅ **Future-proof**: Easily extendable for new frameworks, inventory or other modules.

## 📦 Installation

1. Clone the repository:

```sh
git clone https://github.com/ic3d-marketplace/ic3d_lib.git
cd ic3d_lib 
npm install
npm run build # If you are using vRP, uncomment "-- '@vrp/lib/utils.lua'," lines on fxmanifest.lua
```

2. Start the bridge before any resource that uses it

## 📦 Example (Lua)

```lua
local lib = exports.ic3d_lib:getLib()

-- Server
RegisterCommand('getIdentifier', function(source)
  print(lib.framework.getIdentifier(source))
end, false)

RegisterCommand('getFullName', function(source)
  print(lib.framework.getFullName(source))
end, false)

RegisterCommand('getJob', function(source)
  print(json.encode(lib.framework.getJob(source)))
end, false)

RegisterCommand('getCash', function(source)
  print(lib.framework.getCash(source))
end, false)

RegisterCommand('addCash', function(source)
  print(lib.framework.addCash(source, 99999))
end, false)

-- Client
lib.target.addModelToTarget(model: any, data: ITargetOptions)
lib.target.addCoordsToTarget(coords: any, data: ITargetOptions)
```
