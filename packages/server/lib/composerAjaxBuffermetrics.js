module.exports = (req, res) => {
  /**
   * Sending success for now until we fix issues with the
   * tracking code below.
   */
  res.send('success');

  // const { values } = req.body;

  // values.forEach((event) => {
  //   const scopes = event.value;
  //   const metadata = event.extra_data;
  //   const indexOfMc = scopes.indexOf('multiple-composers');

  //   if (indexOfMc) {
  //     // We can only send one action with our new metrics
  //     // so we'll concat anything after the mc part
  //     let action = scopes.splice(indexOfMc + 1);
  //     action = action.join('-');

  //     req.buffermetrics.trackAction({
  //       application: 'publish',
  //       location: 'composer',
  //       action,
  //       metadata,
  //     });
  //   }
  // });

  // res.send('success');
};
