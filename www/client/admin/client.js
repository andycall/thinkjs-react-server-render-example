import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import ContextComponent from './context'
import $ from 'jquery'


import routes from './route/RootRoute'
const {pathname, search, hash} = window.location
const location = `${pathname}${search}${hash}`

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  for (var i = 0, l = a.length; i < l; i++) {
    var item = a[i];
    var name = item.name;
    // if the value is null or undefined, we set to empty string, else we
    // use the value passed
    var value = item.value != null ? item.value : '';

    // if the key already exists we convert it to an array
    if (o[name] !== undefined) {
      if (!o[name].push) {
        // convert to array
        o[name] = [o[name]];
      }
      o[name].push(value);
    }
    else {
      o[name] = value;
    }
  }

  return o;
};

match({routes, location}, () => {
  ReactDOM.render(
    <ContextComponent token={window.csrfToken}>
      <Router routes={routes} history={browserHistory}/>
    </ContextComponent>,
    document.getElementById('react-dom')
  )
});