from .db import db, environment, SCHEMA, add_prefix_for_prod

class Love(db.Model):
    __tablename__ = "loves"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

        """User can have many loves"""

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # user = db.relationship('User', back_populates='loved_by_users')

    def to_dict(self):
        return {
            'id': self.id,
            'user1_id': self.user1_id,
            'user2_id': self.user2_id
        }
