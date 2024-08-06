"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo", catégorie:"Général", reaction: "✨", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/knight-md1/Watson-xd';
  const img = 'https://telegra.ph/file/b7ae2db82899be94fb9c0.jpg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `*hellow whatsaap user
this is* *Watson-md.*\n get session id *by*, *pairing code*  https://joelsession1-4a8c04ad2935.herokuapp.com/pair/

👉 *REPOSITORY:* ${data.html_url}
👉 *STARS:* ${repoInfo.stars}
👉 *FORKS:* ${repoInfo.forks}
👉 *RELEASE DATE:* ${releaseDate}
👉 *UPDATE ON:* ${repoInfo.lastUpdate}
👉 *OWNER:* *WATSON-XD*
__________________________________
            *Made With WatsonFourpence*`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
