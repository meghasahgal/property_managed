from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_login import current_user


# many to many table
# chat_user = db.Table('chat_user',
#     db.Column('chat_id', db.Integer, db.ForeignKey(add_prefix_for_prod('chats.id')), primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
# )


class Chat(db.Model):
     __tablename__ = 'chats'

     if environment == "production":
        __table_args__ = {'schema': SCHEMA}

     id = db.Column(db.Integer, primary_key=True)
     user1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     user2_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    #  messages = db.relationship('Message', back_populates='chat', cascade="all,delete")

     def to_dict(self):
            return {
                'id': self.id,
                'user1Id': self.user1_id,
                'user2Id': self.user2_id,
                # 'user': next((user.to_dict() for user in self.users if user.id != current_user.id), {}),
                # 'messsages': [message.to_dict() for message in self.messages]
            }
     def to_dict_basic(self):
            return{
                'id': self.id,
                'user1Id': self.user1_id,
                'user2Id': self.user2_id
            }

     def __repr__(self):
            return f"<Chat id: {self.id}, user1Id: {self.user1_id}, user2Id: {self.user2_id}>"
# class Message(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
#     sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     content = db.Column(db.String(500), nullable=False)
#     timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(20), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(60), nullable=False)

#     chats_as_user1 = db.relationship('Chat', foreign_keys='Room.user1_id', backref='user1', lazy=True)
#     chats_as_user2 = db.relationship('Chat', foreign_keys='Room.user2_id', backref='user2', lazy=True)
#     messages_sent = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)
