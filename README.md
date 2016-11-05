# quora-question-asker
Finds out who asked a question on Quora

A chrome extension which finds out who first asked a question on 
Quora. In particular it finds out if the question was asked by an anonymous person who might be trolling.

The operation is pretty simple: read the /log page and finds the first entry (last in the page).

The first version has a big bug which means the answer cannot always be found if the question has a lot of activity. 

To install save all files in a directory then go to the chrome://extensions/ page and use the **Load unpacked extension...** button.
