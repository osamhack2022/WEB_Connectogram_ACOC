import os
import socket
import requests
import re
import datetime
import time
import json


def check_private_public_ip():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(("naver.com", 443))
    private_ip = sock.getsockname()[0]

    req = requests.get("http://146.56.100.135:8810/api/session/ipaddr")
    public_ip = json.loads(req.text)['ipaddr']

    return private_ip, public_ip


def make_connection_data(pri_ip, pub_ip):
    data = {
        'private_ip': pri_ip,
        'public_ip': pub_ip,
        'time': str(datetime.datetime.now()),
        'connection': [],
    }
    p = os.popen('netstat -no | findstr ESTABLISHED').read()
    for i in p.split('\n'):
        if i == '':
            continue
        i = str(i).strip().split()
        if pri_ip not in i[1]:
            continue
        process_query = os.popen('tasklist /svc /FI "PID eq {}'.format(i[4])).read()
        try:
            process_name = process_query.split('\n')[3].strip().split()[0]
        except:
            process_name = "none"

        data['connection'].append({
            'local': i[1],
            'foreign': i[2],
            'pid': i[4],
            'pname': process_name,
        })

    return data


if __name__ == '__main__':
    IP_PRIVATE, IP_PUBLIC = check_private_public_ip()

    while 1:
        data = make_connection_data(IP_PRIVATE, IP_PUBLIC)
        URL = 'http://146.56.100.135:8810/api/analyze/make-connection-data'
        #print(data)
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        res = requests.post(URL, data=json.dumps(data), headers=headers)
        print(res.text)
        time.sleep(10)