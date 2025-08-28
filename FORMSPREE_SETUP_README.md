# Configuration Formspree (Alternative Simple)

## 📧 Solution Alternative : Formspree (Plus Simple)

### Avantages de Formspree :
- ⚡ Configuration en 2 minutes
- 💰 50 emails gratuits par mois
- 🔒 Pas besoin de clé API
- 📊 Dashboard pour voir toutes les soumissions

### Étape 1: Créer un compte Formspree

1. Allez sur [https://formspree.io/](https://formspree.io/)
2. Cliquez sur "Sign Up" et créez votre compte
3. Vérifiez votre email

### Étape 2: Créer un formulaire

1. Dans votre dashboard, cliquez sur "Create a form"
2. Donnez un nom : "XT 3D Projects Orders"
3. Copiez l'endpoint URL (ex: `https://formspree.io/f/xxxxxxxx`)

### Étape 3: Modifier le formulaire HTML

Remplacez dans `index.html` :

```html
<form class="contact-form" id="orderForm">
```

Par :

```html
<form class="contact-form" id="orderForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Étape 4: Modifier le JavaScript

Dans `js/script.js`, remplacez toute la fonction de soumission par :

```javascript
// Form submission with Formspree
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        // Formspree gère automatiquement l'envoi
        // Le formulaire sera soumis normalement et vous recevrez l'email

        const formData = new FormData(this);
        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            project: formData.get('project'),
            description: formData.get('description'),
            image: formData.get('image')
        };

        // Validation
        if (!orderData.name || !orderData.email || !orderData.description) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            e.preventDefault();
            return;
        }

        // Show success message (Formspree will redirect or show success)
        showNotification('Votre commande a été envoyée avec succès !', 'success');

        console.log('Commande soumise:', orderData);
    });
}
```

### Étape 5: Personnaliser les emails

Dans votre dashboard Formspree :
1. Allez dans "Forms" > Votre formulaire
2. Cliquez sur "Settings"
3. Personnalisez :
   - **Email Subject** : `Nouvelle commande 3D - {{name}}`
   - **Reply-to** : `{{email}}`
   - **Success Message** : `Merci ! Votre commande a été envoyée.`

## 📧 Format des emails reçus

Vous recevrez des emails comme :

```
Subject: Nouvelle commande 3D - Jean Dupont

name: Jean Dupont
email: jean@email.com
project: Prototypes Fonctionnels
description: Je souhaite créer un prototype de téléphone personnalisé...

_image: [fichier attaché si uploadé]
```

## ⚙️ Fonctionnalités Avancées

### Redirection après soumission :
Ajoutez dans votre formulaire HTML :
```html
<input type="hidden" name="_next" value="https://votresite.com/merci.html" />
```

### Notifications par email :
```html
<input type="hidden" name="_cc" value="votre-autre-email@email.com" />
```

### Spam protection :
Formspree inclut automatiquement une protection anti-spam.

## 💰 Tarifs Formspree

- **Gratuit** : 50 soumissions/mois
- **Pro** : $19/mois pour 1000 soumissions
- **Business** : $59/mois pour 5000 soumissions

## 🔄 Migration facile

Si vous voulez changer plus tard :
- Exportez vos données depuis Formspree
- Importez vers EmailJS ou autre service
- Modifiez simplement l'URL dans le formulaire

---

**🚀 Formspree est parfait pour commencer rapidement !**