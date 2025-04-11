import { ParserUtils } from "@shared/utils/parser";
import { detectTarget } from "./bridge/target_detector";
import { detectFuel } from "./bridge/fuel_detector";

function getClientLib() {
  const lib: Record<string, any> = {};

  const target = detectTarget();
  const targetModule = ParserUtils.createLuaModule(target, "target");
  if (targetModule) lib.target = targetModule;

  const fuel = detectFuel();
  const fuelModule = ParserUtils.createLuaModule(fuel, "fuel");
  if (fuelModule) lib.fuel = fuelModule;

  return lib;
}

exports("getLib", getClientLib);
