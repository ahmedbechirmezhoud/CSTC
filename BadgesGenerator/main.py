import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
import os
import qrcode
from PIL import ImageFont, Image, ImageDraw


# Make sure to download private key & update this
cred = credentials.Certificate("cstc-2a071-firebase-adminsdk-p1uh4-2028e37e9a.json")
app = firebase_admin.initialize_app(cred)
fsClient = firestore.client(app)

usersDoc = fsClient.collection("users")

model = Image.open("Badge.jpg")
modelBack = Image.open('Badge Back.jpg')

W, H = model.size
roleFont = ImageFont.truetype(font='Mark Simonson - Proxima Nova ScOsf Black.otf', size=110)

users = auth.list_users(app=app)
c = 0

longest = ["", ""]
shortest = ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", ""]

while users:
    for user in users.users:
        userDoc = usersDoc.document(user.uid)
        userData = userDoc.get().to_dict()
        
        if 'paidFee' not in userData or userData['paidFee'] == False:
            continue
        
        if 'name' not in userData:
            print('[!] User ID: {0} have no display name!'.format(user.uid))
            print(userData)
            continue

        if userData['name'] is None or userData['name'] == '':
            print('[!] User ID: {0} have no display name!'.format(user.uid))
            print(userData)
            continue
        
        if len(userData['name']) > len(longest[0]):
            longest[0] = userData['name']
            longest[1] = user.uid
            print('Longer! {0} (ID: {1}'.format(longest[0], longest[1]))
        
        if len(userData['name']) < len(shortest[0]):
            shortest[0] = userData['name']
            shortest[1] = user.uid
            print('shortest! {0} (ID: {1}'.format(shortest[0], shortest[1]))
            
        PATH = './badges/'+user.uid
        size = 125
        if len(userData['name']) >= 22:
            size = 100
        
        if len(userData['name']) == 26:
            size = 95
        
        nameFont = ImageFont.truetype(font='FontsFree-Net-Proxima-Nova-Bold.otf', size=size)
        
        os.mkdir(PATH)

        print('[*] Created image for {0} (ID: {1})'.format(user.email, user.uid))
        
        img = model.copy()
        draw = ImageDraw.Draw(img)

        draw.text((W/2, 1300),userData['name'].title(),(255,255,255), font=nameFont, anchor="mm")
        draw.text((W/2, 1480),"Participant",(255,255,255),font=roleFont, anchor="mm")

        img.save(PATH+'/front.jpg')
        
        back = qrcode.make(user.uid)
        w, h = back.size
        
        back = back.crop((25, 25, w-25, w-25)).resize((1018, 1018), Image.NEAREST)
        
        backimg = modelBack.copy()
        backimg.paste(back, (243,679))
        backimg.save(PATH+'/back.jpg')
        
        c += 1
    
    users = users.get_next_page()

print("="*50)
print(f'[*] Wrote {c} images')
print('Shortest name: {0}(ID: {1})'.format(shortest[0], shortest[1]))
print('Longest name: {0}(ID: {1})'.format(longest[0], longest[1]))




