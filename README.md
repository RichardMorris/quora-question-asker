# quora-question-asker
Finds out who asked a question on Quora

A chrome/firefox extension which finds out who first asked a question on 
Quora. In particular it finds out if the question was asked by an anonymous person who might be trolling.

The operation is pretty simple: read the /log page and finds the first entry (last in the page). It then adds a line in the question with the name of the person who asked the question together with the date the question was added.

The first version has a big bug which means the answer cannot always be found if the question has a lot of activity, say more than 20 answers. 

To install on chrome save all files in a directory then go to the chrome://extensions/ page and use the **Load unpacked extension...** button.

To install on firefox save all files in a directory and follow the instructions in https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox

I hope to package the extensions so they are easier to load.
