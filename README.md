# SCSS Comment Helper

SCSS Comment Helper is a Visual Studio Code extension that simplifies working with SCSS files by automatically inserting comments for nested classes. With just a simple keyboard shortcut, the extension scans the SCSS file, detects nested classes, and adds corresponding comments to make it easier for developers to search for and understand the structure of the SCSS code.

## Features

- Automatically detects and comments nested SCSS classes
- Improves readability and maintainability of SCSS files
- Simplifies the process of understanding the structure of your SCSS code

## Usage

1. Open an SCSS file.
2. Press the keyboard shortcut `Ctrl + Alt + C` (`Cmd + Shift + C` on macOS) to trigger the extension.
3. The extension will automatically scan the file, detect nested classes, and insert corresponding comments.

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

These comments help you to understand the structure of the SCSS code, to make it more readable and to find classes more quickly in your files.

## Requirements

- Visual Studio Code version 1.77.0 or higher

## Known Issues

None at the moment. If you find any issues or have feature requests, please [open an issue on GitHub](https://github.com/LeKappy/scss-comment-helper/issues).

## Release Notes

### 0.0.1

- Initial version of SCSS Comment Helper
- Automatically detects and comments nested SCSS classes (after using the keyboard shortcut)
- Improves readability and maintainability of SCSS files

### Contributing

If you would like to contribute to the development of SCSS Comment Helper, feel free to fork the repository and submit a pull request with your changes. We appreciate your support and collaboration!

## License

SCSS Comment Helper is released under the [MIT License](LICENSE).
