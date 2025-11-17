// Wait for the page to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Logic ---
    
    // Get all the modal elements
    const modal = document.getElementById('bibtex-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalBody = document.querySelector('.modal-body');
    const copyBtn = document.getElementById('copy-bibtex-btn');

    // Get all the buttons that open the modal
    const bibtexButtons = document.querySelectorAll('.bibtex-btn');

    // Function to open the modal
    const openModal = (content) => {
        if (!modal || !overlay || !modalBody) return; // Safety check
        modalBody.innerHTML = content; // Set the content
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    // Function to close the modal
    const closeModal = () => {
        if (!modal || !overlay) return; // Safety check
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    };

    // Add click listener to all BibTeX buttons
    bibtexButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the link from jumping
            
            // Get the ID of the content to show
            const contentId = button.dataset.bibtexId; 
            const contentElement = document.getElementById(contentId);
            
            if (contentElement) {
                openModal(contentElement.innerHTML);
            } else {
                openModal('<p>Error: BibTeX content not found.</p>');
            }
        });
    });

    // Add click listeners to close the modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Optional: Close modal with the 'Escape' key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });


    // --- ADD THIS NEW COPY BUTTON LOGIC ---
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            // Find the <pre> tag inside the modal body
            const preTag = modalBody.querySelector('pre');
            if (!preTag) return; // No <pre> tag found

            // Get the text content
            const textToCopy = preTag.textContent;

            // Use the Clipboard API to write text
            navigator.clipboard.writeText(textToCopy).then(() => {
                // --- Success Feedback ---
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa fa-check"></i> Copied!';
                
                // Change it back after 2 seconds
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 5000);

            }).catch(err => {
                // --- Error Feedback ---
                console.error('Failed to copy text: ', err);
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = 'Error!';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
        });
    }

    
    // --- Pressed Nav Button Logic ---
    // (We'll move the other script here too)
    const navResearch = document.getElementById("nav-research");
    if (navResearch) {
        navResearch.classList.add("pressed");
    }

});