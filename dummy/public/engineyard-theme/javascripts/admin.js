/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 *
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 *
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // CAUTION: Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

var eysession = {
  // config parameters
  expires: 30,
  path: '/admin/',

  init: function(){
    var userCookie = $.cookie('_ey_session');
  
    if(!userCookie) {
      $.cookie('_ey_session', {expires : eysession.expires, path : eysession.path});
    } else {
      eysession.loadState();
    }
  },
  
  saveState: function(){
    var hidden_content = [];
    $('.content').each(function(){
      if($(this).is(':hidden')) {
        hidden_content.push(this.id)
      }
    });
    $.cookie('_ey_session', hidden_content);
  },
  
  loadState: function(){
    var hidden_content = ($.cookie('_ey_session')).split(',');
    $.each(hidden_content, function(index, value){
      $("#"+value).toggle(false);
      $("#"+value).parent().find('.collapsable').toggleClass('closed', true);
    });
  }
}

var toggler = function(checked,target) {
  if(checked){
    $(target).hide();
  } else {
    $(target).show();
  }
}

var addtoggler = function(eventsource,target) {
  $(eventsource).click(                
    function(e){
      toggler(e.currentTarget.checked,target);
    }
  )
}

var collapsable = function() {
  $('.collapsable').click(function() {
    $(this).parent().parent().parent().find('.content').slideToggle('fast', function(){  
      eysession.saveState();
    });
    $(this).toggleClass('closed');
  });
}

var sortable = function() {
  $('#sortCategories, #doneSorting').click(function(){
    $('#sortCategories, #doneSorting').toggle(function(){
      $('.categories .content:visible').parent().find('.collapsable').removeClass('closed');
      $('.categories .content:hidden').parent().find('.collapsable').addClass('closed');
    });
  }),
  $('#sortCategories').click(function(){
    $('.categories .content:visible').slideToggle('fast');
  }),
  $('#doneSorting').click(function(){
    $('.categories .content:hidden').slideToggle('fast');
  }),
  
  $('.categories').sortable({
    opacity : 0.6,
    delay: 50,
    scroll : true,
    handle: 'h3',
    revert: true,
    update : function () { 
      $.ajax({
        type: 'post',
        data: $(this).sortable('serialize'),
        dataType: 'script',
        complete: function(request){
          $(this).effect('highlight');
        },
        url: '/admin/technologies/categories/sort'
      })
    } 
  }),
  
  $('.components').sortable({
    opacity : 0.6,
    delay: 50,
    scroll : true,
    handle: 'h4',
    revert: true,
    update : function () { 
      $.ajax({
        type: 'post',
        data: $(this).sortable('serialize'),
        dataType: 'script',
        complete: function(request){
          $(this).effect('highlight');
        },
        url: '/admin/technologies/categories/' + ($(this).attr('id')) + '/components/sort'
      })
    }
  }),
  
  $(".categories").disableSelection();
  
  $(".categories h3, .components h4").mousedown(function(){
    $(this).parent().parent().addClass('floating');
  });
  $(".categories h3, .components h4").mouseup(function(){
    $(this).parent().parent().removeClass('floating');
  });
}

var datepicker = function(){
  var settings = {
    dateFormat: 'M d, yy',
    changeMonth: true,
    changeYear: true
  };
  
  $(".datepicker").datepicker(settings);
}

$(document).ready(function(){
  toggler($('.toggler').attr('checked'),'.toggle_section');
  addtoggler('.toggler','.toggle_section');
  sortable();
  collapsable();
  eysession.init();
  datepicker();
});