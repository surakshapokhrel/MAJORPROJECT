from flask import Flask, request, jsonify, render_template
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/remedies')
def remedy():
    return render_template("remedies.html")

@app.route('/common-rust')
def commonrust():
    return render_template("remedy_common_rust.html")


@app.route('/northen-blight')
def north():
    return render_template("northenblight.htmlS")


@app.route('/gray-leaf')
def grayleaf():
    return render_template("remedy_gray_leaf.html")


@app.route('/southen-blight')
def south():
    return render_template("southenblight.html")



@app.route('/analyze', methods=['POST'])
def analyze_image():
    data = request.json
    if 'image' in data:
        image_data = data['image']
        image_data = image_data.split(",")[1]  # Strip the "data:image/png;base64," prefix
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes))

        # Mock analysis logic
        result = "Healthy"  # Replace with real image analysis logic
        return jsonify({"result": result})

    return jsonify({"error": "No image data provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)
