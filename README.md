# SCSS Comment Helper

SCSS Comment Helper is a Visual Studio Code extension that simplifies working with SCSS files by automatically inserting comments for nested selectors. Using a simple keyboard shortcut, the extension scans the SCSS file, detects nested selectors and adds corresponding comments to make it easier to find and understand the structure of the SCSS code.

## Features

- Automatically detects and comments nested SCSS selectors
- Improves readability and maintainability of SCSS files
- Simplifies the process of understanding the structure of your SCSS code

## Usage

1. Open an SCSS file.
2. Press the keyboard shortcut `Ctrl + Alt + C` (`Cmd + Shift + C` on macOS) to trigger the extension.
3. The extension will automatically scan the file, detect nested selectors, and insert corresponding comments.

## Example

Suppose you have the following SCSS code:

```scss
.main {
  &__title {
    &--highlighted {
      font-weight: bold;
    }
  }
}
```

After triggering the extension with the keyboard shortcut, the SCSS code will be updated with comments:

```scss
.main {
  // .main__title
  &__title {
    // .main__title--highlighted
    &--highlighted {
      font-weight: bold;
    }
  }
}
```

These comments help you to understand the structure of the SCSS code, to make it more readable and to find selectors more quickly in your files.

## Requirements

- Visual Studio Code version 1.77.0 or higher

## Known Issues

- There might be a conflict with the [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) extension, causing an error when using the keyboard shortcut `Ctrl + Z` (so to cancel the comments added by the SCSS Comment Helper extension). We are aware of this issue and are working on a fix. If you experience this problem, try disabling the Auto Rename Tag extension temporarily.
- The extension does not currently handle selectors with commas (e.g., `.classOne, .classTwo`) correctly. We are aware of this limitation and are working on improving the handling of such cases.

If you find any other issues or have feature requests, please [open an issue on GitHub](https://github.com/LeKappy/scss-comment-helper/issues).


## Release Notes

For detailed release notes, please see the [CHANGELOG.md](CHANGELOG.md) file.

### Contributing

If you would like to contribute to the development of SCSS Comment Helper, feel free to fork the repository and submit a pull request with your changes. We appreciate your support and collaboration!

## License

SCSS Comment Helper is released under the [MIT License](LICENSE.txt).
