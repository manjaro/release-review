# Manjaro Editions

[![iso_build](https://github.com/manjaro/release-review/workflows/iso_build/badge.svg)](https://github.com/manjaro/release-review/actions)

## Description

Review-Images of Manjaro Linux

## Where can I download an iso?

Images are built and uploaded in a relatively regular interval to [github releases](https://github.com/manjaro/release-review/releases)

## Sources

- [iso profiles](https://gitlab.manjaro.org/profiles-and-settings/iso-profiles)

## credentials

```sh
user: manjaro
password: manjaro
```

## Discover Images / Linking

A little service provides redirects to the downloads in the form of `http://manjaro.download/[release|pre-release]/[arm64|amd64]/[unstable|testing|stable]/[xfce|gnome|kde|minimal|i3|cinnamon|mate|sway]/[search]`.

So if you'd like to list all assets of the most recent pre-release for xfce on amd64 for unstable, the link would look like this:

```
https://manjaro.download/pre-release/amd64/unstable/xfce
```

To get its hash:

```
https://manjaro.download/pre-release/amd64/unstable/xfce/sha512
```