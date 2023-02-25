from app.models import db, Chat, environment, SCHEMA
def seed_chats():

    chat1 = Chat(user1_id = 2, user2_id =1)
    chat2 = Chat(user1_id = 1, user2_id =2)
    chat3 = Chat(user1_id = 3, user2_id =4)
    chat4 = Chat(user1_id = 4, user2_id =3)
    chat5 = Chat(user1_id = 5, user2_id =3)

    db.session.add_all([chat1,chat2,chat3,chat4,chat5])
   
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_chats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM chats")

    db.session.commit()
