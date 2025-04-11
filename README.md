# ic3d_lib

A modular and framework-agnostic TypeScript library for **FiveM**, providing seamless integration with common frameworks. Includes a bridge for essential functions like player management, jobs, inventory handling, and more.

## 🚀 Features

- ✅ **Supports multiple frameworks**: ESX, QBCore, QBOX and vRP
- ✅ **Modular design**: Uses **interfaces, classes, and dependency injection** for flexibility.
- ✅ **Simple API**: Get players, jobs, inventories, and manage items with ease.
- ✅ **Future-proof**: Easily extendable for new frameworks and inventory systems.

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
local bridge = exports.ic3d_lib:getBridge()

RegisterCommand('getIdentifier', function(source)
  print(bridge.getIdentifier(source))
end, false)

RegisterCommand('getFullName', function(source)
  print(bridge.getFullName(source))
end, false)

RegisterCommand('getJob', function(source)
  print(json.encode(bridge.getJob(source)))
end, false)

RegisterCommand('getCash', function(source)
  print(bridge.getCash(source))
end, false)

RegisterCommand('addCash', function(source)
  print(bridge.addCash(source, 99999))
end, false)
```
