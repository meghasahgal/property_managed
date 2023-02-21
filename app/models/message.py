from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # id = db.Column(db.Integer, primary_key=True)
    # room_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rooms.id')))
    # sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))) #took out nullable=false
    # message_body = db.Column(db.String(255))
    # created_at = db.Column(db.DateTime, default=datetime.now)
    # updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    message_body = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    # timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
# relationships
    # sender = db.relationship("User", back_populates='messages')
    # # user = db.relationship("User", back_populates='messages')
    # room = db.relationship("Room", back_populates='messages')

#normalization
    def to_dict(self):
            return {
                'id': self.id,
                'roomId': self.room_id,
                'senderId': self.sender_id,
                'messageBody': self.message_body,
                'createdAt': self.created_at,
                'updatedAt': self.updated_at

            }
    def to_dict_basic(self):
            return{
                'id': self.id,
                'chatId': self.chat_id,
                'senderId': self.sender_id,
                'messageBody': self.message_body,

            }
