#!/usr/bin/env bash

#settings
COUCHDB="http://127.0.0.1:5984"
COUCHDB_COOKIE=cookies.txt

echo "CouchDB login:"
read    -p "Username: " USER
read -s -p "Password: " PASSWORD
echo
USRPWD='name='$USER'&password='$PASSWORD
curl --cookie $COUCHDB_COOKIE --cookie-jar $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X POST $COUCHDB/_session --data "$USRPWD"  -H 'Content-Type:application/x-www-form-urlencoded'

echo "Allowing CORS on CouchDB"
echo "Is is probably advicable to look at these settings very carfully at a later date"
echo "and make them more restrictive!"
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X PUT $COUCHDB/_config/httpd/enable_cors -d '"true"'
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X PUT $COUCHDB/_config/cors/origins -d '"*"'
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X PUT $COUCHDB/_config/cors/credentials -d '"true"'
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X PUT $COUCHDB/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X PUT $COUCHDB/_config/cors/headers -d '"accept, authorization, content-type, origin, referer, x-csrf-token, X-Requested-With"'


echo "Create a database (Use 'bliki' for this application)..."
read    -p "Database name : " DATABASE
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X PUT $COUCHDB/$DATABASE


echo "Add a blogger user..."
read    -p "Username: " USER
read -s -p "Password: " PASSWORD
echo
JSON='{"_id": "org.couchdb.user:'$USER'","name":"'$USER'","roles": ["blogger"],"type": "user","password": "'$PASSWORD'"}'
echo "$JSON"
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -HContent-Type:application/json -X PUT $COUCHDB/_users/org.couchdb.user:$USER --data-binary "$JSON"

echo "Limit design changes to role '_admin' on database: " $DATABASE
curl --cookie $COUCHDB_COOKIE -X PUT $COUCHDB/$DATABASE/_security -HContent-Type:application/json -d '{"admins":{"names":[], "roles":["_admin"]}, "readers":{"names":[],"roles":[]}}'
echo "Only users with role '_admin' may now change design documents on the database."
echo "Anybody may read."

echo "Limiting writes to the database to 'blogger' and '_admin' roles"
curl --cookie $COUCHDB_COOKIE --user-agent Mozilla/4.0 -X POST $COUCHDB/$DATABASE -HContent-Type:application/json -d $'{"_id":"_design/_auth","validate_doc_update":"function (newDoc, oldDoc, userCtx) {\\nvar role = \\"blogger\\";\\nif (userCtx.roles.indexOf(\\"_admin\\") === -1 && userCtx.roles.indexOf(role) === -1) {\\nthrow({forbidden : \\"Only users with role \\" + role + \\" or an admin can modify this database.\\"});\\n}\\n}"}'



#cleanup
rm -f cookies.txt