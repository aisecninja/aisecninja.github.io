        // Matrix Digital Rain Effect
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#a0e7e5'; // Light Cyan
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        setInterval(draw, 33);

        // Cycling Quotes in Footer
        const quotes = [
            "The future belongs to those who prepare for it today.",
            "AI is the new electricity.",
            "Security is not a product, but a process.",
            "The best way to predict the future is to create it.",
            "Data is the new oil.",
            "Innovation distinguishes between a leader and a follower.",
            "In God we trust. All others must bring data."
        ];

        let currentQuoteIndex = 0;
        const quoteElement = document.querySelector('.quote');

        function showNextQuote() {
            quoteElement.textContent = `"${quotes[currentQuoteIndex]}"`;
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }

        showNextQuote(); // Show initial quote
        setInterval(showNextQuote, 5000); // Change quote every 5 seconds