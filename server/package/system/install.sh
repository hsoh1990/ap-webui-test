sudo perl -p -i -e '$.==16 and print "  __dirname + '"'"'/package/default'"'"',\n"' defaultdir/../../server.js

sudo perl -p -i -e '$.==40 and print "require('"'"'./package/default/main.js'"'"')(app, fs, url);\n"' defaultdir/../../server.js

echo "server.js 파일 수정 완료"
