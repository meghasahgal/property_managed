from .db import db, environment, SCHEMA, add_prefix_for_prod


class Lead(db.Model):
    __tablename__ = 'leads'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(asdecimal=False))
    is_serious = db.Column(db.Boolean, nullable=False, default=False)

#relationships
# user_leads = db.relationship('User', back_populates='leads')

#normalization
    def to_dict(self):
            return {
                'id': self.id,
                'userId': self.user_id,
                'quantity': self.quantity,
                'price': self.price,
                # 'isSerious': self.is_serious,
                # 'userLeads': self.user.to_dict_basic()
            }
