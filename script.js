const elements = {
    ipAdress: document.querySelector(".ip-adress .value"),
    location: document.querySelector(".location .value"),
    timezone: document.querySelector(".time-zone .value"),
    isp: document.querySelector(".isp .value"),
    ipInput: document.querySelector(".ip-input input")
};
const btns = {
    sendIpInputBtn: document.querySelector(".ip-input button")
};
const ipData = {
    ip: undefined,
    location: undefined,
    timezone: undefined,
    isp: undefined
}
let map, marker;
//main
window.addEventListener("DOMContentLoaded", async () => {
    //load the map on load with the user's current IP adress
    const userIp = await getCurrentIpAdress();
    const data = await fetchData(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SKlt6CzcbmcPtJA7EYqcijWa4ADPh&ipAddress=${userIp}`);
    if (!data) return;
    createMap(data)
})
btns.sendIpInputBtn.addEventListener("click", updateMap);
elements.ipInput.addEventListener("keydown", e => {
    if (e.code == "Enter") {
        updateMap();
    }
})
btns.sendIpInputBtn.addEventListener("keydown", e => {
    if (e.code == "Enter") {
        updateMap();
    }
})

//end main

async function getCurrentIpAdress() {
    const response = await fetchData('https://api.ipify.org?format=json');
    return response.ip;
}
async function fetchData(link) {
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort() }, 30000);
    try {
        const response = await fetch(link, { signal: controller.signal })
        if (!response.ok) throw new Error("not found, code: " + response.status);
        return await response.json();
    }
    catch (err) {
        if (err.name == "AbortError") {
            console.log("Abort error: exceeded time limit, fetch aborted")
        } else {
            console.log("Fetch Error: " + err)
        }
        return null;
    }
    finally {
        clearTimeout(timeout);
    }
}

async function createMap(data) {
    updateIpData(data);
    updatePageData();
    const [lat, long] = [data.location.lat, data.location.lng];
    if (map) {
        map.setView([lat, long], 13);
        marker.setLatLng([lat, long]);
        return;
    }
    map = L.map('map').setView([lat, long], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    marker = L.marker([lat, long]).addTo(map);
}
async function updateIpData(data) {
    ipData.ip = data.ip;
    ipData.location = `${data.location.region}, ${data.location.city}, ${data.location.postalCode}`;
    ipData.timezone = `UTC${data.location.timezone}`;
    ipData.isp = data.isp;
}
async function updatePageData() {
    elements.ipAdress.innerText = ipData.ip;
    elements.location.innerText = ipData.location == ", , " ? "Unknown" : ipData.location;
    elements.timezone.innerText = ipData.timezone == "UTC" ? "Unknown" : ipData.timezone;
    elements.isp.innerText = ipData.isp || "Unknown";
}
async function updateMap() {

    const inputValue = elements.ipInput.value;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9-_]+\.[a-zA-Z]{2,6}$/;
    let type;
    if (ipv6Regex.test(inputValue) || ipv4Regex.test(inputValue) ) {
        type = "ipAddress"
    } else if (domainRegex.test(inputValue)) {
        type = "domain"
    } else return;
    const data = await fetchData(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SKlt6CzcbmcPtJA7EYqcijWa4ADPh&${type}=${inputValue}`);
    createMap(data);
}
