document.addEventListener("DOMContentLoaded", function () {
    const codeContainers = document.querySelectorAll('.code-container');

    codeContainers.forEach(container => {
        const sourceUrl = container.getAttribute('data-source');
        const language = container.getAttribute('data-lang') || 'markup';
        const rangeMatch = sourceUrl.match(/#L(\d+)-L(\d+)$/);
        let startLine = 0;
        let endLine = Infinity;

        if (rangeMatch) {
            startLine = parseInt(rangeMatch[1], 10) - 1;
            endLine = parseInt(rangeMatch[2], 10);
        }

        const cleanSourceUrl = sourceUrl.replace(/#L\d+-L\d+$/, '');

        if (cleanSourceUrl) {
            fetch(cleanSourceUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.text();
                })
                .then(code => {
                    const lines = code.split('\n').slice(startLine, endLine);
                    const preElement = container.querySelector('pre');
                    preElement.classList.remove('loading');
                    preElement.innerHTML = `<code class="language-${language}">${Prism.highlight(lines.join('\n'), Prism.languages[language], language)}</code>`;

                    // Add a link to the source
                    const linkElement = document.createElement('a');
                    linkElement.href = cleanSourceUrl;
                    linkElement.textContent = 'View Source';
                    linkElement.className = 'source-link';
                    linkElement.target = '_blank';

                    container.appendChild(linkElement);
                })
                .catch(error => {
                    container.querySelector('pre').textContent = 'Failed to load code: ' + error.message;
                });
        }
    });
});

