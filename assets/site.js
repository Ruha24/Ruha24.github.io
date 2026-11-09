// Запоминаем явный выбор языка, чтобы автоопределение больше не перекидывало
document.querySelectorAll('.lang a').forEach(function(a){
  a.addEventListener('click', function(){
    try{ localStorage.setItem('lang', this.dataset.lang); }catch(e){}
  });
});

// Кнопка «Обсудить …» у услуги сразу выбирает нужный тип задачи в форме
document.querySelectorAll('[data-kind]').forEach(function(a){
  a.addEventListener('click', function(){
    var select = document.getElementById('kind');
    if(select) select.value = this.dataset.kind;
  });
});

// Отправка формы без перезагрузки. Тексты берутся из data-атрибутов формы,
// поэтому один скрипт работает и на русской, и на английской версии.
var form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    var btn = form.querySelector('button'), status = document.getElementById('formStatus');
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = form.dataset.sending;
    status.className = 'form-status';
    status.textContent = '';
    try{
      var res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(!res.ok) throw new Error('bad response');
      form.reset();
      btn.textContent = form.dataset.sent;
      status.className = 'form-status ok';
      status.textContent = form.dataset.ok;
    } catch(err){
      btn.disabled = false;
      btn.textContent = original;
      status.className = 'form-status err';
      status.innerHTML = form.dataset.err;
    }
  });
}
