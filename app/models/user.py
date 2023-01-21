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
    profile_img = db.Column(db.String(255))
    property_type = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10), unique=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String(5), nullable=False)
    avg_rating = db.Column(db.Decimal(10,2))
    hashed_password = db.Column(db.String(255), nullable=False)

#relationships
    user_reviews = db.relationship(db.Review, back_populates="user", cascade='all,delete')



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
            'profileImg': self.profile_img,
            'propertyType': self.property_type,
            'phoneNumber': self.phone_number,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'avgRating': self.avg_rating,
            'reviews':[review.to_dict_basic() for review in self.user_reviews],
            # 'orders': [order.to_dict_basic() for order in self.user_orders],
            # 'creditCards': [payment.to_dict_basic() for payment in self.user_credit_cards],
        }

    def to_dict_basic(self):
        return {
            'username': self.username,
            'email': self.email,
            'category': self.category,
            'phoneNumber': self.phone_number,
            'profileImg': self.profile_img,
            'city': self.city,
            'state': self.state,
            'avgRating': self.avg_rating

        }
