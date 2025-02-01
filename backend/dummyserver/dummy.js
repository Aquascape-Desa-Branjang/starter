// Function to generate a random number between 50 and 100
function getRandomNumber() {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
}

// Function to send data to the API
async function sendDataToAPI() {
    const apiUrl = 'http://localhost:5000/api/DO/A'; // Replace with your API endpoint
    const randomNumber = getRandomNumber();
    const data = {
        oksigen_terlarut: randomNumber
    }; // Replace with the data you want to send

    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // or 'GET', 'PUT', 'DELETE', etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);
    } catch (error) {
        console.error('Error sending data to API:', error);
    }
}

// Set interval to send data every 3 seconds (3000 milliseconds)
setInterval(sendDataToAPI, 3000);
