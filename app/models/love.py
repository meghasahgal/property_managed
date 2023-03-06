from .db import db, environment, SCHEMA, add_prefix_for_prod

class Love(db.Model):
    __tablename__ = "loves"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    love = db.Column(db.Boolean, nullable=True)
    # dislove = db.Column(db.Boolean, nullable=True)

    user_response = db.relationship('User', back_populates='response_user')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'love': self.love,
            # 'dislike': self.dislike
        }
