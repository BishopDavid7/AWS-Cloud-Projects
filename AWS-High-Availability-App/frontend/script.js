const API_GATEWAY_URL = "YOUR_API_GATEWAY_INVOKE_URL";

async function fetchLabels() {
    let imageID = document.getElementById("imageID").value;
    let response = await fetch(`${API_GATEWAY_URL}?image_name=${imageID}`);
    let data = await response.json();
    document.getElementById("labelsResult").innerText = JSON.stringify(data, null, 2);
}
