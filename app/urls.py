from django.conf.urls import url
#from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    home_page,
    realm_home_page,
    item_details_view,
    item_hourly_chart_data,
    item_daily_chart_data,
    item_daily_details_chart_data,
    item_list,
    test_page)

urlpatterns = [
    url(r'^$', home_page, name='home_page'),
    url(r'^(?P<realm_slug>[-\w]+)/home', realm_home_page, name='realm_home_page'),
    url(r'^(?P<realm_slug>[-\w]+)/item/(?P<item_id>\d+)', item_details_view, name='item_details'),
    url(r'^chart-data/(?P<realm_slug>[-\w]+)/hourly/(?P<item_id>\d+)',item_hourly_chart_data, name='item-hourly-chart-data'),
    url(r'^chart-data/(?P<realm_slug>[-\w]+)/daily/(?P<item_id>\d+)',item_daily_chart_data, name='item-daily-chart-data'),
    url(r'^chart-data/(?P<realm_slug>[-\w]+)/daily-details/(?P<item_id>\d+)',item_daily_details_chart_data, name='item-daily-details-chart-data'),
    url(r'^item-list', item_list, name='item-list'),
    url(r'^test', test_page, name='test'),
    #url(r'^realms', realm_list, name='model.realm-list'),
    #url(r'^model.realm/(?P<pk>\d+)', realm_detail, name='model.realm-details')
]

#urlpatterns = format_suffix_patterns(urlpatterns)