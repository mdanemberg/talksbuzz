module.exports = function(assets) {
    assets.root = __dirname + '/public';

    
    assets.addCss('bootstrap/css/bootstrap.min.css');
    assets.addCss('bootstrap/css/bootstrap-responsive.min.css');
    assets.addCss('css/style.styl');

    assets.addJs('js/jquery.js');
}