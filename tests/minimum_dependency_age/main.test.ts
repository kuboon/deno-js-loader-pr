import { assertEquals } from "@std/assert";
import {
  createLoader,
  RequestedModuleType,
  ResolutionMode,
} from "../helpers.ts";

// Verifies that a deno.json with "minimumDependencyAge" can be read
// without errors. This was broken before Deno 2.9 support was added.
Deno.test("loads module with minimumDependencyAge in deno.json", async () => {
  const mainTs = import.meta.dirname + "/testdata/main.ts";
  const { loader } = await createLoader({
    configPath: import.meta.dirname + "/testdata/deno.json",
  }, {
    entrypoints: [mainTs],
  });

  const mainTsUrl = loader.resolveSync(
    mainTs,
    undefined,
    ResolutionMode.Import,
  );
  const response = await loader.load(mainTsUrl, RequestedModuleType.Default);
  assertEquals(response.kind, "module");
});
