//router
//redux 
  middleware ->thunk
materials - ui
scss


profile edit page
video analysis
  side by side comparisom
  master play button





personal development page




add the link
 link i will save to db.
 1,2,3,4



video info

{
  user_id,
  date,
  frame1,
  src

},
{
  user_id,
  date,
  frame2,
  src

}




video history info

23-11-2021

{
  user_id,
  datetime,
  src

},
{
  user_id,
  datetime,
  src

}


<iframe width="1190" height="669" src="https://www.youtube.com/embed/mMfxI3r_LyA?t=84&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

https://youtu.be/mMfxI3r_LyA?t=84


"u12boys", 
"u14boys", 
"u16boys", 
"u18boys", 
"u12girls", 
"u14girls", 
"u16girls", 
"u18boys"




 




db.getCollection('competency_bundle_metadata').aggregate([
{ 
    "$match":{
        "competency_bundle" : {$in:["Technical","Tactical"]}
    },
},
    {
    "$group": {"competency_bundle":"$competency_bundle"}
    }
        
    
    ])


    db.getCollection('competency_bundle_data').aggregate([
{ 
    "$match":{
        "competency_bundle" : {$in:["Technical","Tactical"]},
        "default_weight":{ $gt: 0},
        "u12boys_weight":{ $gt: 0}
    },
},
    {
    "$group": {_id:{"competency_bundle":"$competency_bundle"},
        "myCount": { "$sum": 1 },
        "values":{"$push":{
            "competency":"$competency",
             "competency_bundle":"$competency_bundle",
"default_weight":"$default_weight",
"u12boys_weight":"$u12boys_weight",   
   "u12girls_weight":"$u12girls_weight",
   "u14boys_weight":"$u14boys_weight","u14girls_weight":"$u14girls_weight","u16boys_weight":"$u16boys_weight",     "u16girls_weight":"$u16girls_weight",     "u18boys_weight":"$u18boys_weight",            
            }}} }
    ])




how much history need to be saved 
history delete

--- all assessment

data will get used in someother page rather than pdp. yes/no

data should be seggrated by itn_level or userlevel 

in one day how many assessment.
should i keep all the assessment data. or top 3 assessment data.

assessment should be renewed when the user stop the assessment in between.




    handling on weight change by admin.


 assessment_date: 
 "competency_bundle": "Tactical",
        "load_date": "2021-12-20",
        "itn_level": "u12boys",

   "competency": "Use of Weapons",
                "assigned_weight": 0,
                "u12boys_weight": 10//sorting number



<!-- 
Player - Parent           - Coach


Parent can see only his kids information.
Parent login will redirect to kids profile.
Players can select a coach.

Player can himself change a coach and admin.
Coach cannot select new kids. -->


on assessment page we need coach information

without coach assessment?




admin




1.>
Remove user_comp_list. -> direct competancy bundle data. ->itn_level

2.>
user assessment history unlimited

3.>
one collection. - no performance

4.>
assessment data will get used in someother page rather than pdp. yes/no - mightbe

5.>
assessment should be renewed when the user stop the assessment in between. -> no need to save data.



"email":""
"competency_bundle": "Mental-Emotional",
        "load_date": "2021-12-20",  X
        "itn_level": "u12boys",

        values;[
        [
          {
            placement,
            assessment_date,
            "assigned_weight": 0,
             "u12boys_sort_weight": 10 - sorting
          },{

             placement,
            assessment_date,
            "assigned_weight": 0,
             "u12boys_sort_weight": 10 - sorting
          }
        ],


        ]


Finalize// json data strcture
{
    "email":"fdsf@sdfdsf.com",
    "itn_level": "u12boys",



    "competency_bundles": [
      {
        "competency_bundles": "Mental-Emotional",
        "competences": [
            {
                "competences": "placement",
                "sort_position": 10,
                "weights": [
                    {
                        "assigned_weight": 8,
                        "assemnetDate": "10/10/2021"
                    },
                    {
                        "assigned_weight": 9,
                        "assemnetDate": "09/10/2021"
                    }
                ]
            }
        ] 
    }]
}


<!-- 
landing page -a api call  -->

asessment      playerdeployment



db.getCollection('users_competancy_list').find({})
db.getCollection('users_competancy_list').aggregate([
{
        "$match":{
            "email" : "degeadavid2@gmail.com",
            "current_level" : "u12boys",
            
            }
        },
   {         
        "$group":{
                "_id":{
                    "competency_bundle":"$competency_bundle",
                    "assessment_date":"$assessment_date"
                    },
                    "data":{"$push":{
                            "competency_bundle":"$competency_bundle",
                          "assessment_date":"$assessment_date",
                        "values":"$values"
                        }}
                    
        }
},{
    
    ""
    
}

])


