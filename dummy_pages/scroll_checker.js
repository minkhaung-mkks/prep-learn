const scroll_into_view=(element,callback,
    options= {
        root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        threshold: 0.9
    }
    )=> {
    const elementToCheck = [].slice.call(document.querySelectorAll(`${element}`));
    if ("IntersectionObserver" in window) {
      let elementObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            console.log('checking...')
          if (entry.isIntersecting) {
              console.log('intersecting...')
            let element = entry.target;
            callback(element)
          }
        });
      },options);
  
      elementToCheck.forEach(function(element) {
        elementObserver.observe(element);
      });
    }
  }

const final_box_into_view=(element)=>{
    document.querySelector('.final_box_in_view').classList.add('in_view')
    document.querySelector('.final_box').classList.add('in_view')
    document.querySelector('.last_call_btn').classList.add('last_call_btn_in_view')
}

const setupObservers=()=>{
    console.log('First')
    scroll_into_view('.final_box', final_box_into_view)
}

document.addEventListener("DOMContentLoaded", setupObservers);