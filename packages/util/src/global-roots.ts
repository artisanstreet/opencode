import os from "os"
import path from "path"

const home = os.homedir()
// OPENCODE_HOME replaces every XDG base directory for opencode alone, so an
// isolated instance does not pass XDG overrides on to the tools it runs.
const own = process.env.OPENCODE_HOME
const data = own
  ? path.join(own, "data")
  : process.env.XDG_DATA_HOME || (home ? path.join(home, ".local", "share") : undefined)
const cache = own
  ? path.join(own, "cache")
  : process.env.XDG_CACHE_HOME || (home ? path.join(home, ".cache") : undefined)
const config = own
  ? path.join(own, "config")
  : process.env.XDG_CONFIG_HOME || (home ? path.join(home, ".config") : undefined)
const state = own
  ? path.join(own, "state")
  : process.env.XDG_STATE_HOME || (home ? path.join(home, ".local", "state") : undefined)

/** The XDG base directories that root opencode's global paths. */
export function roots(app: string) {
  return {
    data: path.join(data!, app),
    cache: path.join(cache!, app),
    config: path.join(config!, app),
    state: path.join(state!, app),
    tmp: path.join(os.tmpdir(), app),
  }
}
