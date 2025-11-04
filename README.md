Le projet est une plateforme de publicité sur des sacs. Il y a deux types d'utilisateurs : les clients (qui veulent faire de la publicité) et les partenaires (qui distribuent les sacs).
Le cahier des charges doit être clair et détaillé pour que le développeur puisse comprendre sans avoir besoin d'explications supplémentaires.

Voici le plan proposé pour le cahier des charges :

    Introduction

    Objectifs du projet

    Fonctionnalités générales

    Description des acteurs

    Fonctionnalités détaillées par acteur
    a. Fonctionnalités communes (non connecté)
    b. Fonctionnalités client
    c. Fonctionnalités partenaire

    Exigences techniques

    Design et expérience utilisateur

    Contraintes et hypothèses

Rédigeons le cahier des charges en suivant ce plan.

Cahier des Charges - Plateforme Publicitaire pour Sacs
1. Introduction

La plateforme vise à connecter les entreprises clientes souhaitant promouvoir leurs marques via des sacs publicitaires et les partenaires chargés de la distribution. Le système inclut la gestion des réservations, des paiements, du suivi de commande et des communications entre parties prenantes.
2. Objectifs

    Permettre aux clients de réserver et payer des emplacements publicitaires sur des sacs.

    Faciliter la gestion des commandes pour les partenaires.

    Offrir un suivi en temps réel du statut des commandes.

    Garantir une expérience utilisateur intuitive et multilingue (FR/ANG).

3. Fonctionnalités Globales
3.1. Gestion des Utilisateurs

    Inscription :

        Formulaire avec : nom, prénom, téléphone, email, code postal, mot de passe, type (client/partenaire).

        Vérification par email ou SMS (au choix).

        Sélection des partenaires basée sur le code postal et zones voisines (rayon personnalisable en km).

    Connexion :

        Authentification via email/mot de passe.

3.2. Tableau de Bord Commun

    Barre supérieure : nom de l’entreprise, nom de l’utilisateur, date du jour, choix de langue (FR/ANG), déconnexion.

    Menu : réservation, paiement, déclarations, suivi de commande, informations personnelles, statistiques, dernière commande.

4. Fonctionnalités Clients
4.1. Réservation

    Période :

        Choix entre le 1er ou le 16 du mois (période de 2 semaines).

    Zones :

        16 zones disponibles (8 par face de sac).

        Coût : 0,50 €/zone. Sélection multiple possible.

    Logo :

        Téléchargement d’un logo existant OU création par la plateforme.

        Options : logo classique (gratuit) ou premium (payant).

    Calcul automatique du total avant paiement.

4.2. Paiement

    Paiement par carte bancaire.

    Génération et téléchargement de facture (modèle type Flixbus).

4.3. Suivi de Commande

    Statuts : fabrication, livraison, livré, distribution (chez le partenaire), terminé.

    Visibilité pour le client, le partenaire et l’administrateur.

4.4. Statistiques

    Métriques sur les performances des campagnes (à définir ultérieurement).

5. Fonctionnalités Partenaires

    Déclarations :

        Formulaire pour remontée d’informations.

    État des Commandes :

        Modification des statuts : livré → terminé.

        Synchronisation avec les clients et l’administration.

    Paiement :

        Gratuit lors du lancement (évolutif).

6. Exigences Techniques
6.1. Sécurité

    Validation des comptes par email/SMS.

    Stockage sécurisé des mots de passe.

6.2. Performance

    Interface responsive (PC, mobile).

    Gestion des pics d’utilisation (ex. périodes de réservation).

6.3. Internationalisation

    Support FR/ANG (texte, devises, dates).

7. Design et Expérience Utilisateur

    Interface épurée, inspirée des standards modernes (ex. Flixbus).

    Workflow intuitif : réservation → paiement → suivi.

    Codes couleurs pour les statuts de commande.

8. Contraintes et Hypothèses

    Contraintes :

        Intégration de paiement (ex. Stripe, PayPal).

        Gestion des time zones pour les périodes de réservation.

    Hypothèses :

        Les partenaires sont préalablement enregistrés par l’administration.

        Les logos "classiques" sont générés automatiquement via un template.

9. Évolutions Futures

    Système de notation des partenaires.

    Analytics avancés (taux de visibilité, ROI).

    Gestion des campagnes récurrentes.

Fin du Cahier des Charges
Document destiné à l’équipe de développement – toute clarification peut être demandée via des spécifications techniques complémentaires
