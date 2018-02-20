const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.deleteNewExercise = functions.database
  .ref('exercises/{user}/{id}').onWrite((event) => {
    return admin.database()
      .ref(`new_exercises/${event.params.user}/${event.params.id}`)
      .remove()
  })