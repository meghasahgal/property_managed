from app.models import db, Message, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_messages():

    message1 = Message(sender_id = 3, recipient_id = 2,  message_body = "Hello! I'm interested in your services! How are you?", created_at='2023-02-13 08:25:33', updated_at='2023-02-13 08:25:33')
    message2 = Message(sender_id = 2, recipient_id = 3,  message_body = "Doing well! How are you?", created_at='2023-02-13 08:25:33', updated_at='2023-02-13 08:25:33')
    message3 = Message(sender_id = 4, recipient_id = 2,  message_body = "Hello! How are you?", created_at='2023-02-13 08:25:36', updated_at='2023-02-13 08:25:36')
    message4 = Message(sender_id = 4, recipient_id = 1,  message_body = "Hello! How are you?", created_at='2023-02-13 08:25:37', updated_at='2023-02-13 08:25:37')
    message5 = Message(sender_id = 5, recipient_id = 2,  message_body = "Hello! How are you?", created_at='2023-02-13 08:25:38', updated_at='2023-02-13 08:25:38')
    message6 = Message(sender_id = 6, recipient_id = 1,  message_body = "Hello! How are you?", created_at='2023-02-13 08:25:39', updated_at='2023-02-13 08:25:39')

    db.session.add_all([message1, message2, message3, message4, message5, message6])
    db.session.commit()


    # sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # message_body = db.Column(db.String(255))
    # created_at = db.Column(db.Date, nullable=False)
    # updated_at = db.Column(db.Date)


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
