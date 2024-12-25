// Access webcam and stream to video element
const videoElement = document.getElementById('videoElement');
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        videoElement.srcObject = stream;
    })
    .catch(error => console.error('Error accessing webcam:', error));

// Capture image from webcam when "Capture" button is clicked
document.getElementById('captureButton').addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size to match video feed dimensions
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert canvas image to Base64 data URL
    const imageData = canvas.toDataURL('image/png');
    updateImagePreview(imageData); // Show preview of captured image
    document.getElementById('uploadButton').style.display = 'inline'; // Enable "Upload" button
});

// Update the displayed image
function updateImagePreview(imageData) {
    const selectedImage = document.getElementById('selected_image');
    if (selectedImage) {
        selectedImage.src = imageData;
    } else {
        console.warn('Preview element not found.');
    }
}
