import { detectFramework } from "./bridge/framework_detector";

function getBridgeForLua() {
  const framework: any = detectFramework();
  if (!framework) return null;

  const methodNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(framework)
  ).filter(
    (key) => typeof framework[key] === "function" && key !== "constructor"
  );

  const luaBridge: Record<string, Function> = {};
  for (const key of methodNames) {
    luaBridge[key] = framework[key].bind(framework);
  }

  console.log("✅ Exposing server bridge methods to Lua:", methodNames);
  return luaBridge;
}

exports("getBridge", getBridgeForLua);
