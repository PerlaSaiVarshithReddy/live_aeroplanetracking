const API_KEY = "02d22aff06d97adf79931f976edfc886";

async function getFlight() {

    const flightNumber = document.getElementById("flightInput").value;

    const result = document.getElementById("result");

    const loading = document.getElementById("loading");

    if (flightNumber === "") {
        alert("Please enter flight number");
        return;
    }

    loading.innerHTML = "Loading flight data...";

    result.innerHTML = "";

    const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        loading.innerHTML = "";

        if (!data.data || data.data.length === 0) {
            result.innerHTML = "<p>No flight found</p>";
            return;
        }

        const flight = data.data[0];

        let statusColor = "white";

        if (flight.flight_status === "active") {
            statusColor = "lime";
        }
        else if (flight.flight_status === "delayed") {
            statusColor = "red";
        }
        else if (flight.flight_status === "scheduled") {
            statusColor = "orange";
        }

        result.innerHTML = `
        
            <div class="flight-card">

                <h2>✈️ Flight Details</h2>

                <p><strong>Flight Number:</strong> ${flight.flight.iata}</p>

                <p><strong>Airline:</strong> ${flight.airline.name}</p>

                <p><strong>Departure Airport:</strong> ${flight.departure.airport}</p>

                <p><strong>Arrival Airport:</strong> ${flight.arrival.airport}</p>

                <p><strong>Departure Time:</strong> ${flight.departure.scheduled || "N/A"}</p>

                <p><strong>Arrival Time:</strong> ${flight.arrival.scheduled || "N/A"}</p>

                <p><strong>Terminal:</strong> ${flight.departure.terminal || "N/A"}</p>

                <p><strong>Gate:</strong> ${flight.departure.gate || "N/A"}</p>

                <p>
                    <strong>Status:</strong>

                    <span style="color:${statusColor}; font-weight:bold;">
                        ${flight.flight_status.toUpperCase()}
                    </span>
                </p>

            </div>
        `;

    } catch (error) {

        loading.innerHTML = "";

        result.innerHTML = `
            <p style="color:red;">
                Error fetching flight data
            </p>
        `;

        console.log(error);
    }
}

/* Auto refresh every 30 seconds */

setInterval(() => {

    const flightNumber = document.getElementById("flightInput").value;

    if (flightNumber !== "") {
        getFlight();
    }

}, 30000);