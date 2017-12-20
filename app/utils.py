import urllib.request, json, http.client
from django.conf import settings


def getApiLinkData(url):
    try:
        request = urllib.request.urlopen(settings.API_URL+url).read()
        return json.loads(request.decode('utf-8'))
    except http.client.IncompleteRead as e:
        request = e.partial