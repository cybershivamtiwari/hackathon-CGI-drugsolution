const express = require('express');
const datafile = require('./Data');
const ejs = require('ejs');

const path = require('path');
const publicPath = path.join(__dirname,'public');

const app = express();
app.use(express.static(publicPath));
app.set('view engine', 'ejs');

//var dr=document.getElementById("med");

app.get('/myform', function(req, res){  
    var myDrugName = req.query.mytext;
    var isValid ='';
    var listtoadda ='';
    var listtoadds='';
    var listAlternatives = [];
    var listSideAffects = [];
    const isContains = !!datafile.getRArray().find(drug => {  
        return drug === myDrugName.toLowerCase();
      })
    
      if(!isContains) {
          isValid = `<h2 style="color:#18bf15;">Allowed</h2></body>`;
      }
      else{
          isValid =  `<h2 style="color:Red;"> Not Allowed</h2></body>`;
          dname = myDrugName.toLowerCase()
          if(dname === "adderall" || dname === "nimesulide" || dname === "mucovib"){
          var la = datafile.getMa();
          var ls= datafile.getMsa();
          listSideAffects = ls[dname];
          listAlternatives = la[dname];
          //console.log(la);
          listtoadda = `<ul><li>`+listAlternatives[0]+`</li><li>`+listAlternatives[1]+`</li><li>`+listAlternatives[2]+`</li></ul>`;
          listtoadds = `<ul><li>`+listSideAffects[0]+`</li><li>`+listSideAffects[1]+`</li><li>`+listSideAffects[2]+`</li></ul>`;
          }
        }
    // document.getElementById("medicine").innerHTML = "The name of medicine or drug is "+ myDrugName+" and it is "+isValid;
    // res.sendFile('public/index.html' , { root : __dirname });
    // dr=myDrugName;
    // dr.innerHTML
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
           .imgg{
            width:115%;
            height: 95vh;
           }
           .roll{
            width:150%;
            height:70vh;
            padding-left: 70px;
           }
           .result{
            position: relative;
      text-align: center;
      color: black;
           
           }
           .images{
            display: flex;
           }
           .texts{
            position: absolute;
      top: 145px;
      right: -100px;
           }
           .alter{
            position: absolute;
            bottom:0px;
            right:50px;
           }
           .alterr{
            position: absolute;
            bottom:0px;
            right:-210px;
           }
            
        </style>
    </head>
    <body>
        <div class="images">
       <div class="img">
        <img class="imgg" src="doc.jpg" alt="dbgdfvdcz">
    </div>
    <div class="result">
        <img class="roll" src="pen.jpg" alt="paper">
    
    <div class="col-lg-6 col-sm-12 texts" id="result" >
        <p>The Given Medicine or Drug Name is
        </p><h2 style="color:#945ee0">`+myDrugName+`
       
        </h2><p>And it is</p>`+isValid+`
      </div>
      <div class="alter"><h2>Alternate Medicine</h2>
      <P><h3>`+listtoadda+`</h3></p></div>
      <div class="alterr"><h2>Side Effect</h2>
      <P><h3>`+listtoadds+`</h3></p></div>

    </div>
    </div>
    <div class="text">
       <p class="first" ><h2>Medications can have serious side effects when they are not taken properly or when they are combined with other over-the-counter drugs, prescription drugs, supplements, or natural remedies. Here are some simple "dos & donts" to help minimize negative consequences.</h2></p>
    
    <p><h3> Prescription Medication Dos</h3></p>
    <ul>
        <li>
    DO follow the exact dose and schedule prescribed by your doctor.
    </li>
    <li>
    DO ask your doctor about any possible side effects to watch for, and report any that you experience.</li>
    <li>
    DO ask your doctor about any and all over-the-counter drugs, prescription drugs, supplements, or natural remedies that you are taking or want to take.</li>
    <li>
    DO talk with your doctor about over-the-counter drugs, prescription drugs, supplements, or natural remedies if you are pregnant, planning to become pregnant, or breastfeeding. Some medications or supplements may not be safe during these times.</li>
    <li>
    DO ask your doctor or pharmacist how to take your medicine properly (ie, with or without food?, with or without milk?, with extra water?).</li>
    <li>
    DO tell your doctor about past problems you've had with drugs, such as rashes, indigestion, dizziness, or appetite loss.</li>
    <li>
    DO keep a daily record of the drugs you are taking.</li>
    <li>
    DO review your drug record with each of your doctors at each visit, and when any doctor prescribes a new medicine.</li>
    <li>
    DO ask your pharmacist for large print if you cannot read the label.</li>
    <li>
    DO check the expiration date and throw out any expired medications.</li>
    <li>
    DO call your doctor right away if you have any problems with your medicine.</li>
    <li>
    DO plan ahead for refills so that you don't run out.</li>
    </ul>
    <p>
    <h3>Prescription Medication Don'ts</h3></p>
    <ul><li>
    DO NOT stop taking a prescription drug unless your doctor says it is okay.</li>
    <li>
    DO NOT take more or less than the amount prescribed.</li>
    <li>
    DO NOT mix alcohol and medicine unless your doctor specifically says it's okay.</li>
    <li>
    DO NOT take medications prescribed for someone else.</li>
    <li>
    DO NOT let anyone else take medications prescribed for you.</li>
    <li>
    DO NOT crush tablets unless you check with your doctor or pharmacist. Some medications (eg, long-acting formulations) have special coating and cannot be crushed</li>
    </ul>
    </div>
            
    </body>
    </html>`) 
});
app.listen(2424);