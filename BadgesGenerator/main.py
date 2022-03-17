from operator import mod
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
import cv2


# Make sure to download private key & update this
cred = credentials.Certificate("cstc-2a071-firebase-adminsdk-p1uh4-48a1078766.json")
app = firebase_admin.initialize_app(cred)
fsClient = firestore.client(app)

usersDoc = fsClient.collection("users")

model = cv2.imread('model.jpg') # Todo: Replace test model

users = auth.list_users(app=app)
while users:
    for user in users.users:
        userDoc = usersDoc.document(user.uid)
        userData = userDoc.get().to_dict()
        
        if userData['paidFee'] == False:
            continue

        if userData['name'] is None or userData['name'] == '':
            print('[!] User ID: {0} have no display name!'.format(user.uid))
            continue

        print('[*] Created image for {0} (ID: {1})'.format(user.email, user.uid))
        
        img = model.copy()

        # Todo: Update this
        cv2.putText(img, user.display_name, (0, 100), cv2.FONT_ITALIC, 2, (0,0,0), 5)
        cv2.putText(img, "Participant", (0, 200), cv2.FONT_ITALIC, 2, (0,0,0), 5)

        cv2.imwrite('badges/{0}.jpg'.format(user.uid), img)
    
    users = users.get_next_page()

