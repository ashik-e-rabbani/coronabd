var quiz=document.getElementById("quiz");
var ques= document.getElementById("question");
var opt1=document.getElementById("option1");
var opt2=document.getElementById("option2");
var res=document.getElementById("result");
var nextbutton= document.getElementById("next");
var serverData = "";

var tques=questions.length;
var score=0;
var quesindex=0;
function quit()
{         
	      quiz.style.display='none';
          result.style.display='';
          var f=score;
          result.textContent="SCORE ="+f;
          q.style.display="none";
}
function give_ques(quesindex) 
{
	ques.textContent=questions[quesindex][0];
	opt1.textContent=questions[quesindex][1];
	opt2.textContent=questions[quesindex][2];
	
	 return;// body...
};
give_ques(0);
function nextques()
{
	var selected_ans= document.querySelector('input[type=radio]:checked');
	if(!selected_ans)
		{alert("SELECT AN OPTION");return;}

	if(selected_ans.value==questions[quesindex][4])
		{ 
      score=score+eval(questions[quesindex][3]);}
      serverData = serverData+selected_ans.value;
      
      
	selected_ans.checked=false;
	     quesindex++;
	     if(quesindex==tques-1)
	     	nextbutton.textContent="সাবমিট";
	     var f=score;
	     if(quesindex==tques)
	     {
	     
          quiz.style.display='none';
          result.style.display='';
          // calculation 


        if (f < 100) {
          result.textContent =  "এইমুহূর্তে আপনার করোনা ভাইরাসের ঝুঁকি কম";
          //resultsContainer.style.color = "green";
        }else if((f >= 100) && (f<200))
        {
                result.textContent =  "এইমুহূর্তে আপনার কিছুটা করোনা ভাইরাসের ঝুঁকি রয়েছে। আতংকিত হবেন না।";
               // resultsContainer.style.color = "red";
        }else if((f >= 200) && (f<300)){
           result.textContent =  "আপনার করোনা ভাইরাস বা কোভিড-১৯ এ আক্রান্ত হওয়ার সম্ভাবনা রয়েছে";
           //resultsContainer.style.color = "red";
        }else{
          result.textContent = "আপনার করোনা ভাইরাস বা কোভিড-১৯ এ আক্রান্ত হওয়ারসমূহ সম্ভাবনা রয়েছে  অতিসত্তর মোবাইলে আপনার নিকটবর্তী হাসপাতাল বা ৩৩৩, ১৬২৬৩, ১০৬৫৫ অথবা আইইডিসিআর এর হটলাইন নাম্বারে যোগাযোগ করবেন।";
          //resultsContainer.style.color = "red";
        }

          console.log(serverData);

         $('#reload_page').show();
          
             var storeThis = serverData;
      
      // get user specific location
          var positionInfo = "";
          var ipPositionInfo = "";




// ip loc

 fetch('https://ipapi.co/json/')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
         
          ipPositionInfo = data['latitude']+","+data['longitude']+","+data['city']+","+data['ip'];
           console.log(ipPositionInfo);
        });



          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var positionInfo = position.coords.latitude + ", " +position.coords.longitude;
                 console.log(positionInfo);
                
                saveToServer(storeThis,positionInfo,ipPositionInfo);
            });
        } else {
            alert("Sorry, You are not eligible");
            saveToServer(storeThis,positionInfo,ipPositionInfo);
        }
	     }
        give_ques(quesindex);

}
 function saveToServer(q,r,s){

     
      var postReq = new XMLHttpRequest();
      //var paramData = `show.php?q=${serverData}`;
      var URL = `https://milocr.000webhostapp.com/saveSubmit.php?ans=${q}&userloc=${r}&iploc=${s}`;
      
      postReq.open('GET',URL);

      postReq.send();
    }
  
