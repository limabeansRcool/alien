Webcam.set({
    width:350, height:300, image_format:'png', png_quality:100
});

camera=document.getElementById("camera");

Webcam.attach('#camera');
function capture() {
    
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'"/>';

        });

}

console.log('ml5 version: ', ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mD8YAE42m/model.json', model_loaded);
function check() {
    img=document.getElementById("capture_img");
    classifier.classify(img, gotresult);

}
function model_loaded(){
console.log("e");
}
function gotresult(error, results) {
    if (error){
        console.log(error);
    }else if (results) {
        console.log(results);
        document.getElementById("handgesturename").innerHTML=results[0].label;
        gesture=results[0].label;
        if (results[0].label == "good") {
            document.getElementById("picture").innerHTML="👍";
        } else         if (results[0].label == "fist") {
            document.getElementById("picture").innerHTML="✊";
        }else         if (results[0].label == "peace") {
            document.getElementById("picture").innerHTML="✌";
        }else  if(results[0].label=="stop") { 
        document.getElementById("picture").innerHTML="✋";
        }else {
            document.getElementById("picture").innerHTML="👽";
        }
        speak();
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data=gesture;
    utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);

}