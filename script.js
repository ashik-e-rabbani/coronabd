var allAnserwers =0;
var serverData = "";
(function() {
    const myQuestions = [
      {
        question: "আপনার কি এখন জ্বর আছে বা আপনি কি  জ্বরজ্বর অনুভব করছেন?",
        answers: {
          2: "হ্যাঁ ",
          0: "না"          
        },
        correctAnswer: 0
      },
      
      {
        question: "জ্বরের সাথে কি কাশি বা গলা ব্যথা অথবা দুটোই অনুভব করছেন? ",
        answers: {
          5: "হ্যাঁ ",
          0: "না"          
        },
        correctAnswer: 0
      },
      {
        question: " আপনার কি অন্য কোন অসুখে  ভুগছেন (যেমন : ডায়াবেটিস, এজমা বা হাঁপানি , দীর্ঘমেয়াদি শ্বাসকষ্টের রোগ বা সিওপিডি, কিডনি রোগ, ক্যান্সার)?",
        answers: {
          25: "হ্যাঁ ",
          0: "না"          
        },
        correctAnswer: 0
      },
      {
      question: "আপনার কি শ্বাস নিতে বা ছাড়তে কষ্ট হচ্ছে?",
        answers: {
          100: "হ্যাঁ ",
          0: "না"          
        },
        correctAnswer: 0
      },
      {
      question: "বিগত ১৪-২১ দিনের মধ্যে আপনি কি  বিদেশ ভ্রমণ করেছেন ?",
        answers: {
          100: "হ্যাঁ ",
          0: "না"          
        },
        correctAnswer: 0
      },
      {

      question: "আপনি কি বিগত ১৪ দিনের ভিতরে করোনা ভাইরাসে ( কোবিড-১৯) আক্রান্ত এরকম কোন ব্যক্তির সংস্পর্শে এসেছিলেন ( একই স্থানে অবস্থান বা ভ্রমন )",
        answers: {
          100: "হ্যাঁ ",
          0: "না"          
        },
        correctAnswer: 0
      
      }
    ];
  
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
               
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
         // answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
         // answerContainers[questionNumber].style.color = "red";
        }

        $("#quiz").hide();
        $("#operational_buttons").hide();
        allAnserwers = eval(allAnserwers)+eval(userAnswer);
        serverData = serverData+"D"+userAnswer;

      });
  
      // show number of correct answers out of total
     // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        var safetyVal = Math.round((numCorrect/myQuestions.length)*100);

        if (allAnserwers < 100) {
          resultsContainer.innerHTML =  "এইমুহূর্তে আপনার করোনা ভাইরাসের ঝুঁকি কম";
          resultsContainer.style.color = "green";
        }else if((allAnserwers >= 100) && (allAnserwers<200))
        {
                resultsContainer.innerHTML =  "এইমুহূর্তে আপনার কিছুটা করোনা ভাইরাসের ঝুঁকি রয়েছে। আতংকিত হবেন না।";
                resultsContainer.style.color = "red";
        }else if((allAnserwers >= 200) && (allAnserwers<300)){
           resultsContainer.innerHTML =  "আপনার করোনা ভাইরাস বা কোভিড-১৯ এ আক্রান্ত হওয়ার সম্ভাবনা রয়েছে";
           resultsContainer.style.color = "red";
        }else{
          resultsContainer.innerHTML = "আপনার করোনা ভাইরাস বা কোভিড-১৯ এ আক্রান্ত হওয়ারসমূহ সম্ভাবনা রয়েছে <br> অতিসত্তর মোবাইলে আপনার নিকটবর্তী হাসপাতাল বা ৩৩৩, ১৬২৬৩, ১০৬৫৫ অথবা আইইডিসিআর এর হটলাইন নাম্বারে যোগাযোগ করবেন।";
          resultsContainer.style.color = "red";
        }
  
        $('#reload_page').show();


      console.log(serverData);
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



    function saveToServer(q,r,s){

     
      var postReq = new XMLHttpRequest();
      //var paramData = `show.php?q=${serverData}`;
      var URL = `https://milocr.000webhostapp.com/saveSubmit.php?ans=${q}&userloc=${r}&iploc=${s}`;
      
      postReq.open('GET',URL);

      postReq.send();
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

  })();
  
