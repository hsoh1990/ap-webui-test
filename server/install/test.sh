echo "실행하기 전에 , 메인포트에 인터넷 연결이 되어있어야 합니다..."
echo -e "인터넷 연결이 되어있습니까? [y : 예, 이외의 다른문자 : 아니오] : \c "
read YN
if [ "$YN" != "y" ];then
  exit 0
fi

echo "ap 설치 시작..."
sleep 2s

ifconfig=$(ifconfig)

interface=`echo $ifconfig | cut -d':' -f1`

echo "DHCP Interface is $interface"
sleep 2s

IP=`hostname -I | cut -d' ' -f1`

IPa=`hostname -I | cut -d' ' -f1 | cut -d'.' -f1`
IPb=`hostname -I | cut -d' ' -f1 | cut -d'.' -f2`
IPc=`hostname -I | cut -d' ' -f1 | cut -d'.' -f3`

IPRouter=$IPa'.'$IPb'.'$IPc'.1'
echo "ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ"
echo "ip = $IP"
echo "router = $IPRouter"
echo "ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ"
sleep 2s

username=`awk -F ':' '{if($3>=500)print $1}' /etc/passwd`

user=`echo $username | cut -d' ' -f2`

echo "User is $user"
sleep 2s

echo "update 시작"

apt-get update

echo "upgrade 시작"

apt-get upgrade -y

echo "AP서버 다운로드, 압축 해제"

echo "hostapd 설치 시작"

apt-get install hostapd -y

echo "dnsmasq 설치 시작"

apt-get install dnsmasq -y

echo "hostapd disable 설정"

systemctl disable hostapd

echo "dnsmasq disable 설정"

systemctl disable dnsmasq

:<<'END'
echo "static ip 설정"
mv /etc/dhcpcd.conf /etc/dhcpcd.conf.orig

cat > /etc/dhcpcd.conf <<-EOF
interface $interface
static ip_address=$IP/24
static routers=$IPRouter

hostname_onoff

clientid

persistent

option rapid_commit

option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes

option ntp_servers

option interface_mtu

require dhcp_server_identifier

slaac private
EOF
END

echo "hostapd 설정"

touch /etc/hostapd/hostapd.conf
# 입맛대로 설정
echo "interface=wlan0" | sudo tee -a /etc/hostapd/hostapd.conf
echo "driver=nl80211" | sudo tee -a /etc/hostapd/hostapd.conf
echo "ssid=testAP103" | sudo tee -a /etc/hostapd/hostapd.conf
echo "hw_mode=g" | sudo tee -a /etc/hostapd/hostapd.conf
echo "channel=6" | sudo tee -a /etc/hostapd/hostapd.conf
echo "ieee80211n=1" | sudo tee -a /etc/hostapd/hostapd.conf
echo "wmm_enabled=0" | sudo tee -a /etc/hostapd/hostapd.conf
echo "ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]" | sudo tee -a /etc/hostapd/hostapd.conf
echo "macaddr_acl=0" | sudo tee -a /etc/hostapd/hostapd.conf
echo "auth_algs=1" | sudo tee -a /etc/hostapd/hostapd.conf
echo "wpa=2" | sudo tee -a /etc/hostapd/hostapd.conf
echo "wpa_passphrase=123412341234" | sudo tee -a /etc/hostapd/hostapd.conf
echo "wpa_key_mgmt=WPA-PSK" | sudo tee -a /etc/hostapd/hostapd.conf
echo "rsn_pairwise=CCMP" | sudo tee -a /etc/hostapd/hostapd.conf

mv /etc/default/hostapd /etc/default/hostapd.orig

mv ap-webui-test-master/server/install/hostapd.orig /etc/default/hostapd

echo "dnsmasq 설정"

mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig

touch /etc/dnsmasq.conf
# dhcp ip 입맛대로 설정
echo "interface=wlan0" | sudo tee -a /etc/dnsmasq.conf
echo "bind-interfaces" | sudo tee -a /etc/dnsmasq.conf
echo "server=8.8.8.8" | sudo tee -a /etc/dnsmasq.conf
echo "domain-needed" | sudo tee -a /etc/dnsmasq.conf
echo "bogus-priv" | sudo tee -a /etc/dnsmasq.conf
echo "no-resolv" | sudo tee -a /etc/dnsmasq.conf
echo "dhcp-range=192.168.10.12, 192.168.10.200, 12h" | sudo tee -a /etc/dnsmasq.conf

echo "interfaces 설정"

mv /etc/network/interfaces /etc/network/interfaces.orig

touch /etc/network/interfaces

echo "source-directory /etc/network/interfaces.d" | sudo tee -a /etc/network/interfaces
echo "" | sudo tee -a /etc/network/interfaces
echo "allow-hotplug wlan0" | sudo tee -a /etc/network/interfaces
echo "iface wlan0 inet manual" | sudo tee -a /etc/network/interfaces
echo "#wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf" | sudo tee -a /etc/network/interfaces

echo "ipv4.ip_forward 설정"

mv /etc/sysctl.conf /etc/sysctl.conf.orig

sed -i "28s/.*/net.ipv4.ip_forward=1/g" /etc/sysctl.conf.orig

mv /etc/sysctl.conf.orig /etc/sysctl.conf

sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT

iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

sh -c "iptables-save > /etc/iptables.ipv4.nat"

echo "rc.local 설정"

mv /etc/rc.local /etc/rc.local.orig

mv ap-webui-test-master/server/install/rc.local /etc/rc.local

chmod +x /etc/rc.local

echo "rc.local 설정 완료"

echo "hostapd, dnsmasq 서비스 시작"

# systemctl enable hostapd
#
# systemctl start hostapd
#
# systemctl enable dnsmasq
#
# systemctl start dnsmasq

echo "2. nodejs 설치"

apt-get remove nodejs -y

apt-get autoremove -y

curl -sL https://deb.nodesource.com/setup_8.x | bash -

apt-get install -y nodejs

npm install nodemon -g

cd ap-webui-test-master/server/

npm install

:<<'END'
echo "4. mocha 설치"

npm install -g mocha

echo "4. service 등록"

cd

mv ap-webui-test-master/server/install/nodeserver.service /etc/systemd/system/nodeserver.service

chmod +x /etc/systemd/system/nodeserver.service

systemctl enable nodeserver

END

echo "기기 다시 시작..."
sleep 2s

reboot
