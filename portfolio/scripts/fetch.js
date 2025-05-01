document.addEventListener('DOMContentLoaded', async function() {
    // Fetch and insert header
    const headerResponse = await fetch('../PageParts/header.html');
    const headerContent = await headerResponse.text();
    document.getElementById('header').innerHTML = headerContent;

    // Fetch and insert footer
    const footerResponse = await fetch('../PageParts/footer.html');
    const footerContent = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerContent;

    // Initialize theme after components are loaded
    initializeTheme();
});