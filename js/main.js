$(function(){
  $('#yr').text(new Date().getFullYear());

  // Mobile menu
  var mobileCls='hidden flex flex-col absolute top-16 inset-x-0 bg-ink p-6 gap-5 border-b border-line';
  $('#burger').on('click',function(){
    var open=$('#menu').toggleClass(mobileCls).hasClass('flex');
    $(this).attr('aria-expanded',open);
  });
  $('#menu a').on('click',function(){ if($('#menu').hasClass('flex')) $('#burger').click(); });

  // Image fallback: labelled placeholder until a real photo loads
  $('.ph').each(function(){
    var $b=$(this),$i=$b.find('img');
    if(!$i.length) return;
    function ok(){ $b.addClass('loaded'); }
    function bad(){ $b.addClass('missing'); }
    if($i[0].complete){ ($i[0].naturalWidth>0)?ok():bad(); }
    $i.on('load',ok).on('error',bad);
  });

  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$(e.target).addClass('in');io.unobserve(e.target);}});},{threshold:.12});
    $('.reveal').each(function(){io.observe(this);});
  } else $('.reveal').addClass('in');

  // Lightbox (only photos that actually loaded)
  var items=[],idx=0;
  function show(i){ idx=(i+items.length)%items.length; $('#lb-img').attr({src:items[idx].src,alt:items[idx].alt}); }
  function close(){ $('#lb').removeClass('open'); $('body').css('overflow',''); }
  $('#gal .ph').css('cursor','zoom-in').on('click',function(){
    if(!$(this).hasClass('loaded')) return;
    items=$('#gal .ph.loaded img').map(function(){return {src:this.currentSrc||this.src,alt:this.alt};}).get();
    $('#lb').addClass('open'); $('body').css('overflow','hidden');
    show($('#gal .ph.loaded').index(this));
  });
  $('#lb-x').on('click',close);
  $('#lb').on('click',function(e){ if(e.target===this) close(); });
  $('#lb-n').on('click',function(){show(idx+1)});
  $('#lb-p').on('click',function(){show(idx-1)});
  $(document).on('keydown',function(e){
    if(!$('#lb').hasClass('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight') show(idx+1);
    if(e.key==='ArrowLeft') show(idx-1);
  });
});
