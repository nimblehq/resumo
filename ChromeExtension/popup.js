document.querySelector('#postResume')
  .addEventListener('click', () => {
    let candidateUrl = document.getElementById('candidateUrl').value;
    chrome.runtime.sendMessage({ action: 'postResume', candidateUrl: candidateUrl });
  });