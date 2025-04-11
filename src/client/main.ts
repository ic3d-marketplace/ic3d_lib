import { ParserUtils } from "@shared/utils/parser";
import { detectTarget } from "./bridge/target_detector";

function getClientLib() {
  const lib: Record<string, any> = {};

  const target = detectTarget();
  const targetModule = ParserUtils.createLuaModule(target, "target");
  if (targetModule) lib.target = targetModule;

  return lib;
}

exports("getLib", getClientLib);
