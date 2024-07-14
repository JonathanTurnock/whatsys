#!/bin/bash

for target in x86_64-unknown-linux-gnu x86_64-pc-windows-msvc x86_64-apple-darwin aarch64-apple-darwin
do
  deno compile -A --output=dist/$target\_\_whatsys --target=$target src/main.ts
done