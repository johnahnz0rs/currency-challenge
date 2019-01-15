const router = require('express').Router();
const path = require('path');

router.all('*', function(request, response) {
    console.log('***** catch-all.routes *****');
    response.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;