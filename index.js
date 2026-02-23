const express = require("express");
const app = express();
app.use(express.json());

let joueurs = {};

// Route principale
app.get("/", (req, res) => {
    res.send("Bot Famille Kim actif !");
});

// Webhook Messenger (simulation logique RPG)
app.post("/webhook", (req, res) => {
    const message = req.body.message?.text || "";
    const user = req.body.sender?.id || "inconnu";

    if (!joueurs[user]) {
        joueurs[user] = {
            argent: 100,
            territoire: 1,
            rang: "Recrue"
        };
    }

    let reponse = "";

    if (message === "profil") {
        reponse = `
Rang : ${joueurs[user].rang}
Argent : ${joueurs[user].argent}
Territoires : ${joueurs[user].territoire}
        `;
    }

    else if (message === "mission") {
        let gain = Math.floor(Math.random() * 50);
        joueurs[user].argent += gain;
        reponse = `Mission réussie ! Gain : ${gain} $`;
    }

    else if (message === "acheter territoire") {
        if (joueurs[user].argent >= 100) {
            joueurs[user].argent -= 100;
            joueurs[user].territoire += 1;
            reponse = "Nouveau territoire acquis !";
        } else {
            reponse = "Pas assez d'argent.";
        }
    }

    else {
        reponse = "Commandes : profil | mission | acheter territoire";
    }

    console.log(`Réponse pour ${user} : ${reponse}`);
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur démarré sur port " + PORT));
