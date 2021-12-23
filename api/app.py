import json
import os

from flask import Flask, request
from flask_cors import CORS

# from flask_cors import CORS
import model

app = Flask(__name__)
CORS(app)


@app.route('/api/v1/predict', methods=['POST'])
def image_classifier():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        image_path = os.path.join('static', uploaded_file.filename)
        uploaded_file.save(image_path)
        class_name = model.get_prediction(app.logger, image_path)
        result = {
            'class_name': class_name,
            'image_path': image_path,
        }
        return json.dumps(result)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
