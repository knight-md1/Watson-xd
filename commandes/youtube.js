const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
//var fs =require("fs-extra")

zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "馃捒"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("quelle chanson veux-tu.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       
      let infoMess = {
  image: { url: videos[0].thumbnail },
  caption: `饾晛饾晢饾敿饾晝 饾晞饾敾 饾晝饾敻饾晪饾敿饾晩饾晪 饾晬饾晙饾晩饾晙饾晢鈩�
*Song Name:* ${videos[0].title}

*Uploaded:* ${videos[0].ago}

*Author:* ${videos[0].author.name}

*URL:* ${videos[0].url}

Views: ${videos[0].views}`,
        
  whatsapp: "Join my WhatsApp channel: 'https://whatsapp.com/channel/0029Vade9VgD38CPEnxfYF0M'"
};
     

      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vid茅o
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // 脡crire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Envoi du fichier audio termin茅 !");

     
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'茅criture du fichier audio :', error);
        repondre('Une erreur est survenue lors de l\'茅criture du fichier audio.');
      });
    } else {
      repondre('Aucune vid茅o trouv茅e.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du t茅l茅chargement de la vid茅o :', error);
    
    repondre('Une erreur est survenue lors de la recherche ou du t茅l茅chargement de la vid茅o.');
  }
});



zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "馃捒"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("wich song do you want.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
          image: {url : videos[0]. thumbnail},
         caption : `\n*song name :* _${videos[0].title}_

*Time :* _${videos[0].timestamp}_

*Url :* _${videos[0].url}_


_*on downloading...*_\n\n`
       }

      

      

      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vid茅o
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // 脡crire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Envoi du fichier audio termin茅 !");

     
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'茅criture du fichier audio :', error);
        repondre('Une erreur est survenue lors de l\'茅criture du fichier audio.');
      });
    } else {
      repondre('Aucune vid茅o trouv茅e.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du t茅l茅chargement de la vid茅o :', error);
    
    repondre('Une erreur est survenue lors de la recherche ou du t茅l茅chargement de la vid茅o.');
  }
});

  

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "馃帴"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("donne le nom de la  video");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
  image: { url: Element.thumbnail },
  caption: ` 饾晛饾晢饾敿饾晝 饾晞饾敾 饾晝饾敻饾晪饾敿饾晩饾晪 饾晬饾晙饾晩饾晙饾晢鈩�
*Video Name:* ${Element.title}
*Uploaded:* ${Element.ago}
*Author:* ${Element.author.name}
*URL:* ${Element.url}
*Views:* ${videos[0].views}

*Choose format:*
1. MP3
2. MP4

_*Downloading...*_`
};

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vid茅o 脿 partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
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
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption: "饾暋饾暊饾暔饾晼饾暎饾晼饾晻 饾晸饾暘 饾暃饾暊饾晼饾暆 饾暅饾晵饾暉饾晿'饾暊饾暈饾晵", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'茅criture du fichier vid茅o :', error);
        repondre('Une erreur est survenue lors de l\'茅criture du fichier vid茅o.');
      });
    } else {
      repondre('No video found');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du t茅l茅chargement de la vid茅o :', error);
    repondre('Une erreur est survenue lors de la recherche ou du t茅l茅chargement de la vid茅o.');
  }
});
