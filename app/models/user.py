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
    # leads = db.relationship('Hire', back_populates="user_leads")
    hires_as_user1 = db.relationship('Hire', foreign_keys='Hire.user1_id', backref='user1', lazy=True, cascade='all,delete')
    hires_as_user2 = db.relationship('Hire', foreign_keys='Hire.user2_id', backref='user2', lazy=True,cascade='all,delete')
    loves_as_user1 = db.relationship('Love', foreign_keys='Love.user1_id', backref='user1', lazy=True, cascade='all,delete')
    loves_as_user2 = db.relationship('Love', foreign_keys='Love.user2_id', backref='user2', lazy=True,cascade='all,delete')
    recipients = db.relationship('Message',foreign_keys='Message.sender_id', back_populates="sender") # try message.sender_id if not working
    senders = db.relationship('Message',foreign_keys='Message.recipient_id', back_populates="recipient")

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
            'senders':[sender.to_dict_basic() for sender in self.senders],
            'recipients': [recipient.to_dict_basic() for recipient in self.recipients],
            'hiresAsUserId1': [hire.to_dict_basic() for hire in self.hires_as_user1],
            'hiresAsUserId2': [hire.to_dict_basic() for hire in self.hires_as_user2],
            'lovesAsUserId1': [love.to_dict_basic() for love in self.loves_as_user1],
            'lovesAsUserId2': [love.to_dict_basic() for love in self.loves_as_user2],

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
            'hiresAsUserId1': [hire.to_dict_basic() for hire in self.hires_as_user1],
            'hiresAsUserId2': [hire.to_dict_basic() for hire in self.hires_as_user2],
            'lovesAsUserId1': [love.to_dict_basic() for love in self.loves_as_user1],
            'lovesAsUserId2': [love.to_dict_basic() for love in self.loves_as_user2],

        }
