// Replace with your actual API Gateway URL
const API_GATEWAY_URL = "https://your-api-gateway-url.amazonaws.com/prod";

// Handle image upload
async function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return alert("Please select an image.");

    const fileName = file.name;
    const uploadUrl = `${API_GATEWAY_URL}/upload?fileName=${encodeURIComponent(fileName)}`;

    try {
        // Step 1: Get a pre-signed URL from API Gateway
        const response = await fetch(uploadUrl);
        const data = await response.json();
        const presignedUrl = data.uploadUrl;

        // Step 2: Upload the image to S3
        await fetch(presignedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type
            }
        });

        console.log("Image uploaded successfully:", fileName);

        // Step 3: Analyze the image using Rekognition
        await analyzeImage(fileName);
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed. Check the console for more details.");
    }
}

// Analyze image using Rekognition
async function analyzeImage(fileName) {
    const analyzeUrl = `${API_GATEWAY_URL}/analyze?fileName=${encodeURIComponent(fileName)}`;

    try {
        const response = await fetch(analyzeUrl);
        const data = await response.json();
        
        if (!data.labels || data.labels.length === 0) {
            alert("No labels detected in the image.");
            return;
        }

        displayLabels(data.labels);
    } catch (error) {
        console.error("Error analyzing image:", error);
        alert("Image analysis failed. Check the console for details.");
    }
}

// Display detected labels on the frontend
function displayLabels(labels) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<h3>Detected Labels:</h3>";

    const list = document.createElement("ul");
    labels.forEach(label => {
        const listItem = document.createElement("li");
        listItem.textContent = `${label.Name} (Confidence: ${label.Confidence.toFixed(2)}%)`;
        list.appendChild(listItem);
    });

    resultsContainer.appendChild(list);
}

// Event listener for file input
document.getElementById("imageUpload").addEventListener("change", uploadImage);
