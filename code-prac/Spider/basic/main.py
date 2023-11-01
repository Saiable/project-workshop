import requests


headers = {
    "Referer": "http://www.whggzy.com/PoliciesAndRegulations/index.html",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
}
data = {}
def run():
    url = 'http://www.whggzy.com/PoliciesAndRegulations/index.html'
    response = requests.post(url, headers=headers, data=data).content.decode()
    print(response)

def main():
    run()

if __name__ == "__main__":
    main()