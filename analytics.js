/* Baan d’Or — GA4 production-only, opt-in analytics. */
(() => {
 const ID='G-85LPQCWJ6F', KEY='baandor_analytics_consent';
 if(location.protocol!=='https:' || !['baandor.com','www.baandor.com'].includes(location.hostname)) return;
 let started=false;
 const fr=document.documentElement.lang.toLowerCase().startsWith('fr');
 const tr=(a,b)=>fr?a:b;
 const get=()=>{try{return localStorage.getItem(KEY)}catch{return null}};
 const save=v=>{try{localStorage.setItem(KEY,v)}catch{}};
 function start(){
  if(started)return; started=true;
  window['ga-disable-'+ID]=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname});
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(s);
 }
 if(get()==='granted')start();
 function setup(){
  const box=document.createElement('section');box.className='bd-consent';box.hidden=true;box.setAttribute('aria-label',tr('Préférences de confidentialité','Privacy preferences'));
  const text=document.createElement('p');text.textContent=tr('Nous utilisons Google Analytics, avec votre accord, pour améliorer votre expérience sur notre site.','With your permission, we use Google Analytics to improve your website experience.');
  const actions=document.createElement('div');
  const button=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);return b};
  const accept=button(tr('Accepter','Accept'),()=>{save('granted');window['ga-disable-'+ID]=false;start();if(window.gtag)gtag('consent','update',{analytics_storage:'granted'});box.hidden=true});
  const reject=button(tr('Refuser','Decline'),()=>{save('denied');window['ga-disable-'+ID]=true;if(started){gtag('consent','update',{analytics_storage:'denied'});location.reload()}else box.hidden=true});
  actions.append(accept,reject);box.append(text,actions);document.body.append(box);
  const prefs=button(tr('Préférences de confidentialité','Privacy preferences'),()=>{box.hidden=false;accept.focus()});prefs.className='bd-privacy-link';(document.querySelector('footer')||document.body).append(prefs);
  if(!get())box.hidden=false;
  document.addEventListener('click',e=>{const a=e.target.closest?.('a[href]');if(e.defaultPrevented||!a||!started||get()!=='granted')return;let u;try{u=new URL(a.href)}catch{return}if(u.hostname!=='www.fresha.com'&&u.hostname!=='fresha.com')return;if(a.dataset.therapist)gtag('event','therapist_booking_click',{therapist:a.dataset.therapist,source_page:location.pathname,transport_type:'beacon'});gtag('event',/\/packages(?:\/|$)/.test(u.pathname)?'fresha_package_click':'fresha_booking_click',{destination_path:u.pathname,source_page:location.pathname,transport_type:'beacon'});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
