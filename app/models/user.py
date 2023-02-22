from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    pm_tagline = db.Column(db.String(255))
    is_pm = db.Column(db.Boolean, nullable=False, default=False)
    profile_img = db.Column(db.String(255))
    property_type = db.Column(db.String(255))
    pm_rate = db.Column(db.Integer)
    phone_number = db.Column(db.String(10), unique=True)
    city = db.Column(db.String(50))
    state = db.Column(db.String(2))
    zipcode = db.Column(db.String(5))
    avg_rating = db.Column(db.String(3))
    hashed_password = db.Column(db.String(255), nullable=False)

#relationships
    reviews = db.relationship('Review', back_populates="user", cascade='all,delete')

    chats_as_user1 = db.relationship('Chat', foreign_keys='Chat.user1_id', backref='user1', lazy=True)
    chats_as_user2 = db.relationship('Chat', foreign_keys='Chat.user2_id', backref='user2', lazy=True)
    messages_sent = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'pmTagline': self.pm_tagline,
            'isPm': self.is_pm,
            'profileImg': self.profile_img,
            'propertyType': self.property_type,
            'pmRate': self.pm_rate,
            'phoneNumber': self.phone_number,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'avgRating': self.avg_rating,
            'reviews':[review.to_dict_basic() for review in self.reviews],
            'chatsAsUserId1': [chat.to_dict_basic() for chat in self.chats_as_user1],
            'chatsAsUserId2': [chat.to_dict_basic() for chat in self.chats_as_user2],
            'messages': [message.to_dict_basic() for message in self.messages]
            # 'senders':[sender.to_dict_basic() for sender in self.senders],
            # 'recipients': [recipient.to_dict_basic() for recipient in self.recipients]
            # 'leads': [lead.to_dict_basic() for lead in self.leads]
            # 'orders': [order.to_dict_basic() for order in self.user_orders],
            # 'creditCards': [payment.to_dict_basic() for payment in self.user_credit_cards],
        }

    def to_dict_basic(self):
        return {
            'username': self.username,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'profileImg': self.profile_img,
            'isPm': self.is_pm,
            'city': self.city,
            'state': self.state,
            'avgRating': self.avg_rating,
            'chatsAsUserId1': self.chats_as_user1,
            'chatsAsUserId2': self.chats_as_user2,
            'messages': self.messages

        }
