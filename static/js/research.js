// Wait for the page to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Logic ---
    const modal = document.getElementById('bibtex-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalBody = document.querySelector('.modal-body');
    const copyBtn = document.getElementById('copy-bibtex-btn');
    const bibtexButtons = document.querySelectorAll('.bibtex-btn');

    const openModal = (content) => {
        if (!modal || !overlay || !modalBody) return; 
        modalBody.innerHTML = content; 
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    const closeModal = () => {
        if (!modal || !overlay) return; 
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    };

    bibtexButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            const contentId = button.dataset.bibtexId; 
            const contentElement = document.getElementById(contentId);
            
            if (contentElement) {
                openModal(contentElement.innerHTML);
            } else {
                openModal('<p>Error: BibTeX content not found.</p>');
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- Copy Button Logic ---
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const preTag = modalBody.querySelector('pre');
            if (!preTag) return; 

            const textToCopy = preTag.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa fa-check"></i> Copied!';
                setTimeout(() => { copyBtn.innerHTML = originalText; }, 5000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = 'Error!';
                setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
            });
        });
    }

// --- Research Topic & Text Search Filter Logic ---
    const checkboxes = document.querySelectorAll('.category-filter');
    const searchInput = document.getElementById('research-search');
    const researchItems = document.querySelectorAll('.research-item');

    function filterResearch() {
        // 1. Get all active checkbox values in lowercase
        const activeFilters = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());

        // 2. Get the typed search string in lowercase
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

        researchItems.forEach(item => {
            // Check Category Tag matching
            const labelsElement = item.querySelector('.research-labels');
            const labelsText = labelsElement ? labelsElement.textContent.toLowerCase() : "";
            const matchesCategory = activeFilters.length === 0 || 
                                    activeFilters.some(filter => labelsText.includes(filter));

            // Check Text Search matching (searches title, authors, and abstract)
            const titleText = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : "";
            const authorsText = item.querySelector('.authors') ? item.querySelector('.authors').textContent.toLowerCase() : "";
            const abstractText = item.querySelector('.abstract') ? item.querySelector('.abstract').textContent.toLowerCase() : "";
            
            const matchesSearch = searchQuery === "" || 
                                  titleText.includes(searchQuery) || 
                                  authorsText.includes(searchQuery) || 
                                  abstractText.includes(searchQuery);

            // An item must pass BOTH constraints to stay visible
            if (matchesCategory && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Bind event listeners to both the checkboxes and the search box
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterResearch));
    if (searchInput) {
        searchInput.addEventListener('input', filterResearch);
    }

    // --- Pressed Nav Button Logic ---
    const navResearch = document.getElementById("nav-research");
    if (navResearch) {
        navResearch.classList.add("pressed");
    }
});