fetch('../PageParts/header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header').innerHTML = data);

fetch('../PageParts/footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer').innerHTML = data);