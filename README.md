# 🌿 branch-check-cli

## Getting Started

First install the package:

```
npm install branch-check-cli --save-dev
```

## Usage

This package script contains a couple different ways to define what is considered a valid branch name. Also feel free to use the shorthands defined in, `branch-check-cli --help`

1. **Regex Fuzzy Matching**

    ```json
    $ branch-check-cli --match 'refactor/ feature/ bug/'
    ```

2. **Directory Matching**

    ```json
    $ branch-check-cli --dir '*/*'
    ```

