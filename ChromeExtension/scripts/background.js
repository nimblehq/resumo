chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'postResume') {
    let candidateUrl = message.candidateUrl;
    if (candidateUrl.length !== 0) {
      fetchGrade(getCandidateUrlInJson(candidateUrl));
    }
  }
});

function fetchGrade(body) {
  fetch('https://resumo-web.herokuapp.com/candidates', {
    method: 'POST',
    body: body,
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(json => {
      chrome.runtime.sendMessage({ action: 'showGrade', grade: json.grade });
    });
}

function getCandidateUrlInJson(candidateUrl) {
  return JSON.stringify({
    "candidate": {
      "resume_url": candidateUrl
    }
  });
}