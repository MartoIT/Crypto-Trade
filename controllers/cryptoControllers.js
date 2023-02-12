exports.getCatalogPage = (req, res) => {
    res.render('crypto/catalog');
};

exports.getCreateOfferPage = (req, res) => {
    res.render('crypto/create');
};

exports.getDetailsPage = (req, res) => {
    res.render('crypto/details')
};

exports.getEditPage = (req, res) => {
    res.render('crypto/edit')
};

exports.getSearchPage = (req, res) => {
    res.render('crypto/search')
};