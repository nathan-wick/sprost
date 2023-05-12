const functions = require('firebase-functions');
const hosting = require('firebase-hosting');

exports.addDomain = functions.https.onRequest((req, res) => {
  // Get the custom domain from the request.
  const domain = req.query.domain;

  // Add the custom domain to the Firebase Hosting configuration.
  hosting.addDomain(domain, function(err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Domain added successfully');
    }
  });
});