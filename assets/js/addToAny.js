function AddShare(place) {
  //Create Elements at DOM
  const addToAny = document.createElement('div');
  const addShareGeneric = document.createElement('a');
  const addShareWhats = document.createElement('a');
  const addShareTwitter = document.createElement('a');
  const addShareLinkedin = document.createElement('a')
  const addShareTelegram = document.createElement('a');
  const addShareFacebook = document.createElement('a');
  //Add Classlists to elements
  addToAny.classList.add('a2a_kit', 'a2a_kit_size_32', 'a2a_default_style');
  addShareGeneric.classList.add('a2a_dd');
  addShareWhats.classList.add('a2a_button_whatsapp');
  addShareTwitter.classList.add('a2a_button_twitter');
  addShareLinkedin.classList.add('a2a_button_linkedin');
  addShareTelegram.classList.add('a2a_button_telegram');
  addShareFacebook.classList.add('a2a_button_facebook');
  //Set the attributes
  addShareGeneric.setAttribute('href', 'https://www.addtoany.com/share');
  //Attach elements from DOM to browser
  const append = document.querySelector(place);
  append === null ? '' : append.append(addToAny);
  addToAny.append(addShareGeneric, addShareWhats, addShareTwitter, addShareLinkedin, addShareTelegram, addShareFacebook);
  //Script do AddToAny
  const addShareScript = document.createElement('script')
  addShareScript.setAttribute('src', 'https://static.addtoany.com/menu/page.js');
  addShareScript.setAttribute('async', true);
  addShareScript.classList.add('add-share-present');
  //Ternary to verify if this element already exists on DOM. If yes, doesn't anything, else, attach to browser
  const isAddSharePresent = document.querySelector('.add-share-present');
  isAddSharePresent === null ? addToAny.append(addShareScript) : "";
}
AddShare('.post-meta');
AddShare('.container.post article > div');
