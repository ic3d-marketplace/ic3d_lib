import { ParserUtils } from "@shared/utils/parser";
import { detectFramework } from "./bridge/framework_detector";

function getServerLib() {
  const lib: Record<string, any> = {};

  const framework = detectFramework();
  const frameworkModule = ParserUtils.createLuaModule(framework, "framework");
  if (frameworkModule) lib.framework = frameworkModule;

  return lib;
}

exports("getLib", getServerLib);
