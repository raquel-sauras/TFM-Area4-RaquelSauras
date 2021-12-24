import tensorflow as tf
import numpy as np
import json
import requests


SIZE=64
MODEL_URI='http://model-serving:8501/v1/models/model:predict'
CLASSES = ['NORMAL', 'PNEUMONIA BACTERIA', 'PNEUMONIA VIRUS']

def get_prediction(logger, image_path):
    print("getting precition")
    logger.info('Getting prediction')
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(SIZE, SIZE))
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = np.expand_dims(image, axis=0)

    data = json.dumps({
        'instances': image.tolist()
    })
    logger.info("Sending request to tensorflow serving")
    response = requests.post(MODEL_URI, data=data.encode('utf-8'))
    result = json.loads(response.text)
    logger.info(result)

    print(response.text)

    nClass = -1
    highest = 0
    idx = 0
    predictions = result["predictions"][0]
    logger.info(f"Checking predictions: {predictions}")
    for prediction in predictions:
        logger.info(f"Checking prediction: {prediction}")
        if prediction > highest and prediction > 0.5:
            highest = prediction
            nClass = idx
        idx += 1

    logger.info(f"highest: {highest} nClass: {nClass}")
    class_name = CLASSES[nClass]
    logger.info(f"Class name: {class_name}")
    return class_name