import React from "react";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
// import "./emojiPicker.css";

function EmojiPicker({ addEmoji }) {
  return (
    <>
      <Picker
        set="messenger"
        onSelect={e => addEmoji(e)}
        style={{ position: "fixed", bottom: "100px", left: "35vw" }}
        i18n={{
          search: "Recherche",
          categories: {
            search: "Résultats de recherche",
            recent: "Récents",
            people: "Personnes",
            nature: "Nature et Animaux",
            foods: "Alimentation et Boissons",
            activity: "Activités",
            places: "Lieux et Véhicules",
            objects: "Objets",
            symbols: "Symboles",
            flags: "Drapeaux"
          },
          clear: "Remettre à zéro", // Accessible label on "clear" button
          notfound: "Aucun Emoji trouvé",
          skintext: "Couleur de peau"
        }}
      />
    </>
  );
}

export default EmojiPicker;
