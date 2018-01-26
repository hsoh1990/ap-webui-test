sudo perl -p -i -e '$.==16 and print "  __dirname + '"'"'/package/test'"'"',\n"' /root/ap-webui-test/server/package/system/../../server.js

udo perl -p -i -e '$.==16 and print "'"' /root/ap-webui-test/server/package/system/../../server.js

sudo awk '{ if (NR==16) { print "  __dirname + \'/package/test',"; print $0 } else { print $0 } }' /root/ap-webui-test/server/server.js
