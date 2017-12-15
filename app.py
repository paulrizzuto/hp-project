# Dependencies
import pymongo
from flask import Flask, jsonify, render_template, request

# Create App
app = Flask(__name__)

# Connect to MongoDB through Heroku
conn = "mongodb://admin:firebolt@ds125716.mlab.com:25716/heroku_bs24rhck"
client = pymongo.MongoClient(conn)
db = client.heroku_bs24rhck

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("pages/about.html")

@app.route("/sentiment")
def sentiment():
    return render_template("pages/sentiment.html")

@app.route("/timeline")
def timeline():
    return render_template("pages/timeline.html")

@app.route("/tree")
def tree():
    return render_template("pages/tree.html")

@app.route("/full")
def full():

    # Empty list for data
    full_data = []

    # Grab full data
    results = db.full.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"] 
        }

        full_data.append(character_info)

    return jsonify(full_data)

@app.route("/stone")
def stone():

    # Empty list for data
    stone_data = []

    # Grab stone data
    results = db.stone.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        stone_data.append(character_info)

    return jsonify(stone_data)

@app.route("/chamber")
def chamber():

    # Empty list for data
    chamber_data = []

    # Grab chamber data
    results = db.chamber.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        chamber_data.append(character_info)

    return jsonify(chamber_data)

@app.route("/prisoner")
def prisoner():

    # Empty list for data
    prisoner_data = []

    # Grab prisoner data
    results = db.prisoner.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        prisoner_data.append(character_info)

    return jsonify(prisoner_data)

@app.route("/goblet")
def goblet():

    # Empty list for data
    goblet_data = []

    # Grab goblet data
    results = db.goblet.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        goblet_data.append(character_info)

    return jsonify(goblet_data)

@app.route("/phoenix")
def phoenix():

    # Empty list for data
    phoenix_data = []

    # Grab phoenix data
    results = db.phoenix.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        phoenix_data.append(character_info)

    return jsonify(phoenix_data)

@app.route("/prince")
def prince():

    # Empty list for data
    prince_data = []

    # Grab prince data
    results = db.prince.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        prince_data.append(character_info)

    return jsonify(prince_data)

@app.route("/hallows")
def hallows():

    # Empty list for data
    hallows_data = []

    # Grab hallows data
    results = db.hallows.find()

    # Append data
    for result in results:
        character_info = {
            "character": result["character"],
            "full_name": result["full_name"],
            "blood_status": result["blood_status"],
            "house": result["house"],
            "species": result["species"],
            "image_url": result["image_url"],
            "first_appearance": result["first_appearance"],
            "last_appearance": result["last_appearance"],
            "year": result["year"]
        }

        hallows_data.append(character_info)

    return jsonify(hallows_data)

@app.route("/senti")
def senti():
    
    # Grab sentiment results for book 7
    results = db.sentiment.find()[0]

    pages = results["pages_overall"]
    books = results["book_name"]
    sentiment_full = results["moving_sentiment_full"]
    Dumbledore = results["Dumbledore_sentiment"]
    Snape = results["Snape_sentiment"]
    Harry = results["Harry_sentiment"]
    Voldemort = results["Voldemort_sentiment"]
    chapters = results["chapter_name"]
    sentiment_positive = results["sentiment_positive"]
    sentiment_negative = results["sentiment_negative"]
    Ron = results["Ron_sentiment"]
    Hermione = results["Hermione_sentiment"]
    trendline = results["trendline"]

    return jsonify(pages, books, sentiment_full, Dumbledore, Snape, Harry, Voldemort, chapters, sentiment_positive, sentiment_negative, Ron, Hermione, trendline)

# Run app
if __name__ == "__main__":
    app.run(debug=True)