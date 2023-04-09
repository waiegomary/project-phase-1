document.addEventListener("DOMContentLoaded", () => {
    
    const ferryForm = document.getElementById("ferry-form");
    const ferryList = document.getElementById("ferry-list");

    ferryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const departure = document.getElementById("departure").value;
        const destination = document.getElementById("destination").value;
        const url = ` http://localhost:3000/${departure}${destination ? '/' + destination : ''}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayFerrySchedule(data, departure);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    });

    function displayFerrySchedule(schedule, departure) {
        let output = "";
        for (const departureTerminal in schedule) {
                    output += `
                        <div class="sailing">
                            <h4>${departure} to ${schedule[departureTerminal].destination}</h></br>
                            <h4>${departure} to ${schedule[departureTerminal].destination}</h4>
                            <p>Departure Time: ${schedule[departureTerminal].time}</p>
                            <p>Arrival Time: ${schedule[departureTerminal].arrivalTime}</p>
                            <p>Status: ${schedule[departureTerminal].isCancelled}</p>
                        </div>
                    `;
        }

        ferryList.innerHTML = output;
    }
});
