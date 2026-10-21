# Artisan Street's OpenCode

[OpenCode](https://github.com/anomalyco/opencode) with a small set of patches
that Artisan Forge needs. Forge installs OpenCode from this fork's releases.

## Patches

- `0001-opencode-home.patch`: `OPENCODE_HOME` roots data, config, cache and
  state under `$OPENCODE_HOME/<kind>/opencode`, in place of the XDG base
  directories. Forge keeps OpenCode's sign-in and settings in its own managed
  directory without overriding `XDG_*_HOME` for the shells and tools OpenCode
  runs.

## Releases

`.github/workflows/artisan-release.yml` checks npm's `@opencode/cli` `latest`
tag every six hours. For a version without a release it applies the patches
to upstream's `v<version>` tag, builds every target Forge installs with
upstream's own build script, ad-hoc signs the macOS builds and publishes the
release `artisan-v<version>`:

- `opencode-cli-<target>.tar.gz`: upstream's npm package layout (`package/bin/opencode`)
  plus `package/artisan.json`, which tells Forge the build understands `OPENCODE_HOME`.
- `manifest.json`: version and per-target asset, SHA-256 and size.

To build a version by hand: `gh workflow run artisan-release.yml -f version=<version>`
(add `-f rebuild=true` to replace an existing release).

## Updating a patch

Change it on a branch based on upstream, then regenerate the file with
`git format-patch -1 <commit> --stdout > artisan/patches/<name>.patch`.
A patch that stops applying fails the release; nothing is published.
