# AI Trip Planner

A modern AI-powered trip planner web application that helps users plan their trips based on various preferences like budget, group size, and trip duration. The application provides personalized recommendations and organizes them into a detailed itinerary with information about each location, including descriptions, images, ratings, ticket prices, and more.

## [Live Demo](https://manyam-ai-planner.netlify.app/)

### Features

- **Personalized Trip Planning**: Choose your destination, budget, group size, and trip duration.
- **Detailed Itinerary**: View your trip organized by days with each place's details, images, ticket pricing, and travel times.
- **CSV Export**: Download your trip data as a CSV file, excluding latitude and longitude, for easy access and sharing.

### Tech Stack

- **Database**: FireBase
- **AI**: Gemini-AI
- **Model**: Gemini-Flash 2.0
- **Frontend**: React.js
- **Backend**: Express js (for handling APIs and server-side logic)
- **API**: Google Places API (for fetching place details)
- **Styling**: Tailwind CSS
- **CSV Export**: React-CSV for exporting trip data

### Screenshots

![Trip Planner](./assets/screenshots/landing.png)  
*Home Page with Trip Planning Form*

![Itinerary](./assets/screenshots/itinerary.png)  
*Generated Trip Itinerary*

### How to Run Locally

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-trip-planner.git
    cd ai-trip-planner
    ```

2. **Install dependencies**:
    For the frontend (React app):
    ```bash
    npm install
    ```

3. **Run the application**:
    For the frontend:
    ```bash
    npm start
    ```
    The application will run on [http://localhost:3000](http://localhost:3000).

    **Backend**:
    - Set up the Spring Boot backend (if applicable).
    - Make sure the API endpoints are correctly configured and accessible from the frontend.

### How to Use

1. **Select Your Preferences**:
    - Enter your **destination**, **trip duration**, **budget**, and **group size**.
    - Click the **Plan My Trip** button to generate a personalized trip itinerary.

2. **View the Itinerary**:
    - The app will show you a detailed itinerary with locations and information based on your preferences.
    - Each location includes a description, image, ticket pricing, and rating.

3. **Export the Data**:
    - Use the **CSV export button** to download your trip data as a CSV file.
    - The CSV file will contain trip details excluding latitude and longitude.

