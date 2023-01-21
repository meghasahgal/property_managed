from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', pm_tagline="Doing My Best To Get You a Great ROI",profile_img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydHklMjBtYW5hZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",property_type="Residential", pm_rate="15", phone_number="5102997611", city="Sacramento", state="CA", zipcode="94203", avg_rating="4.8")
    user2 = User(username='marnie', email='marnie@aa.io', password='password', pm_tagline="Doing My Best To Get You a Great Deal!",profile_img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydHklMjBtYW5hZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",property_type="Residential",pm_rate="10", phone_number="5102997611", city="Newark", state="CA", zipcode="94203", avg_rating="4.8")
    user3 = User(username='bill', email='bill@aa.io', password='password', pm_tagline="Doing My Best To Get You a Great Run For Your Investment!",profile_img="https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGVzdGF0ZSUyMGFnZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",property_type="Commercial",pm_rate="20", phone_number="5102997612", city="Sacramento", state="CA", zipcode="94203", avg_rating="4.5")
    user4 = User(username='elmo', email='elmo@aa.io', password='password',profile_img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydHklMjBtYW5hZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",property_type="Commercial", phone_number="5102997613", city="Sacramento", state="CA", zipcode="94203")
    user5 = User(username='bigbird', email='bigbirde@aa.io', password='password',profile_img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydHklMjBtYW5hZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",property_type="Retail", phone_number="5102997614", city="Sacramento", state="CA", zipcode="94203")
    user6 = User(username='cookiemonster', email='cookiemonster@aa.io', password='password',profile_img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydHklMjBtYW5hZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",property_type="Residential", phone_number="5102997615", city="Sacramento", state="CA", zipcode="94203")

    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.commit()

# def seed_users():
#     demo = User(
#         username='Demo', email='demo@aa.io', shop_name="Demo Shop", profile_img = 'https://image.tmdb.org/t/p/w500/72LCF6OLi95odUlqtDi8vAcW3zw.jpg', shop_logo_img = 'https://images-na.ssl-images-amazon.com/images/S/influencer-profile-image-prod/logo/influencer-283de61b_1555460833054._QL80_.png', shop_splash_img = 'https://media.istockphoto.com/id/535786572/photo/grilled-striploin-steak.jpg?b=1&s=612x612&w=0&k=20&c=4MAcTyBrF7XkcltOt9WpTXwM6-uuf7qWUP6-j7srefc=', phone_number = "8765923333", zipcode = '92551', password='password', category='American')
#     wednesdayaddams = User(
#         username='wednesdayaddams', email='wednesdayadams@aa.io',shop_name="Trick or Treat?", profile_img='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/profile+pictures/Jenna_Ortega_Merlina_Addams.webp', shop_logo_img = 'https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/healthy-halloween-snacks-1.jpeg', shop_splash_img ='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/Adams-Family-Snap-Guide-2.jpeg', phone_number = "1800456696",zipcode='92555', password='password',category="Other")
#     homersimpson = User(
#         username='homersimpson', email='homersimpson@aa.io', shop_name='Doh! Donuts', profile_img='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/profile+pictures/Simpsons_SO28_Gallery_11-fb0b632.jpeg', shop_logo_img = 'https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/252637901_436135504594462_5886281448989624379_n.jpeg', shop_splash_img = 'https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/135742229_247761436765204_8875221857717925711_n.jpeg', phone_number = "2159976297",zipcode="92557", password='password', category="Dessert")
#     ricksanchez = User(
#         username='ricksanchez', email='ricksanchez@aa.io', profile_img='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/profile+pictures/ricksanchez.webp', phone_number="5085994721", zipcode='92507', password='password')
#     db.session.add_all([demo,wednesdayaddams,homersimpson,ricksanchez])
#     db.session.commit()
    # id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(40), nullable=False, unique=True)
    # email = db.Column(db.String(255), nullable=False, unique=True)
    # pm_tagline = db.Column(db.String(255))
    # profile_img = db.Column(db.String(255))
    # property_type = db.Column(db.String(255), nullable=False)
    # phone_number = db.Column(db.String(10), unique=True)
    # city = db.Column(db.String(50), nullable=False)
    # state = db.Column(db.String(2), nullable=False)
    # zipcode = db.Column(db.String(5), nullable=False)
    # avg_rating = db.Column(db.Decimal(10,2))
    # hashed_password = db.Column(db.String(255), nullable=False)

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
