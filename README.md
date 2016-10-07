# caremergeTest

Problem Statement
-------


Create a node server which responds to one and only one route : `GET /I/want/title`

This route expects a list of websites addresses in query string format e.g.

1 /I/want/title/?address=google.com
2 /I/want/title/?address=http://yahoo.com
3 /I/want/title/?address=google.com&address=www.dawn.com/events/

etc.

Tasks
--

1. Implement the above task using plain node.js callbacks (you can use `express` or `http` or any other helper module but nothing which absracts control flow). 
2. Implement the above using some kind of flow library e.g. [async.js] or [step.js]
3. Implement the above using Promises. You could use any library e.g. [RSVP] or [Q]

Done
--

All tasks are done.

Run: node task_1.js,task_2.js,task_3.js