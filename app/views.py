import urllib.request, json, http.client, urllib.error
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from .utils import getApiLinkData

# Create your views here.
def test_page(request):
    return render(request, 'web_app/item_details.html', {})

def home_page(request):
    return render(request, 'web_app/index.html', {})

def item_hourly_chart_data(request, realm_slug, item_id):
    try:
        tsd_data = getApiLinkData(realm_slug+"/hourly/"+item_id)
        return JsonResponse(tsd_data, safe=False)
    except urllib.error.URLError as e:
        return HttpResponse(status=404)

def item_details_view(request, realm_slug, item_id):
    # realm_service = RealmService()
    # item_service = ItemService()
    # tsd_service = TSDHourlyService()
    # realm = realm_service.getRealmBySlug(realm_slug)
    # item = item_service.getItemByItemId(item_id)
    # tsd = tsd_service.getRealmItemLastData(item.id, realm.connected_realm)
    try:
        #data = getApiLinkData(realm_slug+"/"+item_id)
        realm = getApiLinkData("realm/"+realm_slug)
        tsd = getApiLinkData(realm_slug+"/last/"+item_id)
        item = getApiLinkData("item/"+item_id)
        connected_realms = getApiLinkData("connected-realm/"+realm_slug)
        if not realm['isActive']:
            return HttpResponse(status=404)

        return render(request, 'web_app/item_details.html',
                               {
                                   'api_url': settings.API_URL,
                                   'media': settings.API_MEDIA_URL,
                                   'realm': realm,
                                   'item': item,
                                   'tsd': tsd,
                                   'connected_realms': connected_realms
                               })
        #return render(request, 'web_app/index.html', {})
    except urllib.error.URLError as e:
        return HttpResponse(status=404)


    # print(tsd.market_price)
    # print(realm.connected_realm.id)
    # print(item.id)
    # # TODO: dodaj walidacje na istnienie TSD (najlepiej juz w templatce)
    # if realm and realm.isActive and item:
    #     connected_realms = realm_service.getRealmNamesAndSlugsByConnectedRealmId(realm.connected_realm)
    #     return render(request, 'web_app/item_details.html',
    #                   {
    #                       'realm': realm,
    #                       'item': item,
    #                       'tsd': tsd,
    #                       'connected_realms': connected_realms
    #                   })
    # else:
    #     raise Http404("No valid realm or item.")