moment.loadPersian({
    usePersianDigits: 1,
    dialect: "persian-modern"
})

// Get stored user data
const store = new Store();

jQuery(function($){
    // Show article title
    const title = store.get('article.title');
    $('.title').html(title);

    // Show article date

    const date = store.get('article.date');
    // convert date to jalaali
    const jalai_date = moment(date, 'YYYY-M-D').format('jD jMMMM jYYYY');

    $('.date').html(jalai_date);
})