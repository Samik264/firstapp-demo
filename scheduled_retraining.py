import threading
import time
from train_model import train_model

# Function to retrain the model periodically
def scheduled_retraining():
    while True:
        train_model()
        print("Model retrained.")
        time.sleep(86400)  # Retrain the model every day

if __name__ == "__main__":
    retraining_thread = threading.Thread(target=scheduled_retraining)
    retraining_thread.start()
