App.info({
	id: 'com.outremerveilles.jobwebcup',
  name: 'jobwebcup',
  description: 'job webcup',
  author: 'thomas',
  email: 'thomas.craipeau@gmail.com',
  version: '0.0.1'
});

App.icons({
'android_ldpi': 'ressource/res/drawable-ldpi/appicon.png',
  'android_mdpi': 'ressource/res/drawable-mdpi/appicon.png',
  'android_hdpi': 'ressource/res/drawable-hdpi/appicon.png',
  'android_xhdpi': 'ressource/res/drawable-xhdpi/appicon.png',
});

App.launchScreens({
  'android_ldpi_portrait': 'ressource/res/res-long-port-ldpi/default.png',
  'android_ldpi_landscape': 'ressource/res/res-long-land-ldpi/default.png',
  'android_mdpi_portrait': 'ressource/res/res-long-port-mdpi/default.png',
  'android_mdpi_landscape': 'ressource/res/res-long-land-mdpi/default.png',
  'android_hdpi_portrait': 'ressource/res/res-long-port-hdpi/default.png',
  'android_hdpi_landscape': 'ressource/res/res-long-land-hdpi/default.png',
  'android_xhdpi_portrait': 'ressource/res/res-long-port-xhdpi/default.png',
  'android_xhdpi_landscape': 'ressource/res/res-long-land-xhdpi/default.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');

App.accessRule('*');

/*App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '117684621596731',
  API_KEY: '9faadb2b6c1c9e25d8ed764b0f95d74a',
  APP_NAME:'mapphotos'
});*/
