from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id')) #took out nullable=false
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'))  #took out nullable=false
    message_body = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

#relationships
    sender = db.relationship("User", foreign_keys=[sender_id], back_populates='recipients')
    recipient = db.relationship("User", foreign_keys=[recipient_id], back_populates='senders')


#normalization
    def to_dict(self):
            return {
                'id': self.id,
                'senderId': self.sender_id,
                'senders': [sender.to_dict_basic() for sender in self.senders],
                'recipientId': self.recipient_id,
                'messageBody': self.message_body,
            }
    def to_dict_basic(self):
            return{
                'id': self.id,
                'senderId': self.sender_id,
                'recipientId': self.recipient_id,

            }
