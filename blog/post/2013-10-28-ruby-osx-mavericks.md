---
title: Ruby and Mavericks
description: >-
  Are you developing in Ruby and have just upgraded your OSX Machine to
  Mavericks (OSX 10.9)? Are you suddenly having trouble installing or…
date: '2013-10-28'
tags:
  - ruby
  - osx
---

Are you developing in Ruby and have just upgraded your OSX Machine to Mavericks (OSX 10.9)? Are you suddenly having trouble installing or compiling gems? I’ve seen a few articles on the topic, but none of them really worked for me. Here’s what did:

- ensure you have the newest version of xCode installed from the app store (it’s still free)
- force-update the developer tools \`xcode-select — install\`
- re-install the version of ruby you using
- If you are using [rbenv](https://github.com/sstephenson/rbenv), it’s as simple as \`rbenv install\`

That’s it! No need for messing with your symlinks or system libs.
