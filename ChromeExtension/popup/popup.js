document.querySelector('#postResume')
  .addEventListener('click', () => {
    let candidateUrl = document.getElementById('candidateUrl').value;
    chrome.runtime.sendMessage({ action: 'postResume', candidateUrl: candidateUrl });
  });

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showGrade') {
    document.getElementById('grade').innerHTML = 'Grade: ' + message.grade
    console.log(message.grade)
  }
});