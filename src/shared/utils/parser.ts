export class ParserUtils {
  static remakeObjectForLua(instance: any): Record<string, Function> {
    const methodNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(instance)
    ).filter(
      (key) => typeof instance[key] === "function" && key !== "constructor"
    );

    const luaCompatibleObject: Record<string, Function> = {};
    for (const key of methodNames) {
      luaCompatibleObject[key] = instance[key].bind(instance);
    }

    return luaCompatibleObject;
  }

  static createLuaModule(
    instance: object | null,
    label: string
  ): Record<string, Function> | null {
    if (!instance) {
      console.warn(`⚠️ No ${label} detected, not exposing ${label} module`);
      return null;
    }

    console.log(
      `✅ ${
        label.charAt(0).toUpperCase() + label.slice(1)
      } module exposed to Lua`
    );
    return ParserUtils.remakeObjectForLua(instance);
  }
}
