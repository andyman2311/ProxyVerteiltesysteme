# ProxyVerteiltesysteme
Um den Proxy-Server zu nutzen, müssen Sie zunächst eine npm-Installation durchführen. 

Darüber hinaus müssen Sie eine users.json-Datei erstellen, in der Benutzername und Passwort für die Basic-Authentifizierung gespeichert sind. Ein Beispiel sieht wie folgt aus:

{
  "username1": "password",
  "username2": "password"
}

Um den Server zu starten, führen Sie bitte im "ProxyServer"-Ordner das Kommando "node ProxyServer.js" aus. 

Bitte beachten Sie, dass der Backend-Server eingeschaltet sein muss, da dessen Response entscheidend ist. 

Der Proxy kann nur funktionieren, wenn der Backend-Server auf der gleichen localhost-Adresse läuft wie der Proxy-Server.

Falls der Server außerhalb der localhost-Adresse laufen soll, muss die Variable "baseURL" angepasst werden und potenziell die port angabe.

Um den Proxy zu starten muss man mit dem Befehl node ProxyServer.js den Code starten. 
