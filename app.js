// Handle file selection and image display
document.getElementById('imagefile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updateImagePreview(e.target.result); // Update the image preview
            sendImageToBackend(e.target.result); // Send image data to the backend
        };
        reader.readAsDataURL(file); // Convert image file to Base64
    }
});

// Update the displayed image
function updateImagePreview(imageData) {
    document.getElementById('selected_image').src = imageData;
}

// Trigger file input when "Capture" button is clicked
document.getElementById('captureButton').addEventListener('click', function () {
    document.getElementById('imagefile').click();
});

// Send image data to backend for analysis
function sendImageToBackend(imageData) {
    fetch('http://your-backend-url/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
        .then(response => response.json())
        .then(data => displayResult(data.result))
        .catch(error => console.error('Error analyzing image:', error));
}

// Display analysis result
function displayResult(result) {
    document.getElementById('result').innerText = `Result: ${result}`;
    if (result === "Common Rust") {
        displayRemedies();
    }
}

// Display remedies for "Common Rust"
function displayRemedies() {
    const remediesContent = `
        <h3>Remedies for Common Rust:</h3>
        <ol>
            <li>Plant rust-resistant corn varieties.</li>
            <li>Apply fungicides at the first sign of rust.</li>
            <li>Rotate crops annually to prevent fungus buildup.</li>
            <li>Clean up infected plant debris after harvest.</li>
            <li>Sanitize farming equipment regularly.</li>
            <li>Ensure adequate spacing for good airflow.</li>
        </ol>
    `;
    document.getElementById('result').innerHTML += remediesContent;
}

// Redirect to remedies page
function openRemediesPage() {
    window.location.href = "remedies.html";
}

// Form submission for analysis
$(document).ready(function () {
    $('#analysis-form').submit(function (event) {
        event.preventDefault();
        const fileInput = $('#imagefile')[0].files;
        const analyzeButton = $('#analyze-button');

        if (!fileInput.length) {
            alert('Please select an image to analyze!');
            return;
        }

        analyzeButton.prop('disabled', true).text('Analyzing...');
        const formData = new FormData();
        formData.append('file', fileInput[0]);

        $.ajax({
            url: `${window.location.origin}/analyze`,
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
        })
            .done(data => displayResult(data.result))
            .fail(error => console.error('Analysis request failed:', error))
            .always(() => analyzeButton.prop('disabled', false).text('Analyze'));
    });
});
