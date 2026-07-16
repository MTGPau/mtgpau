Je te propose une checklist organisée par priorité. L'idée est de commencer par les actions qui auront le plus d'impact avec le moins d'effort, puis de construire progressivement une vraie marque autour de l'association.

✅ Priorité 1 (à faire dans les 2 prochaines semaines)
Identité
☐ Définir une charte graphique (couleurs, polices, logo, modèles de visuels).
☐ Attribuer une couleur à chaque format :
🟢 Pauper
🔴 Modern
🔵 Draft
🟣 Duel Commander
Calendrier
☐ Établir le calendrier des événements sur 2 à 3 mois.
☐ Publier un calendrier mensuel unique sur Facebook, Instagram, Discord et le site.
☐ Épingler le calendrier sur Facebook et Discord.
Google
☐ Créer ou optimiser la fiche Google Business Profile.
☐ Ajouter des photos de la salle, des joueurs et des événements.
☐ Renseigner les horaires, le lieu et le site web.
☐ Demander aux membres de laisser un avis Google.
Site web
☐ Ajouter une page "Jouer à Magic à Pau".
☐ Créer une page dédiée pour chacun des quatre formats.
☐ Ajouter un calendrier des prochains événements.
☐ Vérifier que Google peut indexer le site (Google Search Console).
✅ Priorité 2 (à mettre en place chaque semaine)
Communication

Pour chaque événement :

☐ J-7 : annonce.
☐ J-3 : rappel + présentation du format.
☐ Jour J : stories + photos.
☐ J+1 : résultats + album photo + annonce du prochain événement.
Instagram
☐ 2 à 3 publications par semaine.
☐ Au moins 1 Reel par semaine (ambiance, ouverture de boosters, deck tech, plus beau play...).
Facebook
☐ Créer un événement Facebook pour chaque tournoi.
☐ Inviter tous les membres.
☐ Publier les résultats et les photos.
Discord
☐ Annoncer les événements.
☐ Publier les résultats.
☐ Encourager les discussions autour des decks.
✅ Priorité 3 (SEO)

Créer des pages ciblées sur des recherches locales :

☐ Magic The Gathering Pau
☐ Jouer à Magic à Pau
☐ Pauper Pau
☐ Modern Pau
☐ Duel Commander Pau
☐ Draft Pau

Puis publier régulièrement des articles :

☐ Où jouer à Magic à Pau ?
☐ Découvrir le Pauper.
☐ Pourquoi jouer en Modern ?
☐ Comment fonctionne un Draft ?

Objectif : 2 articles par mois.

✅ Priorité 4 (faire vivre la communauté)

Chaque semaine :

☐ Mettre en avant un joueur.
☐ Présenter un deck.
☐ Montrer une belle action de jeu.
☐ Poster une photo de l'ambiance.
☐ Faire un petit récapitulatif du tournoi.

L'objectif est que les réseaux montrent une communauté active, pas seulement une succession d'annonces.

✅ Priorité 5 (développer la communauté)
☐ Contacter les boutiques locales.
☐ Contacter les bars à jeux.
☐ Contacter l'Université de Pau et les BDE.
☐ Participer à des salons ou événements locaux.
☐ Distribuer des affiches avec un QR Code vers Discord.
✅ Priorité 6 (fidélisation)

Créer un classement annuel pour :

☐ Pauper
☐ Modern
☐ Duel Commander

Avec :

☐ Classement en ligne.
☐ Récompense de fin de saison.
☐ Publication régulière des classements.

Les Drafts peuvent rester des événements ponctuels sans classement, car leur intérêt est davantage l'expérience que la compétition.

✅ Indicateurs à suivre chaque mois
☐ Nombre de participants par format.
☐ Nombre de nouveaux joueurs.
☐ Nombre de joueurs revenant une deuxième fois.
☐ Nombre de membres Discord.
☐ Nombre d'abonnés Instagram.
☐ Nombre d'abonnés Facebook.
☐ Nombre d'avis Google.
☐ Nombre de visites sur le site.
☐ Position du site sur Google pour "Magic Pau", "Pauper Pau", etc.
🎯 Les 5 actions les plus rentables

Si vous ne deviez faire que cinq choses, je choisirais celles-ci :

Refondre le site pour qu'il soit enfin référencé sur Google (c'est le principal levier de découverte à long terme).
Publier un calendrier mensuel fixe de tous les événements, partagé sur tous vos canaux.
Créer systématiquement un événement Facebook pour chaque tournoi, avec des rappels et des photos après l'événement.
Montrer la communauté : photos, vidéos, decks, portraits de joueurs, ambiance. Les gens rejoignent un groupe avant de rejoindre un tournoi.
Développer des partenariats locaux (boutiques, université, bars à jeux, autres associations), car c'est souvent le moyen le plus efficace d'atteindre de nouveaux joueurs.

En appliquant ces cinq points avec régularité pendant 6 à 12 mois, vous aurez construit une présence locale solide. Les réseaux sociaux créeront l'envie de venir, les partenariats amèneront les premiers visiteurs, et le référencement Google assurera une arrivée continue de nouveaux joueurs qui recherchent simplement où jouer à Magic à Pau.

