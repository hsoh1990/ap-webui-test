sudo perl -p -i -e '$.==16 and print "  __dirname + '"'"'/package/default'"'"',\n"' defaultdir/../../server.js

echo "server.js 파일 수정 완료"
