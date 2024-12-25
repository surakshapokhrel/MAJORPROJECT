// Upload the captured image when "Upload" button is clicked
document.getElementById('uploadButton').addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    const imageData = canvas.toDataURL('image/png'); // Get Base64 image data
    sendImageToBackend(imageData); // Send image data to backend
});

// Send image data to backend for analysis
function sendImageToBackend(imageData) {
    fetch('/analyze', { // Ensure this URL matches your Flask backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Analysis result:', data);
            displayResult(data.result);
        })
        .catch(error => console.error('Error analyzing image:', error));
}

// Display analysis result
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerText = `Result: ${result}`;
    }
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

// Form submission for file upload (fallback method)
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
