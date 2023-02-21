from app.models import db, Review, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_reviews():

    review1 = Review(stars = '2', review_body = "Excellent service!",     user_id = 1, reviewer_id=2)
    review2 = Review(stars = '4', review_body = "Quick and to the point!", user_id = 2, reviewer_id=1)
    review3 = Review(stars = '2', review_body = "Addresses all of my needs in time!", user_id = 3, reviewer_id=4)
    review4 = Review(stars = '3', review_body = "Friendly and responsive -- great caretaker!", user_id = 1, reviewer_id=5)
    review5 = Review(stars = '4', review_body = "Loves to help out!", user_id = 1, reviewer_id=3)

    db.session.add_all([review1,review2,review3,review4,review5])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