On a déjà une charte graphique, le but est d'automatiser le plus possible pour éviter d'avoir à le faire à la main à chaque fois : https://mtgpau.github.io/mtgpau/

L'automatisation est probablement le meilleur investissement pour une association. Si vous êtes peu nombreux à gérer la communication, le problème n'est pas de savoir quoi publier, mais de pouvoir le faire sans que cela prenne 2 heures par événement.

J'ai regardé l'URL. Je ne peux pas naviguer en direct, mais comme c'est un site GitHub Pages, ça me donne déjà une idée du type d'infrastructure que vous utilisez. Vous avez un avantage : un site statique est très facile à automatiser.

Je viserais une chaîne de communication comme celle-ci
Calendrier (source unique)
          │
          ▼
GitHub
          │
          ├──► Site web
          ├──► Flux RSS (optionnel)
          ├──► ICS (agenda)
          ├──► JSON des événements
          └──► GitHub Actions
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
 Facebook      Instagram      Discord

L'idée est de ne plus saisir les informations quatre fois.

Une seule source de vérité

Par exemple un fichier :

events.yml
- date: 2026-09-04
  format: Pauper
  title: Pauper Hebdo
  paf: 5€
  rounds: 4
  inscription: 19h30

Ou même :

events.json

Le site lit ce fichier.

Une GitHub Action le lit aussi.

Tout le reste est généré automatiquement.

Générer automatiquement les visuels

Vous avez déjà une charte.

Parfait.

À partir du JSON, on peut générer automatiquement :

Modern_2026-09-04.png

Pauper_2026-09-11.png

Draft_2026-09-18.png

Toujours avec

le bon logo
les bonnes couleurs
la bonne date
le bon format

Sans Photoshop.

Sans Canva.

Sans Figma.

Il existe plusieurs solutions :

Node.js + Sharp
ImageMagick
Puppeteer
Canva API (si besoin)
Générer les posts

À partir du même JSON.

Exemple.

🎴 Pauper Hebdo

📅 Mardi 14 septembre

🕖 Début 20h

📍 Pau

💰 5€

Inscription :
https://...

Le texte est généré.

Discord

Très simple.

Une GitHub Action envoie automatiquement :

Nouveau tournoi !

Pauper

Mardi 14 septembre

Lien d'inscription

via un Webhook.

Facebook

C'est plus compliqué.

Meta limite énormément l'automatisation.

Mais on peut :

générer le texte
générer l'image
ouvrir directement le brouillon

Il ne reste qu'à cliquer sur "Publier".

On gagne déjà 90 % du temps.

Instagram

Même principe.

Créer automatiquement :

l'image
la description

Puis utiliser Buffer, Metricool ou Meta Business Suite pour programmer.

Calendrier ICS

Très utile.

Les joueurs peuvent ajouter :

Calendrier MTG Pau

à Google Calendar.

À chaque ajout sur GitHub :

➡ leur agenda se met à jour.

SEO automatique

Chaque événement devient automatiquement une page.

Exemple :

/events/modern-12-septembre

ou

/events/pauper-18-septembre

Google adore.

Classements

À partir des résultats.

results.csv

↓

Le site calcule automatiquement :

Classement Modern

Classement Pauper

Classement DC

Plus besoin de mettre à jour à la main.

News

Chaque événement terminé génère automatiquement :

Bravo à Pierre qui remporte le Modern !

Top 8 :

1...
2...
3...

À partir des standings.

Ce que je développerais si j'étais dans votre association
Phase 1 (2 semaines)

✅ Une base de données d'événements (events.yml ou events.json).

✅ Le site lit uniquement cette base.

Phase 2

GitHub Actions :

génération des affiches
génération des posts
publication Discord
Phase 3

Ajout :

calendrier ICS
flux RSS
sitemap automatique
SEO automatique
Phase 4

Back-office simple.

Plus besoin d'éditer le JSON.

Une petite interface :

Nouvel événement

Format :

( ) Pauper
( ) Modern
( ) DC
( ) Draft

Date

Heure

PAF

Lots

Publier

↓

Le commit Git est créé automatiquement.

Mon conseil de développeur

Comme votre site est sur GitHub Pages, j'éviterais complètement les solutions "no-code" type Notion, Airtable ou Google Sheets. Vous pouvez construire une chaîne entièrement basée sur GitHub + GitHub Actions + fichiers YAML/JSON, gratuite, versionnée et très fiable.

À terme, une seule saisie d'un nouvel événement pourrait déclencher automatiquement :

la mise à jour du site,
la génération de l'affiche aux couleurs du format,
la création d'un fichier .ics,
l'envoi d'une annonce sur Discord,
la préparation du texte et du visuel pour Facebook et Instagram,
et la mise à jour du sitemap pour améliorer le référencement.

Vous passeriez ainsi de 30 à 45 minutes de communication par événement à 2 ou 3 minutes, tout en publiant de manière beaucoup plus régulière et cohérente. C'est exactement le type d'automatisation qui apporte le plus de valeur à une association gérée par des bénévoles.
