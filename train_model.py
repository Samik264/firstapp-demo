import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

def train_model():
    # Load processed data
    X = pd.read_csv('data/X.csv')
    y = pd.read_csv('data/y.csv')

    # Encode the target variable
    le = LabelEncoder()
    y = le.fit_transform(y.values.ravel())

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Standardize the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Hyperparameter tuning for Random Forest using Grid Search
    param_grid_rf = {
        'n_estimators': [100, 200, 300],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }

    grid_search_rf = GridSearchCV(estimator=RandomForestClassifier(), param_grid=param_grid_rf, cv=5, n_jobs=-1, verbose=2)
    grid_search_rf.fit(X_train_scaled, y_train)
    best_rf = grid_search_rf.best_estimator_

    # Save the trained model, scaler, and label encoder
    joblib.dump(best_rf, 'models/aviator_predictor_model.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')
    joblib.dump(le, 'models/label_encoder.pkl')

if __name__ == "__main__":
    train_model()
