# Configuration EmailJS pour les Commandes Clients

## 📧 Comment recevoir les commandes par email automatiquement

### Étape 1: Créer un compte EmailJS

1. Allez sur [://.emahttwwwpsiljs.com/](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" et créez votre compte gratuit
3. Vérifiez votre email

### Étape 2: Configurer votre service email

1. Dans votre dashboard EmailJS, cliquez sur "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur email (Gmail, Outlook, Yahoo, etc.)
4. Connectez votre compte email `samxt37@gmail.com`
5. Donnez un nom à votre service (ex: "gmail_xt3d")

### Étape 3: Créer un template d'email

1. Cliquez sur "Email Templates" dans le menu
2. Cliquez sur "Create New Template"
3. Utilisez ces paramètres :

**Nom du template:** `order_template`

**Subject:**
```
Nouvelle commande 3D - {{from_name}}
```

**Template HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvelle commande 3D</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #667eea;">🔔 Nouvelle commande reçue !</h1>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informations du client</h2>
            <p><strong>Nom:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Type de projet:</strong> {{project_type}}</p>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0;">Description du projet</h2>
            <p style="white-space: pre-line;">{{project_description}}</p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 8px;">
            <p style="margin: 0;"><strong>📧 Répondre à:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
            <p style="margin: 10px 0 0 0;"><strong>⏰ Délai de réponse:</strong> 24 heures maximum</p>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
            Message envoyé depuis XT 3D Projects<br>
            Date: {{current_date}}
        </p>
    </div>
</body>
</html>
```

### Étape 4: Obtenir vos clés API

1. Dans "Email Services", copiez l'**Service ID** (ex: `service_xxxxx`)
2. Dans "Email Templates", copiez le **Template ID** (ex: `template_xxxxx`)
3. Dans "Account" > "General", copiez votre **Public Key** (ex: `xxxxxxxxxxxxxxx`)

### Étape 5: Configurer votre site web

1. Ouvrez le fichier `js/script.js`
2. Remplacez les valeurs suivantes :

```javascript
// Remplacez "YOUR_PUBLIC_KEY" par votre Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// Dans la fonction send(), remplacez :
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Par exemple :
```javascript
emailjs.init("ABC1234567890");
emailjs.send('service_gmail_xt3d', 'template_order_xt3d', templateParams)
```

## 🧪 Tester la configuration

1. Ouvrez votre site web localement
2. Remplissez le formulaire de contact
3. Soumettez le formulaire
4. Vérifiez que vous recevez l'email dans `samxt37@gmail.com`

## 📋 Dépannage

### Si les emails n'arrivent pas :
1. Vérifiez que votre compte email est correctement connecté dans EmailJS
2. Vérifiez que les IDs sont corrects dans le code
3. Consultez la console du navigateur pour les erreurs
4. Vérifiez votre boîte spam

### Limites du plan gratuit :
- 200 emails par mois
- 50 Ko par email maximum
- Support basique

### Pour plus d'emails :
- Upgrade vers le plan payant ($15/mois pour 5000 emails)
- Ou utilisez une alternative comme Formspree

## 🔒 Sécurité

- Votre clé publique est sécurisée (elle ne permet que l'envoi)
- Les informations sensibles ne sont pas exposées
- EmailJS chiffre toutes les communications

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez la documentation EmailJS : https://www.emailjs.com/docs/
2. Consultez les logs dans votre dashboard EmailJS
3. Contactez leur support si nécessaire

---

**🎉 Une fois configuré, toutes les commandes de vos visiteurs arriveront automatiquement dans votre boîte email !**