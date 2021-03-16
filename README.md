# Manjaro Editions
[![iso_build](https://github.com/manjaro/release-review/workflows/iso_build/badge.svg)](https://github.com/manjaro/release-review/actions)

## description

Release-Review ISOs of Manjaro Linux

## where can I download an iso?

Images are built and uploaded in a relatively regular interval to [github releases](https://github.com/manjaro/release-review/releases)

## sources

- [iso profile](https://gitlab.manjaro.org/profiles-and-settings/iso-profiles/-/tree/master/manjaro)
- [plasma settings](https://gitlab.manjaro.org/profiles-and-settings/manjaro-kde-settings)
- [gnome settings](https://gitlab.manjaro.org/profiles-and-settings/manjaro-gnome-settings)
- [xfce settings](https://gitlab.manjaro.org/profiles-and-settings/manjaro-xfce-settings)

## building

1. check out the iso profile
2. `buildiso -p xfce -b stable`

## credentials

```
user: manjaro
password: manjaro
```
