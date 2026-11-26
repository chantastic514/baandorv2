(()=>{const selector='main article, main .pkg-feature, main .v11-product';document.querySelectorAll(selector).forEach(card=>{if(card.closest('.bd-single-action'))return;const actions=[...card.querySelectorAll('a[href],button,input,select,textarea,[role="button"]')];if(actions.length!==1||!actions[0].matches('a.btn[href]'))return;const link=actions[0];card.classList.add('bd-single-action');card.addEventListener('click',e=>{if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.target.closest('a,button,input,select,textarea,label')||window.getSelection()?.toString())return;link.click()})})})();

/* V19 bilingual content refinements. */
(()=>{
 const fr=document.documentElement.lang.toLowerCase().startsWith('fr');
 const titles=new Map(fr?[
 ['notre collection de soins','Notre Collection De Soins'],
 ['un peu de bien-être dans votre boîte courriel','Un Peu De Bien-Être Dans Votre Boîte Courriel'],
 ['des privilèges à découvrir','Des Privilèges À Découvrir'],
 ['l’univers baan d’or','L’Univers Baan d’Or']
 ]:[
 ['our treatment collection','Our Treatment Collection'],
 ['a little wellness in your inbox','A Little Wellness In Your Inbox'],
 ['discover our privileges','Discover Our Privileges'],
 ['privileges to discover','Privileges To Discover'],
 ['the baan d’or universe','The Baan d’Or Universe'],
 ['the world of baan d’or','The World Of Baan d’Or'],
 ['baan d’or universe','Baan d’Or Universe']
 ]);
 document.querySelectorAll('main h2, .site-footer .v11-news h2').forEach(h=>{
  const key=h.textContent.trim().toLocaleLowerCase(fr?'fr-CA':'en-CA').replace(/'/g,'’');
  let value=titles.get(key);
  if(!value&&h.closest('.v16-social')) value=fr?'L’Univers Baan d’Or':'The Baan d’Or Universe';
  if(!value&&h.closest('main section.dark')&&/privileg|privilèg/i.test(key))value=fr?'Des Privilèges À Découvrir':'Discover Our Privileges';
  if(value){const target=h.children.length===1&&h.firstElementChild.tagName==='SPAN'?h.firstElementChild:h;target.textContent=value;}
 });
 const nav=fr?{'notre-equipe.html':'Notre Équipe','a-propos.html':'À Propos','contact.html':'Contactez Nous'}:{'our-team.html':'Our Team','team.html':'Our Team','about.html':'About Us','about-us.html':'About Us','contact.html':'Contact Us'};
 document.querySelectorAll('header nav .navlink').forEach(a=>{const path=a.getAttribute('href').split('/').pop();let value=nav[path];if(!fr&&!value){const key=a.textContent.trim().toLowerCase();value=({'our team':'Our Team','about us':'About Us','contact us':'Contact Us'})[key];}if(value){const target=a.children.length===1&&a.firstElementChild.tagName==='SPAN'?a.firstElementChild:a;target.textContent=value;}});
 document.querySelectorAll('.site-footer .footer-grid > div:first-child a[href^="tel:"]').forEach(a=>{
  const p=a.parentElement;if(!p.querySelector('a[href="mailto:admin@baandor.com"]')){const email=document.createElement('a');email.href='mailto:admin@baandor.com';email.textContent='admin@baandor.com';a.after(document.createElement('br'),email);}
 });
 if(fr){const date=document.querySelector('#enquiry input[name="date"]');if(date){date.type='text';date.placeholder='aaaa-mm-jj';date.inputMode='numeric';date.pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}';date.maxLength=10;date.autocomplete='off';date.addEventListener('input',()=>{const value=date.value;let valid=!value;if(/^\d{4}-\d{2}-\d{2}$/.test(value)){const parsed=new Date(value+'T00:00:00Z');valid=!Number.isNaN(parsed.valueOf())&&parsed.toISOString().slice(0,10)===value;}date.setCustomValidity(valid?'':'Veuillez saisir une date valide au format aaaa-mm-jj.');});}}
})();

/* V19: title case for every heading and footer tagline, in both languages. */
(()=>{
 const locale=document.documentElement.lang.toLowerCase().startsWith('fr')?'fr-CA':'en-CA';
 const titleCase=s=>s.replace(/(^|[\s’'\-–—/([{«])([\p{L}])/gu,(_,prefix,letter)=>prefix+letter.toLocaleUpperCase(locale));
 function apply(el){
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
  let node;while((node=walker.nextNode()))node.nodeValue=titleCase(node.nodeValue);
 }
 document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(apply);
 document.querySelectorAll('.site-footer .footer-grid > div:first-child p').forEach(p=>{
  if(/l[’']art ancestral du bien-être thaïlandais|the ancestral art of thai wellness/i.test(p.textContent))apply(p);
 });
})();
