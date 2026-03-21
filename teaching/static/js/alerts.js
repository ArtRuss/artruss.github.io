function checkDueDates() {
    // 1. Get today's date and reset the time to midnight for accurate math
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rows = document.querySelectorAll('#course-schedule tr');
    
    let alertMessage = "<strong>Upcoming Deadlines:</strong><br>";
    let matchFound = false;

    // 2. Loop through every row
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let dateCellIndex = -1;

        // 3. Find the cell containing the date
        for (let i = 0; i < cells.length; i++) {
            const cellText = cells[i].innerText.trim();
            if (/^\d{2}\/\d{2}$/.test(cellText)) {
                dateCellIndex = i;
                break;
            }
        }

        // 4. If we found a date, process it
        if (dateCellIndex !== -1) {
            const dateText = cells[dateCellIndex].innerText.trim();
            const [month, day] = dateText.split('/').map(Number);

            // Create a Date object for the table row (assuming current year)
            const rowDate = new Date(today.getFullYear(), month - 1, day);
            rowDate.setHours(0, 0, 0, 0);

            // 5. Calculate the difference in days
            const diffTime = rowDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // 6. Check if the date is today or within the next 7 days
            if (diffDays >= 0 && diffDays <= 7) {
                
                const elementWithTitle = row.querySelector('[data-title]') || (row.hasAttribute('data-title') ? row : null);
                
                if (elementWithTitle) {
                    const infoText = elementWithTitle.getAttribute('data-title');
                    
                    // Make it clear if it's due today or in the future
                    const daysText = diffDays === 0 ? "<span class='deadline-danger'><b>TODAY</b></span>" : `in ${diffDays} day(s)`;
                    
                    alertMessage += `• ${infoText} - Due: ${daysText}<br>`;
                    matchFound = true;
                }
            }
        }
    });

    // 7. Fire the alert if we found a match
    if (matchFound) {
        $("#alert-msg").html(alertMessage);
        $("#deadline-alerts").slideDown("slow");
    } else {
        console.log("No deadlines in the next 7 days.");
    }
}

$(document).ready(function() {
    checkDueDates();

    $('#deadline-alerts .close').on('click', function() {
        $('#deadline-alerts').slideUp('slow');
    });
});