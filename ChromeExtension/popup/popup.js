document.querySelector('#postResume')
  .addEventListener('click', (view) => {
    document.getElementById("postResume").disabled = true;
    document.querySelector('div.loader').style.display = "block";

    let candidateUrl = document.getElementById('candidateUrl').value;
    chrome.runtime.sendMessage({ action: 'postResume', candidateUrl: candidateUrl });
  });

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showGrade') {
    document.getElementById("postResume").disabled = false;
    document.querySelector('div.loader').style.display = "none";
    
    document.getElementById('grade').innerHTML = 'Grade: ' + message.grade
    console.log(message.grade)
  }
});