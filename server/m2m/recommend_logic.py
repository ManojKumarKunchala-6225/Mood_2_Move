# m2m/recommend_logic.py

import pandas as pd
import os
from django.conf import settings

def load_data():
    """
    Loads data from Excel files using a full path.
    This function will be called only once when the server starts.
    """
    try:
        # Construct the full path to the data files
        data_path = os.path.join(settings.BASE_DIR, 'm2m', 'data')
        destinations_file = os.path.join(data_path, 'destination.xlsx')
        place_details_file = os.path.join(data_path, 'place_details.xlsx')

        # Load the destination file
        destinations_df = pd.read_excel(destinations_file)
        destinations_df['Destination'] = destinations_df['Destination'].str.strip().str.title()
        destinations_df.set_index('Destination', inplace=True)

        # Load the place details file
        place_info_df = pd.read_excel(place_details_file)
        place_info_df['Place'] = place_info_df['Place'].str.strip().str.title()
        place_info_df.drop_duplicates(subset='Place', keep='first', inplace=True)
        place_details_dict = place_info_df.set_index('Place').to_dict('index')

        print("✅ Recommendation data loaded successfully!")
        return destinations_df, place_details_dict

    except FileNotFoundError as e:
        print(f"❌ Error loading recommendation data: {e}")
        return None, None

# --- IMPORTANT ---
# Load the data into memory when the Django app starts
DESTINATIONS_DF, PLACE_DETAILS_DICT = load_data()


def find_recommendations(user_choices):
    """
    This is your main logic function, adapted for the API.
    It takes user choices as a dictionary and returns a list of results.
    """
    if DESTINATIONS_DF is None:
        return [] # Return empty list if data failed to load

    # Build the column names from the user's choices
    mood_col = f"Mood_{user_choices['mood'].title()}"
    people_col = f"People_{user_choices['people'].title()}"
    location_col = f"Region_{user_choices['location'].title()}"

    # Filter the DataFrame
    try:
        matches = DESTINATIONS_DF[
            (DESTINATIONS_DF[mood_col] == 1) &
            (DESTINATIONS_DF[people_col] == 1) &
            (DESTINATIONS_DF[location_col] == 1)
        ]
        
        recommended_places = matches.index.unique().tolist()
        
        # Prepare the results with details
        results = []
        for place in recommended_places:
            details = PLACE_DETAILS_DICT.get(place, {})
            results.append({
                'place': place,
                'food': details.get('Food', 'N/A'),
                'hotels': details.get('Hotels', 'N/A'),
                'shopping': details.get('Shopping', 'N/A'),
                'nearby_places': details.get('Nearby_Places', 'N/A')
            })
        return results

    except KeyError as e:
        # This can happen if a column name is not found
        print(f"Error during filtering: Invalid choice resulting in column {e}")
        return []