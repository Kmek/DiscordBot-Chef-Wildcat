// Bot Stats
// Script for fetching data

//******************** Helper Functions ********************//

// Temp function to show an error
function showError(error) {
    console.log("ERROR: " + error);
}

// Check for possible errors from the response
async function errorCheckResponse(response) {
    // Error handle in here
    if (response == null) {
        showError("No response received from fetch");
    } else if (response.status == 200) {
        return await response.json();
    } else if (response.status == 404) {
        showError("The requested page endpoint was not found");
    } else if (response.status == 500) {
        showError("An internal server error occurred");
    }
    return null;
}

//******************** Basic Fetch Functions ********************//

// Basic fetch when given a url
// Note: Fetches to the same host url only need the endpoint
async function basicFetch(url) {
    console.log("Fetching from: " + url);
    let response = await fetch(url, { method: 'GET', credentials: 'omit' })
        .catch(error => {
            console.log(error);
            return null;
        })
    
    console.info("\tResponse: ", response);

    return errorCheckResponse(response);
}

//******************** Endpoint Functions ********************//
// Gets the Dining Halls
async function getDiningHalls() {
    return basicFetch("/getDiningHalls");
}

// Gets the ScrapeCache
async function getScrapeCache() {
    return basicFetch("/getScrapeCache");
}

// Gets the Subscriptions
async function getSubs() {
    return basicFetch("/getSubs");
}

// Gets the Dm Info
async function getDmInfo() {
    return basicFetch("/getDmInfo");
}