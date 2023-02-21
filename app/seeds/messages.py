from app.models import db, Message, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_messages():

    message1 = Message(chat_id=1, sender_id = 3, message_body = "Hello! I'm interested in your services! How are you?", created_at=datetime(2015, 6, 5, 10, 20, 11), updated_at=datetime(2015, 6, 5, 10, 20, 11))
    message2 = Message(chat_id=2, sender_id = 2, message_body = "Doing well! How are you?", created_at=datetime(2015, 6, 5, 10, 20, 11), updated_at=datetime(2015, 6, 5, 10, 20, 11))
    message3 = Message(chat_id=3, sender_id = 4, message_body = "Hello! How are you?", created_at=datetime(2015, 6, 5, 10, 20, 11), updated_at=datetime(2015, 6, 5, 10, 20, 11))
    message4 = Message(chat_id=4, sender_id = 4, message_body = "Hello! How are you?", created_at=datetime(2015, 6, 5, 10, 20, 11), updated_at=datetime(2015, 6, 5, 10, 20, 11))
    message5 = Message(chat_id=5, sender_id = 5, message_body = "Hello! How are you?", created_at=datetime(2015, 6, 5, 10, 20, 11), updated_at=datetime(2015, 6, 5, 10, 20, 11))
    message6 = Message(chat_id=6, sender_id = 6, message_body = "Hello! How are you?", created_at=datetime(2015, 6, 5, 10, 20, 11), updated_at=datetime(2015, 6, 5, 10, 20, 11))



    db.session.add_all([message1, message2, message3, message4, message5, message6])
    db.session.commit()

                # 'roomId': self.room_id,
                # 'senderId': self.sender_id,
                # 'messageBody': self.message_body,
                # 'createdAt': self.created_at,
                # 'updatedAt': self.updated_at

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
