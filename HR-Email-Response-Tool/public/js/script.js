// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('candidate-form');
    const previewBtn = document.getElementById('preview-btn');
    const messageContainer = document.getElementById('message-container');
    const previewSection = document.getElementById('preview-section');
    const previewContent = document.getElementById('email-preview-content');

    // --- Email Templates (Client-Side) ---
    const templates = {
        selected: `Dear [Candidate Name],

We are pleased to inform you that you have been selected for the position of [Position].

Please reply to this email to confirm your acceptance.

Best regards,
HR Team`,
        rejected: `Dear [Candidate Name],

Thank you for applying for the position of [Position].

We regret to inform you that we have decided to move forward with other candidates.

Best regards,
HR Team`
    };

    // --- Show Message Function ---
    function showMessage(message, isError = false) {
        messageContainer.textContent = message;
        messageContainer.className = isError ? 'message-error' : 'message-success';
    }
    
    // --- Preview Button Logic ---
    previewBtn.addEventListener('click', () => {
        const status = form.elements.status.value;
        const name = document.getElementById('candidate-name').value.trim();
        const position = document.getElementById('position').value.trim();
        
        if (!status || !name || !position) {
            showMessage('Please fill in status, name, and position to preview.', true);
            return;
        }

        const template = templates[status];
        if (template) {
            const emailBody = template.replace('[Candidate Name]', name).replace('[Position]', position);
            previewContent.textContent = emailBody;
            previewSection.classList.remove('hidden');
            messageContainer.className = ''; // Hide any previous messages
        } else {
             showMessage('Please select a valid status (Selected/Rejected).', true);
        }
    });

    // --- Form Submission Logic ---
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Clear previous messages
        messageContainer.className = '';

        // Get form data
        const status = form.elements.status.value;
        const name = document.getElementById('candidate-name').value.trim();
        const email = document.getElementById('candidate-email').value.trim();
        const position = document.getElementById('position').value.trim();

        // Client-side validation
        if (!status || !name || !email || !position) {
            showMessage('All fields are required.', true);
            return;
        }

        const data = { status, name, email, position };

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message);
                form.reset();
                previewSection.classList.add('hidden');
            } else {
                showMessage(result.message || 'An unknown error occurred.', true);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage('Failed to connect to the server. Please try again later.', true);
        }
    });
});