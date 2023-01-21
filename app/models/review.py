from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stars = db.Column(db.String(10), nullable=False)
    review_body = db.Column(db.String(255), nullable=False)

#relationships
    user = db.relationship('User', back_populates='user_reviews')


#normalization

def to_dict(self):
        return {
            'id': self.id,
            'stars': self.stars,
            'reviewBody': self.review_body,
            'userId': self.user_id,
            'user': self.user.to_dict_basic()
        }

def to_dict_basic(self):
        return {
            'stars': self.stars,
            'reviewBody': self.review_body,
            'userId': self.user_id,
        }

def __repr__(self):
        return f"<User id: {self.id}, description: {self.description}, user_id: {self.user_id}>"
