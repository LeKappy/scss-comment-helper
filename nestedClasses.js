function detectNestedClassesAndParents(text) {
    const lines = text.split('\n');
    let stack = {};
    let depth = 0;
    let nestedClasses = [];

    lines.forEach((line) => {
        const trimmedLine = line.trim();
        const openBraceFound = trimmedLine.includes('{');
        const closeBraceFound = trimmedLine.includes('}');

        if (openBraceFound) {
            if (!trimmedLine.includes('@')) {
                stack[depth + 1] = trimmedLine.split('{')[0].trim();

                if (stack[depth + 1].startsWith('&')) {
                    stack[depth + 1] = stack[depth + 1].slice(1);
                } else if (stack[depth + 1][0] !== ' ') {
                    stack[depth + 1] = ' ' + stack[depth + 1];
                }

                if (depth > 0) {
                    const commentText = Object.values(stack).join('').trim();
                    const index = text.indexOf(line);
                    nestedClasses.push({ comment: commentText, index });
                }
            }

            depth++;
        }

        if (closeBraceFound) {
            if (stack[depth] && !stack[depth].includes('@')) {
                delete stack[depth];
            }
            depth--;
        }
    });

    return nestedClasses;
}

module.exports = {
    detectNestedClassesAndParents
};
