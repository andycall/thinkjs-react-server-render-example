import $ from 'jquery'
import validator from 'revalidator'

import './index.scss'

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$('#form').on('submit', (e) => {
  var data = $(e.target).serializeObject();

  // TODO 表单内容动态验证

  $.ajax({
    url: '/admin/login',
    method: 'post',
    data: data,
    success: function (data) {
      if (data.errno === 0) {
        location.href = '/admin'
      }
      // TODO 表单验证
    }
  })

  return false;
});


