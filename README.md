# Managed

Introduction:
A full stack application that helps users find Property Managers, with a focus on two main full features,
Property Manager Profiles and Reviews, as well as two partial features Chat and Payments (WIP).

Technologies Used:
Backend: Flask, Python, SQLAlchemy
Frontend: ReactJS, Redux, NodeJS


[Managed]([https://managed.onrender.com/] to App.

### Home Page:


Code Snippets:

I enjoyed bringing together conceptual learnings of the React store, thunk and database retrievals to write the following code in the backend to retrieve all users who are Property Managers, which really brought the website to life.

@user_routes.route('')

def users():

    users = User.query.filter(User.is_pm == True).all()

    res = dict()
    for user in users:
        current_user = user.to_dict()
        res[current_user['id']] = current_user
    return res

<img width="1215" alt="image" src="https://user-images.githubusercontent.com/1787106/218231239-d50ea54a-d326-43db-ab8a-9017600ebbaf.png">

## Wiki:
Please visit the Wiki for more information related to the database schema, API routes and frontend:
[Wiki]([https://managed.onrender.com/](https://github.com/meghasahgal/property_managed/wiki)].
