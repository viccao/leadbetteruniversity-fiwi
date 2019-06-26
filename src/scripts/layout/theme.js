import $ from 'jquery';
import 'bootstrap';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import "../../styles/theme.scss";
//import "../../styles/theme.scss.liquid";

// Common a11y fixes
focusHash();
bindInPageLinks();

// Set up jQuery so that it can be accessed from the HTML
window.jQuery = $;
window.$ = $;


$(document).ready(function(){

  onUpdate();
})


const matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);
const lightSchemeIcon = document.querySelector('link#light-scheme-icon');
const darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

function onUpdate() {
  if (matcher.matches) {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
  } else {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }
}

// Apply a specific class to the html element for browser support of cookies.
if (window.navigator.cookieEnabled) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

$('svg path').not('#logo path').attr('fill', 'var(--brand-secondary)');

$('.nav-toggle').click(function() {

  $(this).toggleClass('active');
  $('body').toggleClass('menu-active');
  return false;
});

$('.input-group .form-control').blur(function() {
    $(this).parents('.input-group').removeClass("active");
  })
  .focus(function() {
    $(this).parents('.input-group').addClass("active")
  });



setTimeout(function() {
  cssVar()
}, 250);

var resizeTimer;

$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {

    cssVar();
  }, 250);

});

function cssVar() {


  const headerHeight = $('.nav-container').outerHeight();
  const bgHeight = $('.bg').outerHeight();

  $('body').attr('style', '--headerHeight:' + headerHeight + 'px;');
  $('header').attr('style', '--height: ' + bgHeight + 'px;');
  $('html').attr('style', '--vw: ' + $(window).width() / 100)


  if ($('.collections-grid').length) {

    $('.single-collection .over').each(function() {

      var width = $(this).children('h6').outerWidth();

      $(this).attr('style', '--width: ' + width + 'px');

    });
  }
}
