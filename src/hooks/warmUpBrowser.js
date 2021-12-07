
import React from 'react';
import * as WebBrowser from 'expo-web-browser';

export default function warmUpBrowser() {

React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, [])
}