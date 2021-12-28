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




                Player - Parent - Coach


Parent can see only his kids information.
Parent login will redirect to kids profile.
Players can select a coach.

Player can himself change a coach and admin.
Coach cannot select new kids.
