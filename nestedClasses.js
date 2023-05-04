/**
 * Scans the SCSS and detects nested selectors and their parents.
 * @param {string} text - The SCSS "text" to analyze.
 * @returns {Array<{ comment: string, index: number }>} An array of objects containing a comment text and the index of the nested selector in the SCSS text.
 */
function detectNestedSelectorsAndParents(text) {
    const lines = text.split('\n');
    let stack = {};
    let depth = 0;
    let nestedClasses = [];
    let currentIndex = 0;

    lines.forEach((line) => {
        currentIndex += line.length + 1;
        const trimmedLine = line.trim();
        const openBraceFound = trimmedLine.includes('{');
        const closeBraceFound = trimmedLine.includes('}');

        if (openBraceFound) {
            if (!trimmedLine.includes('@')) {
                stack[depth + 1] = trimmedLine.split('{')[0].trim();

                if (stack[depth + 1].startsWith('&')) {
                    stack[depth + 1] = stack[depth + 1].slice(1).trim();
                } else if (stack[depth + 1][0] !== ' ') {
                    stack[depth + 1] = ' ' + stack[depth + 1];
                }

                if (depth > 0) {
                    const commentText = Object.values(stack).join('').trim();
                    nestedClasses.push({ comment: commentText, index: currentIndex });
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
    detectNestedSelectorsAndParents
};
