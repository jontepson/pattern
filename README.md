# APP för pattern

[![Build Status](https://app.travis-ci.com/jontepson/pattern.svg?branch=main)](https://app.travis-ci.com/jontepson/pattern)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jontepson/pattern/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/jontepson/pattern/?branch=main)

[![Build Status](https://scrutinizer-ci.com/g/jontepson/pattern/badges/build.png?b=main)](https://scrutinizer-ci.com/g/jontepson/pattern/build-status/main)

### Projektet kan testas på https://expo.dev/@jontepson/pattern-app
Pga Apples inställningar så funkar denna länken endast på Android.

Ladda ner koden
Gå till rooten
npm install
expo install
expo start
Appen kan köras i Expo Go på antingen din mobil eller 

Expo clienten behövs om du inte redan har den,
```
npm install --global expo-cli
```
löser det

Detta projekt innehåller en config.json fil och en configDev.json i src/config/

### Innehållet är
```
{ 
  "clientId": "Github client ID",
  "clientSecret": "Github client Secret",
  "redirect_uri": "Github client redirect uri"
}
```
Detta behövs då den är publicerad men även ska kunna köra lokalt. Mer info finns
[Här](https://docs.expo.dev/guides/authentication/#redirect-uri-patterns)
