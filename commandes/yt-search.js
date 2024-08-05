const { zokou } = require("../framework/zokou");
const { getytlink, ytdwn } = require("../framework/ytdl-core");
const yts = require("yt-search");
const ytdl = require('ytdl-core');
const fs = require('fs');
  
zokou({ nomCom: "yts", categorie: "Search", reaction: "馃悈" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("what do you want");
    return;
  }

  try {
    const info = await yts(query);
    const resultat = info.videos;

    let captions = "";
for (let i = 0; i < 15; i++) {
  captions += `饾晛饾晢饾敿饾晝 饾晞饾敾 饾晝饾敻饾晪饾敿饾晩饾晪 饾晬饾晙饾晩饾晙饾晢鈩昞n${i + 1}. Title: ${resultat[i].title}\nTime : ${resultat[i].timestamp}\nUrl: ${resultat[i].url}\n`;
}
    captions += "\n======\n饾暋饾暊饾暔饾晼饾暎饾晼饾晻 饾晸饾暘 饾暃饾暊饾晼饾暆 饾暅饾晵饾暉饾晿'饾暊饾暈饾晵";

    // repondre(captions)
    zk.sendMessage(dest, { image: { url: resultat[0].thumbnail }, caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("Erreur lors de la proc茅dure : " + error);
  }
});

zokou({
  nomCom: "ytmp4",
  categorie: "Download",
  reaction: "馃崙"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("insert a youtube link");
    return;
  }

  const topo = arg.join(" ");
  try {
    /* const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*nom de la vid茅o :* _${Element.title}_
*Dur茅e :* _${Element.timestamp}_
*Lien :* _${Element.url}_
_*En cours de t茅l茅chargement...*_\n\n`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });
    */

    // Obtenir les informations de la vid茅o 脿 partir du lien YouTube
    const videoInfo = await ytdl.getInfo(topo);
    // Format vid茅o avec la meilleure qualit茅 disponible
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
    // T茅l茅charger la vid茅o
    const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

    // Nom du fichier local pour sauvegarder la vid茅o
    const filename = 'video.mp4';

    // 脡crire le flux vid茅o dans un fichier local
    const fileStream = fs.createWriteStream(filename);
    videoStream.pipe(fileStream);

    fileStream.on('finish', () => {
      // Envoi du fichier vid茅o en utilisant l'URL du fichier local
      zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "Powered by *Zokou-Md*", gifPlayback: false }, { quoted: ms });

    });

    fileStream.on('error', (error) => {
      console.error('Erreur lors de l\'茅criture du fichier vid茅o :', error);
      repondre('Une erreur est survenue lors de l\'茅criture du fichier vid茅o.');
    });

  } catch (error) {
    console.error('Erreur lors de la recherche ou du t茅l茅chargement de la vid茅o :', error);
    repondre('Une erreur est survenue lors de la recherche ou du t茅l茅chargement de la vid茅o.' + error);
  }
});

zokou({
  nomCom: "ytmp3",
  categorie: "Download",
  reaction: "馃帡锔�"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Insert a youtube link");
    return;
  }

  try {
    let topo = arg.join(" ");

    const audioStream = ytdl(topo, { filter: 'audioonly', quality: 'highestaudio' });

    // Nom du fichier local pour sauvegarder le fichier audio
    const filename = 'audio.mp3';

    // 脡crire le flux audio dans un fichier local
    const fileStream = fs.createWriteStream(filename);
    audioStream.pipe(fileStream);

    fileStream.on('finish', () => {
      // Envoi du fichier audio en utilisant l'URL du fichier local
      zk.sendMessage(origineMessage, { audio: { url: `./${filename}` }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
      console.log("Envoi du fichier audio termin茅 !");
    });

    fileStream.on('error', (error) => {
      console.error('Erreur lors de l\'茅criture du fichier audio :', error);
      repondre('Une erreur est survenue lors de l\'茅criture du fichier audio.');
    });

  } catch (error) {
    console.error('Erreur lors de la recherche ou du t茅l茅chargement de la vid茅o :', error);
    repondre('Une erreur est survenue lors de la recherche ou du t茅l茅chargement de la vid茅o.');
  }
});


zokou({
  nomCom: "mp3",
  categorie: "Download",
  reaction: "馃捒"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Ins茅rez un lien YouTube ou une URL de vid茅o.");
    return;
  }

  try {
    const videoUrl = arg[0];

    const isYoutubeVideo = ytdl.validateURL(videoUrl);

    let audioUrl = '';

    if (isYoutubeVideo) {
      const audioInfo = await ytdl.getInfo(videoUrl);
      const audioFormat = ytdl.chooseFormat(audioInfo.formats, { filter: 'audioonly' });

      if (!audioFormat) {
        repondre("Impossible de trouver un format audio pour cette vid茅o YouTube.");
        return;
      }

      audioUrl = audioFormat.url;
    } else {
      const { stdout } = await youtubedl(videoUrl, {
        extractAudio: true,
        audioFormat: 'mp3',
        noWarnings: true,
        noCallHome: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true
      });

      audioUrl = stdout.trim();
    }

    // Envoi du fichier audio en utilisant l'URL
    zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp3' }, { quoted: ms, ptt: false });
    console.log("Envoi du fichier audio termin茅 !");
  } catch (error) {
    console.error('Erreur lors de la conversion ou du t茅l茅chargement de la vid茅o :', error);
    repondre('Une erreur est survenue lors de la conversion ou du t茅l茅chargement de la vid茅o.');
  }
});
