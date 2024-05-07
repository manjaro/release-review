# Manjaro Release Review

[![iso_build](https://github.com/manjaro/release-review/workflows/iso_build/badge.svg)](https://github.com/manjaro/release-review/actions)

Building preview ISOs for Manjaro Linux.

## Description

We build stable ISOs (against the manjaro stable repository) with the ![longterm](https://img.shields.io/badge/dynamic/json?label=longterm&query=%24%5B%3A1%5D.packageName&url=https%3A%2F%2Fkernel-info.manjaro-sway.download%2F%3Fcategory%3Dlongterm) kernel. These profiles are being built:

- kde
- xfce
- gnome
- i3
- cinnamon
- sway

In addition, unstable ISOs (against the manjaro unstable repository) are built with the ![stable](https://img.shields.io/badge/dynamic/json?label=stable&query=%24%5B%3A1%5D.packageName&url=https%3A%2F%2Fkernel-info.manjaro-sway.download%2F%3Fcategory%3Dstable) kernel. These profiles are built:

- kde-dev
- xfce
- gnome-next
- i3
- cinnamon
- sway

## Where can I download an iso?

Images are built and uploaded in a relatively regular interval to [github releases](https://github.com/manjaro/release-review/releases)

### How to join the multipart zip?

To extract the regular images from multipart zip archive, download both the `z01` and the `zip` files, and run the command:

```sh
zip -FF manjaro-*.zip --out manjaro-full.zip && unzip manjaro-full.zip
```

## Sources

- [iso profiles](https://gitlab.manjaro.org/profiles-and-settings/iso-profiles)

## credentials

```sh
user: manjaro
password: manjaro
```