db.getCollection('users_competancy_list').aggregate(
[
{
        "$match":{
            "email" : "degeadavid2@gmail.com",
            "current_level" : "u12boys"
            
            }
},
{         
        "$unwind":"$values"
},{
         "$group":{
             "_id":{
                 "competency_bundle" : "$competency_bundle",
                 "current_level" : "$current_level",
                 "values":"$values",
                 "assessment_date":"$assessment_date"
                 }
                 
             }
},
{
    "$project":{
        "_id":0,
            "competency_bundle":"$_id.competency_bundle",
        "current_level" : "$_id.current_level",
                         "values":"$_id.values",
        "assessment_date":"$assessment_date"
                
        }
    
    },
    
    {
        "$group":{
                "_id":{
                    "competency_bundle":"$competency_bundle"
                    },
                "info":{"$push":{
                    "values":"$values",
                    "assessment_date":"$assessment_date"
                    
                    }}
            
        }
    },{    
    
        
        "$project":{
            "_id":0,
            "competency_bundle":"$_id.competency_bundle",
            "info":"$info"
            
        }
    }

])


sas1234frj

sending emails

user is a member tennis ims
or he is new user


coach can add a player




player who has an account 


coach -> login

add player scrren where he need to add email address of player


2 login for player - parent and player


      parent
        |
player1  player2




1.> coach Id in player registration page.
2.> parent login he sees the list of children -> redirect to children on click
3.> add child button


coach can add the player with email
add player 
  email address


      "_id" : ObjectId("61d5d8e849baa93d01f5cd5c"),
    "first_name" : "ashish",
    "last_name" : "sharma",
    "email" : "ashish@gmail.com",
    "password" : "$2b$10$yxh2MlA49Orp/D4yTvmFOefACWj/3g/BdU5LzNLSxvHOwSd/tYluu",
    "role" : "player",
    "user_name" : "ashish@gmail.com",
    "current_level" : "u12boys",
    "temp_password" : "12345",
    "__v" : 0





child1 -> redirect to child one home page.

---------------------children---------------------------
"first_name" : "Ashish",
"last_name" : "Sharma",
"email" : "ashishhsharma1990@gmail.com",
"password" : "India",
"role" : "player",
parents_email:["",""] || "";
coach_email: "",
current_level


-----------------parent---========

"first_name" : "Ashish",
"last_name" : "Sharma",
"email" : "ashishhsharma1990@gmail.com",
"role" : "parent",
"children_email":[]

-----------------------------


"first_name" : "Ashish",
"last_name" : "Sharma",
"email" : "ashishhsharma1990@gmail.com",
"role" : "coach",
"players_email":[]


no current_level on jwt token-----

Asdfkgr456Edlflg,
<!-- dsadsfsfsdfdfs,
sfsdfsdfsdfsdf, -->

role jwt token

<!-- parentemail: -->
jwt token
children_email,
role,

//email,role
role in localstorage


    "email" : "degeadavid2@gmail.com",
    "assessment_date" : "2021-12-29T18:02:46.113Z",
    "current_level" : "u12boys",
    "competency_bundle" : "Tactical",
    " _email:"",
    "role":"",
    "coach_email":""


    email == children_email && role =="player"
    email == player_email  && role == "parent"
    email == player_email  && role == "coach"



parent assessment


http://localhost:3000/user/parent/assessments


player_email,
parent_email,


put:
get:

query: 
tennismgmt/link/?parent_email = "" || coach_email = ""&
for in 
body
{
    player_email
}


parent -> p@gmail.com
child > degeadavid@gmail.com
role -> parent
itn_level -> u12boys


for get and put in every api request api will get child_email and itn_level in query parms.
post -> itn_level will be available in payload.


submit data for parent and coach assessment

------------------------------------------------------
BLue color for coach. #rgb(60 150 243 / 90%)
grey for parent.

little circle with ryg according to score. done
no percent col scores.
date format should mm/dd/yy, player(score).
score should be numbers 1-10 not %.
add transparency..
get rid of date below the circles.
add two icons for coach and parent next to the word.
pop up for more dates.
move the value of coach assessment to upper left. 
if overlapping coach and parent keep coach on top.


--------------------------------------------------

enable multi selection for the player dates. checkboxes instead of readio butn.
show only dates available in parent and coach that are similar to players date selection.
hide scores to show scores. default do not show scores.



-------------------------------------------------------------------------------








