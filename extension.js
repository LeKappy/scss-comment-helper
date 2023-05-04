const vscode = require('vscode');
const { detectNestedSelectorsAndParents } = require('./nestedClasses');

// This function is called when the extension is activated
function activate(context) {
	// This command is executed when the user has performed the keyboard shortcut (see package.json, in "commands")
	let disposable = vscode.commands.registerCommand('extension.detectNestedClasses', () => {
		// Targets the "instance" of the editor you are on
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		// Checks if the active file is a SCSS file
		if (editor.document.languageId !== 'scss') {
			// Displays a notification that the extension only works on SCSS files
			vscode.window.showInformationMessage("SCSS Comment Helper only works on SCSS files.");
			return;
		}

		// Targets the active tab in the editor
		const document = editor.document;
		// Get all the contents of the file
		const selectedText = document.getText();
		// Function to target and retrieve selectors (not just classes) from the file
		const nestedClasses = detectNestedSelectorsAndParents(selectedText);

		// Function that adds comments for nested selectors
		addCommentsForNestedClasses(editor, nestedClasses);
	});

	// This line contributes to the resource management and "cleanliness" of the extension when disabled
	context.subscriptions.push(disposable);
}

// Allows to add comments above nested selectors
function addCommentsForNestedClasses(editor, nestedClasses) {
	const document = editor.document;
	const edit = new vscode.WorkspaceEdit();

	// Browse the nested selectors
	nestedClasses.forEach(nestedClass => {
		// Allows to know the position of the selector in the document by its index
		const position = document.positionAt(nestedClass.index);
		// Move the position one line up to insert the comment above the selector
		const newPosition = position.with(position.line - 1, position.character);
		// Gets the exact line where the target is located
		const line = document.lineAt(newPosition.line);
		// Get the indentation to correctly align the comment
		const indentation = line.text.substring(0, line.firstNonWhitespaceCharacterIndex);
		// The comment added
		const comment = `${indentation}// ${nestedClass.comment}\n`;

		const prevLine = newPosition.line - 1;
		if (prevLine >= 0) {
			const prevLineText = document.lineAt(prevLine).text.trim();
			// Checks if the comment already exists so as not to add it again
			if (prevLineText === `// ${nestedClass.comment}`) {
				return;
			}
		}

		// Adds the comment to the specified position in the list of changes to be made to the file
		edit.insert(document.uri, newPosition, comment);
	});

	// Adds comments to the file
	return vscode.workspace.applyEdit(edit);
}

// The deactivate() function is empty because this extension does not need to clean up or disable
// specific resources when it is deactivated. This function is provided for compliance with
// the VSCode extension API, but it does not need in the case of this extension.
function deactivate() { }

module.exports = {
	activate,
	deactivate
};
