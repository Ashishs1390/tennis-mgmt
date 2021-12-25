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

data should be seggrated by itn_level or userlevel


