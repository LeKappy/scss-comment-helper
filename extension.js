const vscode = require('vscode');
const { detectNestedClassesAndParents } = require('./nestedClasses');

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.detectNestedClasses', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const selectedText = document.getText();
		const nestedClasses = detectNestedClassesAndParents(selectedText);

		addCommentsForNestedClasses(editor, nestedClasses);
	});

	context.subscriptions.push(disposable);
}

function addCommentsForNestedClasses(editor, nestedClasses) {
	const document = editor.document;
	const edit = new vscode.WorkspaceEdit();

	nestedClasses.forEach(nestedClass => {
		const position = document.positionAt(nestedClass.index);
		const line = document.lineAt(position.line);
		const indentation = line.text.substring(0, line.firstNonWhitespaceCharacterIndex);
		const comment = `${indentation}// ${nestedClass.comment}\n`;

		const prevLine = position.line - 1;
		if (prevLine >= 0) {
			const prevLineText = document.lineAt(prevLine).text.trim();
			if (prevLineText === `// ${nestedClass.comment}`) {
				return;
			}
		}

		edit.insert(document.uri, position, comment);
	});

	return vscode.workspace.applyEdit(edit);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
