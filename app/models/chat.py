from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Chat(db.Model):
     __tablename__ = 'chats'

     if environment == "production":
        __table_args__ = {'schema': SCHEMA}

     id = db.Column(db.Integer, primary_key=True)
     user1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     user2_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     messages = db.relationship('Message', backref='chat', lazy=True)

    #  id = db.Column(db.Integer, primary_key=True)
    #  pm_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    #  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


#relationships
# user can have many messages
# room can have many messages
# room has many messages

    #  messages = db.relationship('Message',back_populates='room')
    #  users = db.relationship('User', back_populates='rooms')
    #  pm_id = db.relationship('')


#normalization
def to_dict(self):
            return {
                'id': self.id,
                'user1Id': self.user1_id,
                'user2Id': self.user2_id,
                'messsages': [message.to_dict() for message in self.messages]
            }
def to_dict_basic(self):
            return{
                'id': self.id,
                'user1Id': self.user1_id,
                'user2Id': self.user2_id
            }

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
