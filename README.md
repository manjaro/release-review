# Manjaro Editions

[![iso_build](https://github.com/manjaro/release-review/workflows/iso_build/badge.svg)](https://github.com/manjaro/release-review/actions)

## Description

Review-Images of Manjaro Linux

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