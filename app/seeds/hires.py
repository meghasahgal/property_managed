from app.models import db, Hire, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_hires():

    hire1 = Hire(user1_id = 1,user2_id = 2, quantity = 1,  price = 12.99)
    hire2 = Hire(user1_id = 2,user2_id=3, quantity =1, price = 12.99)

    db.session.add_all([hire1, hire2])
    db.session.commit()


    # id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # quantity = db.Column(db.Integer)
    # price = db.Column(db.Numeric(asdecimal=False))

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_hires():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.hires RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM hires")

    db.session.commit()
