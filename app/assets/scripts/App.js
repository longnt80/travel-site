import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';

var mobileMenu = new MobileMenu();
var revealOnScroll = new RevealOnScroll($('.feature-item'), '85%');
var revealOnScroll = new RevealOnScroll($('.testimonial'), '60%');
