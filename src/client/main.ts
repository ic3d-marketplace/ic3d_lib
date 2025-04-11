import { detectTarget } from "./bridge/target_detector";

function getBridgeForLua() {
  const target: any = detectTarget();
  if (!target) return null;

  const methodNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(target)
  ).filter((key) => typeof target[key] === "function" && key !== "constructor");

  const luaBridge: Record<string, Function> = {};
  for (const key of methodNames) {
    luaBridge[key] = target[key].bind(target);
  }

  console.log("✅ Exposing client bridge methods to Lua:", methodNames);
  return luaBridge;
}

exports("getBridge", getBridgeForLua);
