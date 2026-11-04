/* KIJK62 — gedeelde scripts */
(function(){
  "use strict";
  var html=document.documentElement;
  html.classList.add('js');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var EN=(html.lang||'').toLowerCase().indexOf('en')===0;
  var LOC=EN?'en-GB':'nl-NL';
  var eur=new Intl.NumberFormat(LOC,{style:'currency',currency:'EUR',maximumFractionDigits:0});
  var num=new Intl.NumberFormat(LOC,{maximumFractionDigits:1});
  var S=EN?{
    open:'Open menu',close:'Close menu',done:'Done. <b>We handle the rest.</b>',pm:' p/m',ph:' p/h',perMonth:' per month',hpw:' hrs p/w',
    y1:'return in year 1',month:'month ',after12:'after month 12',hours:' hrs',
    beZero:'The time you get back already covers the investment. <b>Every new customer is profit.</b>',
    be1:'You need <b>',be2:' new ',cust:'customers',cust1:'customer',be3:' per month</b> to earn back the investment. Everything above that is profit.',
    paid:'break-even',mshort:'m',monthL:'Month ',
    roiPlan:function(r,p,i,v,n){return 'My ROI calculation: '+r+'% return in year 1, break-even in '+(p?('month '+p):'more than 12 months')+' (investment '+i+' p/m, customer value '+v+', '+n+' extra customers per month)'},
    q:'1 per quarter',w6:'1 every 6 weeks',m1:'1 per month',pick:'Pick a channel',pickWhy:'Select at least one channel to see your plan.',
    vis:'Visible',grow:'Growth',full:'Fully handled',
    visWhy:function(n){return 'A good start on '+(n===1?'one channel':'two channels')+', with a quarterly studio shoot.'},
    growWhy:function(n,v){return 'A steady rhythm on '+n+' channels'+(v?', with video':'')+'. We plan, post and reply.'},
    fullProf:"Including your own LinkedIn profile as the owner. You never have to think about it again.",fullMany:'Lots of channels and a high rhythm. We take over everything, with a regular studio day.',
    none:'none',planTxt:function(p,ch,f,m){return 'My content plan: '+p+' ('+ch+', '+f+'x a week, ± '+m+' posts per month)'},
    copied:'Copied',peekCase:'View case',sending:'Sending…',sentH:'Thank you, your request has been sent.',sentP:'We will get back to you within one working day. You will also receive a confirmation by email.',subj:'Subject: Intro call KIJK62',name:'Name',company:'Company',email:'Email',phone:'Phone',interest:'Interested in',pref:'Preference',noPref:'no preference'
  }:{
    open:'Menu openen',close:'Menu sluiten',done:'Klaar. <b>Wij doen de rest.</b>',pm:' p/m',ph:' p/u',perMonth:' per maand',hpw:' uur p/w',
    y1:'rendement in jaar 1',month:'maand ',after12:'na maand 12',hours:' uur',
    beZero:'Alleen de tijd die je terugkrijgt dekt de investering al. <b>Elke nieuwe klant is winst.</b>',
    be1:'Je hebt <b>',be2:' nieuwe ',cust:'klanten',cust1:'klant',be3:' per maand</b> nodig om de investering terug te verdienen. Daarboven is het winst.',
    paid:'terugverdiend',mshort:'m',monthL:'Maand ',
    roiPlan:function(r,p,i,v,n){return 'Mijn ROI-berekening: '+r+'% rendement in jaar 1, terugverdiend in '+(p?('maand '+p):'meer dan 12 maanden')+' (investering '+i+' p/m, klantwaarde '+v+', '+n+' extra klanten per maand)'},
    q:'1 per kwartaal',w6:'1 per 6 weken',m1:'1 per maand',pick:'Kies een kanaal',pickWhy:'Selecteer minimaal één kanaal om je plan te zien.',
    vis:'Zichtbaar',grow:'Groei',full:'Volledig uit handen',
    visWhy:function(n){return 'Een goede start op '+(n===1?'één kanaal':'twee kanalen')+', met een studioshoot per kwartaal.'},
    growWhy:function(n,v){return 'Vast ritme op '+n+' kanalen'+(v?', met video erbij':'')+'. Wij plannen, posten en reageren.'},
    fullProf:'Inclusief je eigen LinkedIn-profiel als ondernemer. Je hebt er geen omkijken meer naar.',fullMany:'Veel kanalen en een hoog ritme. Wij nemen alles over, met een vaste studiodag.',
    none:'geen',planTxt:function(p,ch,f,m){return 'Mijn contentplan: '+p+' ('+ch+', '+f+'x per week, ± '+m+' posts per maand)'},
    copied:'Gekopieerd',peekCase:'Bekijk de case',sending:'Versturen…',sentH:'Bedankt, je aanvraag is verstuurd.',sentP:'We nemen binnen één werkdag contact met je op. Je krijgt ook een bevestiging per e-mail.',subj:'Onderwerp: Kennismaking KIJK62',name:'Naam',company:'Bedrijf',email:'E-mail',phone:'Telefoon',interest:'Interesse',pref:'Voorkeur',noPref:'geen voorkeur'
  };

  /* ---------- header, menu, mobiele balk ---------- */
  var header=$('.site-header'),mbar=$('.mbar'),sb=$('.scrollbar'),sbi=sb&&$('i',sb),sbTick=false;
  function paintBar(){
    sbTick=false;if(!sbi)return;
    var max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
    sbi.style.transform='scaleX('+p.toFixed(4)+')';sb.setAttribute('aria-valuenow',Math.round(p*100));
  }
  window.addEventListener('resize',paintBar,{passive:true});window.addEventListener('load',paintBar);
  function onScroll(){
    var y=window.scrollY;
    if(!sbTick){sbTick=true;requestAnimationFrame(paintBar)}
    if(header)header.classList.toggle('scrolled',y>8);
    if(mbar)mbar.classList.toggle('show',y>520);
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var burger=$('.burger'),mm=$('#mm');
  function setMenu(open){
    if(!mm)return;mm.hidden=!open;html.classList.toggle('menu-open',open);
    burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?S.close:S.open);
    var p=$('path',burger);if(p)p.setAttribute('d',open?'M6 6l12 12M18 6L6 18':'M4 7h16M4 12h16M4 17h10');
  }
  if(burger)burger.addEventListener('click',function(){setMenu(mm.hidden)});
  if(mm)mm.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  $$('.dd>button').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();var d=b.parentNode,o=!d.classList.contains('open');$$('.dd.open').forEach(function(x){x.classList.remove('open')});d.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o))});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.dd'))$$('.dd.open').forEach(function(x){x.classList.remove('open');$('button',x).setAttribute('aria-expanded','false')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(mm&&!mm.hidden)setMenu(false);$$('.dd.open').forEach(function(x){x.classList.remove('open')})}});
  $$('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear()});

  /* ---------- HET OOG: kijkt mee met de bezoeker ---------- */
  var eyes=$$('[data-eye]').map(function(el){
    return {el:el,iris:$('.eye-iris',el),pupil:$('.eye-pupil',el),x:0,y:0};
  });
  var pointer=null,lastMove=0;
  function look(eye,tx,ty){
    var r=eye.iris.getBoundingClientRect();if(!r.width)return;
    var cx=r.left+r.width/2,cy=r.top+r.height/2;
    var dx=tx-cx,dy=ty-cy,d=Math.hypot(dx,dy)||1;
    var max=r.width*0.30,reach=Math.min(d/220,1)*max;
    eye.x=dx/d*reach;eye.y=dy/d*reach;
    eye.pupil.style.setProperty('--pt','translate('+eye.x.toFixed(1)+'px,'+eye.y.toFixed(1)+'px)');
  }
  function lookAll(x,y){eyes.forEach(function(e){look(e,x,y)})}
  if(eyes.length){
    window.addEventListener('pointermove',function(e){pointer={x:e.clientX,y:e.clientY};lastMove=Date.now();if(!reduce)lookAll(e.clientX,e.clientY)},{passive:true});
    window.addEventListener('pointerdown',function(e){pointer={x:e.clientX,y:e.clientY};lastMove=Date.now();lookAll(e.clientX,e.clientY)},{passive:true});
    // rondkijken als niemand beweegt (telefoon)
    var wander=[[.5,.5],[.15,.3],[.85,.35],[.5,.9],[.3,.75],[.7,.15]],wi=0;
    setInterval(function(){
      if(reduce||Date.now()-lastMove<2500)return;
      wi=(wi+1)%wander.length;lookAll(wander[wi][0]*innerWidth,wander[wi][1]*innerHeight);
    },1900);
    // knipperen
    (function blink(){
      setTimeout(function(){if(!reduce)eyes.forEach(function(e){e.el.classList.remove('blink');void e.el.offsetWidth;e.el.classList.add('blink')});blink()},3500+Math.random()*4000);
    })();
    // flits bij laden en bij klik op een primaire knop
    function shoot(){eyes.forEach(function(e){e.el.classList.remove('shoot');void e.el.offsetWidth;e.el.classList.add('shoot')})}
    if(!reduce)setTimeout(shoot,500);
    $$('.btn').forEach(function(b){b.addEventListener('pointerenter',shoot)});
    lookAll(innerWidth*.5,innerHeight*.9);
  }

  /* ---------- home: live-ticker ---------- */
  var tick=$('[data-ticker]');
  if(tick){
    var msgs=JSON.parse(tick.getAttribute('data-ticker')),ti=0,tt=$('span:last-child',tick);
    setInterval(function(){ti=(ti+1)%msgs.length;tt.textContent=msgs[ti]},2600);
  }

  /* ---------- contentweek: goedkeuren ---------- */
  $$('[data-approve]').forEach(function(ap){
    ap.addEventListener('click',function(){
      var s=document.createElement('span');s.className='status s-plan';s.textContent=ap.getAttribute('data-approve');
      ap.replaceWith(s);var n=$('[data-week-note]');if(n)n.innerHTML=S.done;
    });
  });

  /* ---------- ROI-calculator ---------- */
  $$('[data-roi]').forEach(function(root){
    var D={v:2500,m:40,n:2,i:1250,h:4,r:50};
    function val(k){var el=$('[data-k="'+k+'"]',root);return el?+el.value:D[k]}
    function paint(el){var mn=+el.min,mx=+el.max;el.style.setProperty('--p',((el.value-mn)/(mx-mn)*100)+'%')}
    function fmtField(k,v){
      if(k==='v'||k==='i'||k==='r')return eur.format(v)+(k==='i'?S.pm:k==='r'?S.ph:'');
      if(k==='m')return v+'%';
      if(k==='n')return num.format(v)+S.perMonth;
      if(k==='h')return v+S.hpw;
      return v;
    }
    var ramp=[0,.25,.5,.75,1,1,1,1,1,1,1,1];
    function calc(){
      $$('input[type=range]',root).forEach(function(el){paint(el);var o=$('output[for="'+el.id+'"]',root);if(o)o.textContent=fmtField(el.getAttribute('data-k'),+el.value)});
      var v=val('v'),m=val('m')/100,n=val('n'),inv=val('i'),h=val('h'),r=val('r');
      var timeVal=h*52/12*r;
      var cumIn=0,cumGain=0,payback=null,rows=[],ptsI=[],ptsG=[];
      for(var k=0;k<12;k++){
        var clients=n*ramp[k],gain=clients*v*m+timeVal;
        cumIn+=inv;cumGain+=gain;
        if(payback===null&&cumGain>=cumIn)payback=k+1;
        rows.push([k+1,clients,gain,cumGain-cumIn]);ptsI.push(cumIn);ptsG.push(cumGain);
      }
      var roi=(cumGain-cumIn)/cumIn*100;
      var be=Math.max(0,(inv-timeVal)/(v*m));
      var set=function(sel,t){var el=$(sel,root);if(el)el.textContent=t};
      var big=$('[data-o="roi"]',root);
      if(big)big.innerHTML=(roi>=0?'+':'')+Math.round(roi)+'%<small>'+S.y1+'</small>';
      set('[data-o="net"]',eur.format(cumGain-cumIn));
      set('[data-o="payback"]',payback?(S.month+payback):S.after12);
      set('[data-o="hours"]',Math.round(h*52)+S.hours);
      set('[data-o="be"]',be<=0?'0':num.format(Math.ceil(be*10)/10));
      set('[data-o="gain"]',eur.format(cumGain));
      set('[data-o="cost"]',eur.format(cumIn));
      set('[data-o="timeval"]',eur.format(timeVal*12));
      var beTxt=$('[data-o="betext"]',root);
      if(beTxt)beTxt.innerHTML=be<=0?S.beZero:S.be1+num.format(Math.ceil(be*10)/10)+S.be2+(be>1?S.cust:S.cust1)+S.be3;
      // grafiek
      var svg=$('.roi-chart',root);
      if(svg){
        var W=420,H=200,pl=44,pr=10,pt=10,pb=26,max=Math.max(ptsI[11],ptsG[11])*1.08||1;
        var step=niceStep(max/3),top=Math.ceil(max/step)*step;
        var X=function(i){return pl+i*(W-pl-pr)/11},Y=function(v){return pt+(H-pt-pb)*(1-v/top)};
        var g='';
        for(var t=0;t<=top+1;t+=step){g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+Y(t)+'" y2="'+Y(t)+'" stroke="var(--deep-line)" stroke-width="1"/><text x="'+(pl-6)+'" y="'+(Y(t)+3)+'" text-anchor="end">'+kfmt(t)+'</text>'}
        [1,3,6,9,12].forEach(function(mn){g+='<text x="'+X(mn-1)+'" y="'+(H-8)+'" text-anchor="middle">'+S.mshort+mn+'</text>'});
        var path=function(p){return p.map(function(v,i){return (i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ')};
        var area=path(ptsG)+' L'+X(11)+' '+Y(0)+' L'+X(0)+' '+Y(0)+' Z';
        g+='<path d="'+area+'" fill="var(--flash)" opacity=".12"/>';
        g+='<path d="'+path(ptsI)+'" fill="none" stroke="var(--on-deep-2)" stroke-width="2" stroke-dasharray="5 4"/>';
        g+='<path d="'+path(ptsG)+'" fill="none" stroke="var(--flash)" stroke-width="3" stroke-linejoin="round"/>';
        if(payback){var px=X(payback-1),py=Y(ptsG[payback-1]);g+='<circle cx="'+px+'" cy="'+py+'" r="5" fill="var(--flash)" stroke="var(--deep)" stroke-width="2"/><text x="'+Math.max(pl+4,Math.min(px-6,W-90))+'" y="'+Math.max(14,py-20)+'" style="fill:var(--on-deep);font-weight:600">'+S.paid+'</text>'}
        g+='<circle cx="'+X(11)+'" cy="'+Y(ptsG[11])+'" r="4" fill="var(--flash)"/>';
        svg.innerHTML=g;
      }
      var tb=$('[data-o="table"]',root);
      if(tb)tb.innerHTML=rows.map(function(rw){return '<tr><td>'+S.monthL+rw[0]+'</td><td>'+num.format(rw[1])+'</td><td>'+eur.format(rw[2])+'</td><td>'+eur.format(inv)+'</td><td style="color:'+(rw[3]>=0?'var(--ok)':'var(--bad)')+'">'+eur.format(rw[3])+'</td></tr>'}).join('');
      var cta=$('[data-roi-cta]',root);
      if(cta)cta.setAttribute('data-plan',S.roiPlan(Math.round(roi),payback,eur.format(inv),eur.format(v),num.format(n)));
    }
    function niceStep(x){var p=Math.pow(10,Math.floor(Math.log10(x)));var f=x/p;return (f<=1?1:f<=2?2:f<=5?5:10)*p}
    function kfmt(v){return v>=1000?'€'+(v/1000).toLocaleString(LOC,{maximumFractionDigits:0})+'k':'€'+v}
    $$('input',root).forEach(function(el){el.addEventListener('input',function(){$$('.scen button',root).forEach(function(b){b.setAttribute('aria-pressed','false')});calc()})});
    $$('.scen button',root).forEach(function(b){b.addEventListener('click',function(){
      var el=$('[data-k="n"]',root);el.value=b.getAttribute('data-n');
      $$('.scen button',root).forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});calc();
    })});
    calc();
  });

  /* ---------- contentplanner ---------- */
  var pf=$('#planForm');
  if(pf){
    var calcPlan=function(){
      var chk=$$('input[name=ch]:checked',pf),ch=chk.map(function(i){return i.value}),chl=chk.map(function(i){var l=pf.querySelector('label[for="'+i.id+'"]');return l?l.textContent:i.value});
      var freq=+(($('input[name=freq]:checked',pf)||{value:3}).value);
      var reels=$('#x-reel').checked,prof=$('#x-prof').checked,n=ch.length;
      var social=ch.filter(function(c){return c!=='GBP'}).length;
      var perWeek=social*freq+(ch.indexOf('GBP')>-1?1:0);
      var perMonth=Math.round(perWeek*52/12);
      var vidCh=ch.filter(function(c){return /Instagram|TikTok|YouTube|Facebook/.test(c)}).length;
      var vid=reels&&vidCh?Math.round(vidCh*freq*52/12*0.35):0;
      var studio=perMonth<=20?S.q:perMonth<=45?S.w6:S.m1;
      var pkg,why;
      if(!n){pkg=S.pick;why=S.pickWhy}
      else if(n<=2&&perMonth<=26&&!prof){pkg=S.vis;why=S.visWhy(n)}
      else if(n<=4&&perMonth<=70&&!prof){pkg=S.grow;why=S.growWhy(n,vid)}
      else{pkg=S.full;why=prof?S.fullProf:S.fullMany}
      $('#pNum').innerHTML=perMonth+'<small>posts</small>';
      $('#pCh').textContent=n;$('#pVid').textContent=vid?'± '+vid:S.none;
      $('#pStudio').textContent=n?studio:'–';$('#pPkg').textContent=pkg;$('#pWhy').textContent=why;
      $('#pCta').setAttribute('data-plan',S.planTxt(pkg,chl.join(', '),freq,perMonth));$('#pCta').setAttribute('data-pkg',pkg);
    };
    pf.addEventListener('change',calcPlan);calcPlan();
  }

  /* ---------- crop-tool (content & fotografie) ---------- */
  var crop=$('[data-crop]');
  if(crop){
    var box=$('.crop-box',crop),lab=$('.crop-label',crop);
    $$('[data-ar]').forEach(function(b){b.addEventListener('click',function(){
      var ar=b.getAttribute('data-ar');box.style.setProperty('--ar',ar);
      var p=ar.split('/');box.classList.toggle('wide',(+p[0]/+p[1])>1.4);
      lab.textContent=b.getAttribute('data-label');
      $$('[data-ar]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
    })});
    var auto=$$('[data-ar]'),ai=0,at=setInterval(function(){ai=(ai+1)%auto.length;auto[ai].click()},2600);
    $$('[data-ar]').forEach(function(b){b.addEventListener('pointerdown',function(){clearInterval(at)})});
  }

  /* ---------- LinkedIn voor/na ---------- */
  var li=$('[data-li]');
  if(li){
    var data=JSON.parse(li.getAttribute('data-li'));
    $$('[data-li-state]').forEach(function(b){b.addEventListener('click',function(){
      var s=b.getAttribute('data-li-state');li.setAttribute('data-state',s);
      $$('[data-li-state]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
      Object.keys(data[s]).forEach(function(k){var el=$('[data-f="'+k+'"]',li);if(el){el.innerHTML=data[s][k][0];el.className=data[s][k][1]||''}});
      var av=$('.li-av',li);av.innerHTML=s==='na'?'<img src="'+(EN?'../':'')+'img/studio-bogen.jpg" alt="">':'?';
    })});
  }

  /* ---------- schuifvergelijking: slepen met vinger of muis, pijltjestoetsen ---------- */
  $$('[data-cmp]').forEach(function(box){
    var r=$('.cmp-range',box),touched=false,drag=false,pos=50;
    var set=function(v){pos=Math.max(0,Math.min(100,v));box.style.setProperty('--pos',pos.toFixed(1)+'%');r.value=Math.round(pos)};
    var fromX=function(x){var b=box.getBoundingClientRect();return (x-b.left)/b.width*100};
    box.addEventListener('pointerdown',function(ev){if(ev.button>0)return;touched=true;drag=true;box.classList.add('dragging');try{box.setPointerCapture(ev.pointerId)}catch(err){}set(fromX(ev.clientX))});
    box.addEventListener('pointermove',function(ev){if(drag){set(fromX(ev.clientX));ev.preventDefault()}});
    var end=function(){drag=false;box.classList.remove('dragging')};
    box.addEventListener('pointerup',end);box.addEventListener('pointercancel',end);box.addEventListener('lostpointercapture',end);
    r.addEventListener('input',function(){touched=true;set(+r.value)});
    if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(en){if(!en[0].isIntersecting)return;io.disconnect();
      var keys=[[0,50],[900,18],[1900,82],[2900,50]],t0=performance.now();
      (function f(now){if(touched)return;var t=now-t0,i=0;while(i<keys.length-1&&t>keys[i+1][0])i++;if(i>=keys.length-1){set(50);return}
        var a=keys[i],b=keys[i+1],p=(t-a[0])/(b[0]-a[0]),q=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;set(a[1]+(b[1]-a[1])*q);requestAnimationFrame(f)})(t0);
    },{threshold:.45});io.observe(box)}
  });

  /* ---------- voor/na per kanaal ---------- */
  $$('[data-ba]').forEach(function(box){
    var btns=$$('[data-ba-state]',box),touched=false;
    var set=function(s){box.setAttribute('data-state',s);btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-ba-state')===s))});
      $('.ba-voor',box).setAttribute('aria-hidden',String(s!=='voor'));$('.ba-na',box).setAttribute('aria-hidden',String(s!=='na'))};
    btns.forEach(function(b){b.addEventListener('click',function(){touched=true;set(b.getAttribute('data-ba-state'))})});
    // eenmalig vanzelf omschakelen zodra het in beeld komt
    if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();setTimeout(function(){if(!touched)set('na')},2200)}},{threshold:.5});io.observe(box)}
  });

  /* ---------- toon-typer (copywriting) ---------- */
  var tone=$('[data-tone]');
  if(tone){
    var tones=JSON.parse(tone.getAttribute('data-tone')),txt=$('.tone-text',tone),meta=$('.tone-meta',tone),timer;
    function type(i){
      clearInterval(timer);var t=tones[i].text,p=0;txt.textContent='';
      meta.innerHTML=tones[i].meta.map(function(m){return '<span>'+m+'</span>'}).join('');
      if(reduce){txt.textContent=t;return}
      timer=setInterval(function(){p+=2;txt.textContent=t.slice(0,p);if(p>=t.length)clearInterval(timer)},18);
    }
    $$('.tone-tabs button',tone).forEach(function(b,i){b.addEventListener('click',function(){
      $$('.tone-tabs button',tone).forEach(function(x){x.setAttribute('aria-selected',String(x===b))});type(i);
    })});
    type(0);
  }

  /* ---------- reels storyboard ---------- */
  var reel=$('[data-reel]');
  if(reel){
    var scenes=$$('.scene',reel),items=$$('.board li'),bars=$$('.phone-bar i b',reel),tm=$('.phone-time',reel),img=$('.phone-screen img',reel);
    var lens=scenes.map(function(s){return +s.getAttribute('data-len')}),total=lens.reduce(function(a,b){return a+b},0),t0=performance.now();
    function frame(now){
      var t=((now-t0)/1000)%total,acc=0,cur=0;
      for(var i=0;i<lens.length;i++){if(t<acc+lens[i]){cur=i;break}acc+=lens[i]}
      scenes.forEach(function(s,i){s.classList.toggle('on',i===cur)});
      items.forEach(function(s,i){s.classList.toggle('on',i===cur)});
      bars.forEach(function(b,i){b.style.width=(i<cur?100:i>cur?0:((t-acc)/lens[i]*100))+'%'});
      tm.textContent='0:'+String(Math.floor(t)).padStart(2,'0')+' / 0:'+total;
      img.style.transform='scale('+(1.05+0.1*Math.sin(t/total*Math.PI))+')';
      if(!reduce)requestAnimationFrame(frame);
    }
    if(reduce){scenes[0].classList.add('on');items[0]&&items[0].classList.add('on')}else requestAnimationFrame(frame);
  }

  /* ---------- tijdlijn vult bij scrollen ---------- */
  var tl=$('[data-timeline]');
  if(tl){
    var fill=$('.fill',tl),lis=$$('li',tl);
    var upd=function(){
      var r=tl.getBoundingClientRect(),vh=innerHeight*0.6;
      var p=Math.max(0,Math.min(1,(vh-r.top)/r.height));fill.style.setProperty('--fill',(p*100)+'%');
      lis.forEach(function(li){li.classList.toggle('seen',li.getBoundingClientRect().top<vh)});
    };
    window.addEventListener('scroll',upd,{passive:true});upd();
  }

  /* ---------- FAQ zoeken ---------- */
  var fs=$('#faqSearch');
  if(fs){
    fs.addEventListener('input',function(){
      var q=fs.value.trim().toLowerCase(),shown=0;
      $$('.faq details').forEach(function(d){var hit=!q||d.textContent.toLowerCase().indexOf(q)>-1;d.hidden=!hit;if(hit)shown++;if(q&&hit)d.open=true});
      $$('.faq-cat').forEach(function(h){var list=h.nextElementSibling;h.hidden=list&&!$$('details',list).some(function(d){return !d.hidden})});
      $('#faqEmpty').hidden=shown>0;
    });
  }

  /* ---------- website-bouwer ---------- */
  var wb=$('#wbForm');
  if(wb){
    var WL=EN?{lv:['Compact','Medium','Extensive'],pages:{one:'1 page',biz:'5–10 pages',pro:'10+ pages'},base:['Custom design','Mobile-friendly and fast','Technical SEO','GEO for AI search','Contact form'],plan:'My website: '}
             :{lv:['Compact','Gemiddeld','Uitgebreid'],pages:{one:'1 pagina',biz:'5–10 pagina\'s',pro:'10+ pagina\'s'},base:['Ontwerp op maat','Snel en goed op mobiel','Technische SEO','GEO voor AI-zoekmachines','Contactformulier'],plan:'Mijn website: '};
    var calcW=function(){
      var ty=$('input[name=wtype]:checked',wb),tw=+ty.getAttribute('data-w');
      var fs=$$('input[name=wf]:checked',wb),fw=fs.reduce(function(a,i){return a+(+i.getAttribute('data-w'))},0);
      var score=tw*3+fw,max=3*3+9,p=Math.min(1,score/max);
      $('#wbFill').style.width=Math.max(8,p*100)+'%';
      var lv=p<.42?0:p<.72?1:2;$('#wbLevel').textContent=WL.lv[lv]+' · '+WL.pages[ty.value];
      var items=WL.base.concat(fs.map(function(i){return i.value}));
      $('#wbList').innerHTML=items.map(function(x){return '<li>'+x+'</li>'}).join('');
      var lab=wb.querySelector('label[for="'+ty.id+'"] b');
      $('#wbCta').setAttribute('data-plan',WL.plan+(lab?lab.textContent:'')+' ('+WL.pages[ty.value]+')'+(fs.length?', '+fs.map(function(i){return i.value}).join(', '):''));
    };
    wb.addEventListener('change',calcW);calcW();
  }


  /* ---------- glurend oog: max 3x per bezoeker, op 3 verschillende pagina's, na 4–12 s ---------- */
  var pk=$('#peek'),pp=$('#peekPanel');
  if(pk&&pp){
    var KEY='kijk62-peek',st={n:0,pages:[]};
    try{var raw=localStorage.getItem(KEY);if(raw)st=JSON.parse(raw)||st}catch(e){}
    var here=location.pathname.replace(/(index)?\.html$/,'').replace(/\/+$/,'')||'/';
    var save=function(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
    var cases=[];try{cases=JSON.parse($('#peekData').textContent)}catch(e){}
    var allowed=cases.length&&st.n<3&&st.pages.indexOf(here)<0&&!/\/404$/.test(here);
    if(allowed){
      var delay=4000+Math.random()*8000;
      setTimeout(function(){
        if(document.hidden){return}
        st.n++;st.pages.push(here);save();
        pk.hidden=false;void pk.offsetWidth;pk.classList.add('in');
        setInterval(function(){if(!pp.hidden)return;pk.classList.remove('wiggle');void pk.offsetWidth;pk.classList.add('wiggle')},5200);
      },delay);
    }
    var idx=0,auto=null,stage=$('.pp-stage',pp),dots=$('.pp-dots',pp);
    dots.innerHTML=cases.map(function(c,i){return '<button type="button" role="tab" aria-label="'+c.n+'" data-i="'+i+'"></button>'}).join('');
    var countUp=function(el){
      var full=el.getAttribute('data-v'),m=full.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
      if(!m||reduce){el.textContent=full;return}
      var pre=m[1],numS=m[2],post=m[3],dec=(numS.split(/[.,]/)[1]||'').length,sep=numS.indexOf(',')>-1?',':'.',target=parseFloat(numS.replace(',','.')),t0=performance.now();
      (function f(now){var p=Math.min(1,(now-t0)/900),e=1-Math.pow(1-p,3),v=(target*e).toFixed(dec);el.textContent=pre+(sep===','?v.replace('.',','):v)+post;if(p<1)requestAnimationFrame(f)})(t0);
    };
    var show=function(i){
      idx=(i+cases.length)%cases.length;var c=cases[idx];
      stage.innerHTML='<article class="pp-case"><div class="pp-logo">'+c.logo+'</div><span class="pp-meta">'+c.s+' · '+c.p+'</span><div class="pp-kpis">'+c.r.map(function(r){return '<div><b data-v="'+r[0].replace(/"/g,'&quot;')+'">'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</div><p class="pp-q">“'+c.q+'”</p><a class="pp-link" href="'+c.u+'">'+S.peekCase+' →</a></article>';
      $$('.pp-kpis b',stage).forEach(countUp);
      $$('button',dots).forEach(function(d,k){d.setAttribute('aria-selected',String(k===idx))});
    };
    var stopAuto=function(){if(auto){clearInterval(auto);auto=null}};
    var open=function(){
      pp.hidden=false;void pp.offsetWidth;pp.classList.add('open');pk.classList.remove('in');
      setTimeout(function(){pk.hidden=true},400);
      show(Math.floor(Math.random()*cases.length));$('.pp-x',pp).focus();
      if(!reduce)auto=setInterval(function(){show(idx+1)},6000);
    };
    var close=function(){pp.classList.remove('open');stopAuto();setTimeout(function(){pp.hidden=true},300)};
    pk.addEventListener('click',open);
    $$('[data-peek-close]',pp).forEach(function(b){b.addEventListener('click',close)});
    $$('[data-peek-step]',pp).forEach(function(b){b.addEventListener('click',function(){stopAuto();show(idx+(+b.getAttribute('data-peek-step')))})});
    dots.addEventListener('click',function(e){var b=e.target.closest('button');if(b){stopAuto();show(+b.getAttribute('data-i'))}});
    pp.addEventListener('pointerenter',stopAuto);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pp.hidden)close()});
  }

  /* ---------- portfolio-filter ---------- */
  var fbs=$$('[data-filter]'),pg=$('[data-pgrid]');
  if(fbs.length&&pg){
    fbs.forEach(function(b){b.addEventListener('click',function(){
      var k=b.getAttribute('data-filter'),shown=0;
      fbs.forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
      $$('.pcard',pg).forEach(function(c){var hit=k==='all'||(' '+c.getAttribute('data-tags')+' ').indexOf(' '+k+' ')>-1;c.hidden=!hit;if(hit)shown++});
      var e=$('[data-pempty]');if(e)e.hidden=shown>0;
    })});
  }

  /* plan meenemen naar contact */
  document.addEventListener('click',function(e){var a=e.target.closest('[data-plan]');if(!a)return;try{sessionStorage.setItem('kijk62-plan',a.getAttribute('data-plan'))}catch(err){}
    var sel=$('#f-pkg'),msg=$('#f-msg');if(sel&&msg){msg.value=a.getAttribute('data-plan')+'.';var p=a.getAttribute('data-pkg');if(p)[].forEach.call(sel.options,function(o){if(o.text===p)sel.value=p})}});

  /* ---------- kopiëren ---------- */
  function copy(text,btn){
    var done=function(){var t=btn.textContent;btn.textContent=S.copied;setTimeout(function(){btn.textContent=t},1600)};
    var fallback=function(){var box=btn.closest('.ccard,.done');var el=box&&$('pre,strong',box);if(!el)return;var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)};
    try{navigator.clipboard.writeText(text).then(done,fallback)}catch(e){fallback()}
  }
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){copy(b.getAttribute('data-copy'),b)})});

  /* ---------- contactformulier ---------- */
  var cf=$('#contactForm');
  if(cf){
    try{var pl=sessionStorage.getItem('kijk62-plan');if(pl){$('#f-msg').value=pl+'.';sessionStorage.removeItem('kijk62-plan')}}catch(e){}
    cf.addEventListener('submit',function(e){
      e.preventDefault();var ok=true;
      [['f-naam',function(v){return v.trim().length>1}],['f-mail',function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}]].forEach(function(r){
        var i=document.getElementById(r[0]),good=r[1](i.value);i.parentNode.classList.toggle('invalid',!good);if(!good&&ok){i.focus();ok=false}
      });
      if(!ok)return;
      var g=function(id){var el=document.getElementById(id);return el?el.value.trim():''};
      var days=$$('input[name=dag]:checked',cf).map(function(i){return i.value}).join(', ');
      var part=($('input[name=dagdeel]:checked',cf)||{value:''}).value;
      var t=S.subj+'\n\n'+S.name+': '+g('f-naam')+'\n'+S.company+': '+(g('f-bedrijf')||'-')+'\n'+S.email+': '+g('f-mail')+'\n'+S.phone+': '+(g('f-tel')||'-')+'\n'+S.interest+': '+g('f-pkg')+'\n'+S.pref+': '+(days||S.noPref)+(part?' ('+part+')':'')+'\n\n'+(g('f-msg')||'');
      var showCopy=function(){$('#doneText').textContent=t;var d=$('#done');d.hidden=false;d.scrollIntoView({behavior:'smooth',block:'nearest'})};
      var btn=$('button[type=submit]',cf),hp=$('#f-website',cf);
      if(!/^https?:$/.test(location.protocol)||/claude\.ai|claudeusercontent/.test(location.hostname)){showCopy();return}
      btn.disabled=true;var bt=btn.textContent;btn.textContent=S.sending;
      var ctl=('AbortController' in window)?new AbortController():null,to=setTimeout(function(){if(ctl)ctl.abort()},12000);
      fetch('/api/form',{method:'POST',headers:{'content-type':'application/json'},signal:ctl?ctl.signal:undefined,
        body:JSON.stringify({subject:(EN?'Intro call request: ':'Kennismaking aangevraagd: ')+g('f-naam')+(g('f-bedrijf')?' ('+g('f-bedrijf')+')':''),body:t,replyTo:g('f-mail'),name:g('f-naam'),lang:EN?'en':'nl',website:hp?hp.value:''})})
      .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||!j.ok)throw 0})})
      .then(function(){clearTimeout(to);var ok=document.createElement('div');ok.className='done-ok';ok.setAttribute('role','status');ok.innerHTML='<strong>'+S.sentH+'</strong><p>'+S.sentP+'</p>';cf.innerHTML='';cf.appendChild(ok);ok.scrollIntoView({behavior:'smooth',block:'nearest'})})
      .catch(function(){clearTimeout(to);btn.disabled=false;btn.textContent=bt;showCopy()});
    });
    var cm=$('#copyMsg');if(cm)cm.addEventListener('click',function(){copy($('#doneText').textContent,cm)});
  }
})();
