import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# Define the URL of the website to scrape
url = 'https://www.betika.com/aviator'  # Replace with the actual URL

# Function to scrape the data
def scrape_aviator_data():
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Parse the data (example structure, adjust according to actual HTML)
    games = soup.find_all('div', class_='game-result')
    
    data = []
    for game in games:
        result = game.find('span', class_='result').text
        timestamp = game.find('span', class_='timestamp').text
        data.append({'result': result, 'timestamp': timestamp})
    
    return pd.DataFrame(data)

# Schedule the data scraping to run periodically
def scheduled_scraping():
    while True:
        df = scrape_aviator_data()
        df.to_csv('data/aviator_game_data.csv', mode='a', header=False, index=False)
        print("Data scraped and saved.")
        time.sleep(3600)  # Scrape data every hour

if __name__ == "__main__":
    scheduled_scraping()
