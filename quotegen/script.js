let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteBox = document.getElementById('quote');
const authBox = document.getElementById('author');
const quoteBtn = document.getElementById('new-quote');
const twitBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote () {
    loading();
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length + 1)];
    // Checking quote length for styling
    quote.text.length > 126 ? quoteBox.classList.add('long-quote') : quoteBox.classList.remove('long-quote')

    quoteBox.textContent = quote.text;
    complete();
    // Checking if author is null
    !quote.author ? authBox.textContent = `-- Unknown --` : authBox.textContent = `-- ${quote.author} --`;
    
}



// Get quotes from api

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        newQuote();
        
    } catch (e) {
        // catch error here
        
    }
}

// Tweet Quote
function tweetQuote(){
    let twitterUrl = `https://twitter.com/intent/tweet?text=${quoteBox.textContent} - ${authBox.textContent}`;
    window.open(twitterUrl, '_blank');

}


// Event Listeners
quoteBtn.addEventListener('click', newQuote);
twitBtn.addEventListener('click', tweetQuote);


//  On load
getQuotes();