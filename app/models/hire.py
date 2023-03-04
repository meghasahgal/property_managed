from .db import db, environment, SCHEMA, add_prefix_for_prod


class Hire(db.Model):
    __tablename__ = 'hires'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(asdecimal=False))
    # is_serious = db.Column(db.Boolean, nullable=False, default=False)

#relationships
    # user_leads = db.relationship('User', back_populates='leads')

#normalization
    def to_dict(self):
            return {
                'id': self.id,
                'user1Id': self.user1_id,
                'user2Id': self.user2_id,
                'quantity': self.quantity,
                'price': self.price,
                # 'isSerious': self.is_serious,
                # 'user': self.user_leads.to_dict_basic()
            }

    def to_dict_basic(self):
            return {
                'id': self.id,
                'user1Id': self.user1_id,
                'user2Id': self.user2_id,
                'quantity': self.quantity,
                'price': self.price,
                # 'user': self.user_leads.to_dict_basic()

            }
