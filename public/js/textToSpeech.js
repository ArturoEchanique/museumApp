


// Initialize new SpeechSynthesisUtterance object

let speech = new SpeechSynthesisUtterance();

// Set Speech Language
speech.lang = "en";

// window.speechSynthesis.speak("hello my name is dog");

let voices = []; // global array of available voices

window.speechSynthesis.onvoiceschanged = () => {
    // Get List of Voices
    voices = window.speechSynthesis.getVoices();

    // Initially set the First Voice in the Array.
    speech.voice = voices[49];

    // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
    let voiceSelect = document.querySelector("#voices");
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

/// TESTING 
speech.text = document.querySelector("#presentationText").innerHTML
// speech.voice = "en-US";

// window.speechSynthesis.speak(speech);

/// TESTING

// document.querySelector("#rate").addEventListener("input", () => {
//     // Get rate Value from the input
//     const rate = document.querySelector("#rate").value;

//     // Set rate property of the SpeechSynthesisUtterance instance
//     speech.rate = rate;

//     // Update the rate label
//     document.querySelector("#rate-label").innerHTML = rate;
// });


// document.querySelector("#volume").addEventListener("input", () => {
//     // Get volume Value from the input
//     const volume = document.querySelector("#volume").value;

//     // Set volume property of the SpeechSynthesisUtterance instance
//     speech.volume = volume;

//     // Update the volume label
//     document.querySelector("#volume-label").innerHTML = volume;
// });
// document.querySelector("#pitch").addEventListener("input", () => {
//     // Get pitch Value from the input
//     const pitch = document.querySelector("#pitch").value;

//     // Set pitch property of the SpeechSynthesisUtterance instance
//     speech.pitch = pitch;

//     // Update the pitch label
//     document.querySelector("#pitch-label").innerHTML = pitch;
// });



// document.querySelector("#voices").addEventListener("change", () => {
//     speech.voice = voices[document.querySelector("#voices").value];
//     console.log("la voz es...", speech.voice)
// });

document.querySelector("#start").addEventListener("click", () => {
    // Set the text property with the value of the textarea
    // speech.text = document.querySelector("textarea").value;

    // Start Speaking
    // if (SpeechSynthesis.speaking) window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)
    
});



// document.querySelector("#pause").addEventListener("click", () => {
//     // Pause the speechSynthesis instance
//     window.speechSynthesis.pause();
// });

// document.querySelector("#resume").addEventListener("click", () => {
//     // Resume the paused speechSynthesis instance
//     window.speechSynthesis.resume();
// });

document.querySelector("#cancel").addEventListener("click", () => {
    // Cancel the speechSynthesis instance
    window.speechSynthesis.cancel();
});