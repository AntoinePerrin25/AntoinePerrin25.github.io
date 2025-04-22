const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const showdown = require('showdown');

const CONFIG_PATH = path.join(__dirname, '../../config/projects.config.json');

async function updateProjects() {
    try {
        // Read configuration
        const config = JSON.parse(await fs.readFile(CONFIG_PATH, 'utf8'));
        
        for (const project of config.projects) {
            console.log(`Processing project: ${project.name}`);
            
            // Fetch README from GitHub
            const readmeUrl = `https://raw.githubusercontent.com/${project.github.owner}/${project.github.repo}/${project.github.branch}/${project.github.readme_path}`;
            console.log(`Fetching README from: ${readmeUrl}`);
            
            const response = await fetch(readmeUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch README: ${response.statusText}`);
            }
            
            const markdown = await response.text();

            // Save markdown file
            const markdownPath = path.join(__dirname, '../../', config.settings.markdown_path, `${project.id}.md`);
            await fs.writeFile(markdownPath, markdown);
            console.log(`Saved markdown to: ${markdownPath}`);

            // Convert to HTML and create project page
            const converter = new showdown.Converter();
            const html = converter.makeHtml(markdown);

            const projectPage = await generateProjectPage(project, html);
            const projectPath = path.join(__dirname, '../../', config.settings.projects_path, `${project.id}.html`);
            await fs.writeFile(projectPath, projectPage);
            console.log(`Generated project page: ${projectPath}`);
        }

        // Update index page
        await updateIndexPage(config);
        console.log('Successfully updated all projects');

    } catch (error) {
        console.error('Error updating projects:', error);
        process.exit(1);
    }
}

function generateProjectPage(project, content) {
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Antoine Perrin - Portfolio - ${project.name}</title>
    <link href="../styles/output.css" rel="stylesheet">
</head>
<body class="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
    <div id="header"></div>
    <main class="flex-grow flex justify-center items-center p-4">
        <div class="w-[60%] prose dark:prose-invert bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            ${content}
        </div>
    </main>
    <div id="footer" class="mt-auto"></div>
    <script>
        fetch('../PageParts/header.html')
            .then(response => response.text())
            .then(data => document.getElementById('header').innerHTML = data);

        fetch('../PageParts/footer.html')
            .then(response => response.text())
            .then(data => document.getElementById('footer').innerHTML = data);
    </script>
</body>
</html>`;
}

updateProjects();