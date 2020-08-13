# 🌿 branch-check-cli

## Getting Started

First install the package:

```
npm install branch-check-cli --save-dev
```

![](https://i.imgur.com/vamTvC0.png)

## Usage

This package script contains a couple different ways to define what is considered a valid branch name. Also feel free to use the shorthands defined in, `branch-check" --help`

1. **Regex Fuzzy Matching**

   ```json
   $ branch-check" --match 'refactor/ feature/ bug/'
   ```

2. **Directory Matching**

   ```json
   $ branch-check" --dir '*/*'
   ```
